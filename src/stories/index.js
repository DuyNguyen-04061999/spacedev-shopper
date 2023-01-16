import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSaga } from "./auth";
import { ENV } from "@/config";
import { cartReducer, cartSaga } from "./cart";
import createSagaMiddleware from 'redux-saga'
import { all,  select, take } from "redux-saga/effects";
import { cacheReducer } from "./cache";


function* watchAndLog() {
    while (true) {
        const action = yield take('*')
        const state = yield select()

        console.log('action', action)
        console.log('state after', state)
    }
}


function* rootSaga() {
    yield all([
        cartSaga(),
        // watchAndLog(), 
        authSaga()
    ])
}

const saga = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        cache: cacheReducer
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(saga),
    devTools: ENV === 'development'
})

saga.run(rootSaga)