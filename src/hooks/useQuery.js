import { localStorageCache, sessionStorageCache } from "@/utils/cache"
import { useRef } from "react"
import { useMemo } from "react"
import { useEffect, useState } from "react"

const _cache = {
    localStorage: localStorageCache,
    sessionStorage: sessionStorageCache,
}


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
    const cacheName = Array.isArray(queryKey) ? queryKey?.[0] : undefined
    


    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [status, setStatus] = useState('idle')
    useEffect(() => {
        if(typeof refetchRef.current === 'boolean') {
            refetchRef.current = true
        }
    }, dependencyList)

    useEffect(() => {
        if (enabled) {
            fetchData()
        }
    }, [enabled].concat(dependencyList, queryKey))

    const fetchData = async () => {
        try {
            setLoading(true)
            setStatus('pending')

            let res

            // Lấy data từ biến lưu trữ
            if(keepPreviousData && cacheName && dataRef.current[cacheName]) {
                res = dataRef.current[cacheName]
            }

            // Kiểm tra cache xem có dữ liệu hay không
            if (cacheName && cacheTime && !refetchRef.current) {
                res = cache.get(cacheName)
            }

            if (!res) {
                res = await queryFn()
            }

            // Lưu trữ lại giá trị khi keepPreviousData
            if(keepPreviousData && cacheName) {
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
        } catch (err) {
            setError(err)
            setStatus('error')
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        error,
        data,
        status
    }
}