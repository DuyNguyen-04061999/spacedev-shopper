import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getUserThunkAction } from "./auth";
import { ENV } from "@/config";
import { cartReducer, cartSaga, getCartAction } from "./cart";
import createSagaMiddleware from 'redux-saga'
import { all } from "redux-saga/effects";


function* rootSaga() {
    yield all([
        cartSaga()
    ])
}

const saga = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(saga),
    devTools: ENV === 'development'
})

saga.run(rootSaga)

store.dispatch(getUserThunkAction())

store.dispatch(getCartAction())