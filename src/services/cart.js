import { CART_API } from "@/config/api"
import { http } from "@/utils/http"

export const cartService = {
    updateProduct(id, quantity) {
        return http.patch(`${CART_API}/${id}`, { quantity })
    },
    getCart() { 
        return http.get(`${CART_API}`)
    }
}