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


export const useQuery = (options = {}) => {
    const { queryFn,
        queryKey,
        dependencyList = [],
        enabled = true,
        cacheTime,
        keepPreviousData,
        storeDriver = 'localStorage' } = options
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
        
        try {
            setLoading(true)
            setStatus('pending')

            let res

            // Lấy data từ biến lưu trữ
            if (keepPreviousData && cacheName && dataRef.current[cacheName]) {
                res = dataRef.current[cacheName]
            }

            // Kiểm tra cache xem có dữ liệu hay không
            if (cacheName && cacheTime && !refetchRef.current) {
                res = cache.get(cacheName)
            }

            // Kiểm tra xem có 1 nơi nào khác đang thực thi api này hay không ?
            if(cacheName && _asyncFunction[cacheName]) {
                res = await _asyncFunction[cacheName]
            }

            if (!res) {
                const asyncFun = queryFn({
                    signal: controllerRef.current.signal,
                    params: data
                })

                if(cacheName) {
                    _asyncFunction[cacheName] = asyncFun 
                }

                res = await asyncFun

                delete _asyncFunction[cacheName]
            }

            // Lưu trữ lại giá trị khi keepPreviousData
            if (keepPreviousData && cacheName) {
                dataRef.current[cacheName] = res
            }
            setStatus('success')
            setData(res)


            // update lại thời gian expired trong trường hợp cache đã tồn tại
            if (cacheName && cacheTime) {
                let expired = cacheTime
                if (cacheTime) {
                    expired += Date.now()
                }
                cache.set(cacheName, res, expired)
            }

            refetchRef.current = false
            setLoading(false)

            return res
        } catch (err) {
            console.error(err)
            if (err instanceof CanceledError) {
                delete _asyncFunction[cacheName]
                return
            }
            setError(err)
            setStatus('error')
            setLoading(false)
            throw err
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
