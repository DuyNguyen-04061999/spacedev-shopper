import { PRODUCT_API } from "@/config/api"
import { http } from "@/utils/http"

export const productService = {
    getProduct(query = '') {
        return http.get(`${PRODUCT_API}${query}`)
    }
}