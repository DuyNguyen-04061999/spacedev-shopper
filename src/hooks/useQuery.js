import { localStorageCache, sessionStorageCache } from "@/utils/cache"
import { CanceledError } from "axios"
import { useRef } from "react"
import { useEffect, useState } from "react"

const _cache = {
    localStorage: localStorageCache,
    sessionStorage: sessionStorageCache,
}


// _asyncFunction = {
//     categories: Promise,
//     course-index: Promise,
// }

const _asyncFunction = {}

// B1: loading -> true

// B2: startTime = Thời điểm bắt đầu (miliseconds)

// B3: await api

// B4: endTime = Thời điểm kết thúc

// B5: timeout = endTime - startTime miliseconds

// B6: [Nếu] timeout < 300 -> await delay(300 - timeout)

// B7: return data hoặc throw error

// B8: loading -> false


export const useQuery = ({
    queryFn,
    queryKey,
    dependencyList = [],
    enabled = true,
    cacheTime,
    keepPreviousData,
    limitDuration,
    storeDriver = 'localStorage'
} = {}) => {

    const cache = _cache[storeDriver]
    const refetchRef = useRef()
    // Dùng để lưu trữ các data để sử dụng lại cho keepPreviousData
    const dataRef = useRef({})
    const cacheName = Array.isArray(queryKey) ? queryKey?.[0] : typeof queryKey === 'string' ? queryKey : undefined


    const controllerRef = useRef(new AbortController())


    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [status, setStatus] = useState('idle')
    useEffect(() => {
        if (typeof refetchRef.current === 'boolean') {
            refetchRef.current = true
        }
    }, dependencyList)

    useEffect(() => {
        if (enabled) {
            fetchData()
        }
    }, [enabled].concat(dependencyList, queryKey))

    const fetchData = async (...data) => {
        controllerRef.current.abort()
        controllerRef.current = new AbortController()

        const startTime = Date.now()
        let res
        let error


        // Lấy data từ biến lưu trữ
        if (keepPreviousData && cacheName && dataRef.current[cacheName]) {
            res = dataRef.current[cacheName]
        }

        // Kiểm tra cache xem có dữ liệu hay không
        if (cacheName && cacheTime && !refetchRef.current) {
            res = cache.get(cacheName)
        }

        if (!res) {
            setLoading(true)
            setStatus('pending')

            try {



                // Kiểm tra xem có 1 nơi nào khác đang thực thi api này hay không ?
                if (cacheName && _asyncFunction[cacheName]) {
                    res = await _asyncFunction[cacheName]
                }

                if (!res) {
                    const asyncFun = queryFn({
                        signal: controllerRef.current.signal,
                        params: data
                    })

                    if (cacheName) {
                        _asyncFunction[cacheName] = asyncFun
                    }

                    res = await asyncFun

                    delete _asyncFunction[cacheName]
                }

                // Lưu trữ lại giá trị khi keepPreviousData
                if (keepPreviousData && cacheName) {
                    dataRef.current[cacheName] = res
                }



                // update lại thời gian expired trong trường hợp cache đã tồn tại
                if (cacheName && cacheTime) {
                    let expired = cacheTime
                    if (cacheTime) {
                        expired += Date.now()
                    }
                    cache.set(cacheName, res, expired)
                }

            } catch (err) {
                error = err
            }
        }

        const endTime = Date.now()
        if (limitDuration) {
            const timeout = endTime - startTime
            if (timeout < limitDuration) {
                await delay(limitDuration - timeout)
            }
        }


        if (res) {
            setLoading(false)
            refetchRef.current = false
            setStatus('success')
            setData(res)
            return res
        } else if (error) {
            console.error(error)
            if (error instanceof CanceledError) {
                delete _asyncFunction[cacheName]
            } else {
                setLoading(false)
                setError(error)
                setStatus('error')
                throw error
            }

        }

    }
    return {
        loading,
        error,
        data,
        status,
        refetch: fetchData
    }
}


const delay = duration => new Promise(resolve => setTimeout(resolve, duration)) 
