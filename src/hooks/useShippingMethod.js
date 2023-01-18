import { useQuery } from "./useQuery"

export const useShippingMethod = () => {
    return useQuery({
        queryFn: () => cartService.getShippingMethod(),
        queryKey: [`shipping-method`],
        cacheTime: 3600000,
        limitDuration: 1000,
    })
}