import { authService } from "@/services/auth";
import axios from "axios";
import { getToken, setToken } from "./token";


export const http = axios.create()

let refreshTokenService = null

http.interceptors.response.use((res) => {
    return res.data
}, async (error) => {

    try {
        if (error.response.status === 403 && error.response.data.error_code === "TOKEN_EXPIRED") {
            // refresh token

            if (refreshTokenService) {
                await refreshTokenService
            } else {
                // Nếu chưa có api nào gọi hàm refresh token
                console.log('refreshToken')
                const token = getToken()
                refreshTokenService = authService.refreshToken({
                    refreshToken: token.refreshToken
                })

                const res = await refreshTokenService

                setToken(res.data)

                refreshTokenService = null
            }




            return http(error.config)

            // gắn token vào localStorage

            // Thực thi lại api bị lỗi

        }
    } catch (err) {
        console.error(err)
    }
    throw error
})


http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }
    return config
})