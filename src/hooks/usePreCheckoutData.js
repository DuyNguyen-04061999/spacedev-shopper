import { useEffect } from "react"
import { useCart } from "./useCart"
import { useDispatch } from "react-redux"
import { fetchPreCheckoutDataAction } from "@/stories/cart"

export const usePreCheckoutData = () => {
    const { preCheckoutData, loading: { loadingPreCheckoutData }, preCheckoutRequest } = useCart()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!preCheckoutData) {
            dispatch(fetchPreCheckoutDataAction())
        }
    }, [])

    return { preCheckoutData, loadingPreCheckoutData, preCheckoutRequest }
}