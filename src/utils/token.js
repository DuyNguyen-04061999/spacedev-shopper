const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const PRE_CHECKOUT_DATA_KEY = 'preCheckout'

export const setToken = (data) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}
export const getToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}


export const setUser = (data) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export const getUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY)) 
}
export const clearUser = () => {
    localStorage.removeItem(USER_KEY)
}



export const setPreCheckout = (data) => {
    localStorage.setItem(PRE_CHECKOUT_DATA_KEY, JSON.stringify(data))
}
export const getPreCheckout = () => {
    return JSON.parse(localStorage.getItem(PRE_CHECKOUT_DATA_KEY)) 
}
export const clearPreCheckout = () => {
    localStorage.removeItem(PRE_CHECKOUT_DATA_KEY)
}