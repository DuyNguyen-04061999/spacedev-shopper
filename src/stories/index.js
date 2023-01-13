import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getUserThunkAction } from "./auth";
import { ENV } from "@/config";
import { cartReducer, getCartAction } from "./cart";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
    // middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(...[]),
    devTools: ENV === 'development'
})


store.dispatch(getUserThunkAction())

store.dispatch(getCartAction())