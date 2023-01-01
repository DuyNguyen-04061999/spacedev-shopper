import { PRODUCT_API } from "@/config/api"
import { http } from "@/utils/http"

export const productService = {
    getProduct(query = '', signal) {
        return http.get(`${PRODUCT_API}${query}`, { signal })
    }
}