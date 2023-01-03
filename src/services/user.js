import { USER_API } from "@/config/api"
import { http } from "@/utils/http"

export const userService = {
    register(data){
        return http.post(`${USER_API}/register`, data)
    }
}