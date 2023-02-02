import { ORGANIZATION_API } from "@/config/api"
import { http } from "@/utils/http"

export const organizationService = {
    contact(data) {
        return http.post(`${ORGANIZATION_API}/contact`, data)
    }
}