import { userService } from "@/services/user"
import { useMemo } from "react"
import { useQuery } from "./useQuery"

export const useAddress = () => {
    const { data: { data: address = [] } = {}, loading } = useQuery({
        queryFn: () => userService.getAddress(''),
        limitDuration: 1000,
        queryKey: [`address`],
        // storeDriver: 'redux',
        // cacheTime: 3600_000
    })
    const addressDefault = useMemo(() => address?.find(e => e.default), [address])
    return {
        address,
        addressDefault,
        loading
    }
}