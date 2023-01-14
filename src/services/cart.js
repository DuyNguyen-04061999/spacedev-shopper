import { CART_API } from "@/config/api"
import { http } from "@/utils/http"

export const cartService = {
    updateProduct(id, quantity) {
        return http.patch(`${CART_API}/${id}`, { quantity })
    },
    getCart() { 
        return http.get(`${CART_API}`)
    },
    removeItem(productId) {
        return http.delete(`${CART_API}/${productId}`)
    },
    preCheckout(data) {
        return http.post(`${CART_API}/pre-checkout`, data)
    }
}