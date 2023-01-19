import { REVIEW_API } from "@/config/api"
import { http } from "@/utils/http"

export const reviewService = {
    getReview(productId, query = '') {
        return http.get(`${REVIEW_API}/${productId}${query}`)
    },
    newReview(productId, data) {
        return http.post(`${REVIEW_API}/${productId}`, data)
    }
}