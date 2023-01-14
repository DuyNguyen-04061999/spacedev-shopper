import { cartService } from "@/services/cart";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { call, takeEvery, takeLatest, put, delay, putResolve, take, fork, race, select } from 'redux-saga/effects'
import { getToken } from "@/utils/token";
import { authActions, loginThunkAction, logoutThunkAction } from "./auth";



export const { reducer: cartReducer, actions: cartActions, name } = createSlice({
    name: 'cart',
    initialState: {
        cart: null,
        openCartOver: false,
        loading: {},
        loadingPreCheckoutData: false,
        preCheckoutData: null,
        preCheckoutRequest: {
            listItems: [],
            shippingMethod: '',
            promotionCode: []
        }
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        clearCart: (state) => {
            state.cart = null
        },
        toggleCartOver: (state, action) => {
            state.openCartOver = action.payload
        },
        setLoading: (state, action) => {
            state.loading[action.payload.productId] = action.payload.loading
        },
        set(state, action) {
            for (let i in action.payload) {
                state[i] = action.payload[i]
            }
        }
        // setPreCheckoutData(state, aciton) {
        //     state.preCheckoutData = action.payload
        // },
        // setPreCheckoutRequest(state, action) {
        //     state.preCheckoutRequest = action.payload
        // }
    }
})

function* fetchCart() {
    if (getToken()) {
        try {
            const { cart, logout } = yield race({
                cart: call(cartService.getCart),
                logout: take(authActions.logout)
            })
            console.log({ cart, logout });
            if (cart) {
                yield put(cartActions.setCart(cart.data))
            }
        } catch (err) {
            console.error(err)
        }
    }
}

export const updateCartItemAction = createAction(`${name}/addCart`)
export const selectItemPreCheckoutAction = createAction(`${name}/selectItemPreCheckout`)


function* fetchUpdateCartItem(action) {
    try {
        yield delay(200)
        const { productId, quantity } = action.payload
        yield put(cartActions.setLoading({
            productId,
            loading: true
        }))
        if (quantity === 0) {
            yield call(cartService.removeItem, productId)
        } else {
            yield call(cartService.updateProduct, productId, quantity)
        }

        yield call(fetchCart)
        if (action.payload.showPopover) {
            yield put(cartActions.toggleCartOver(true))
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        }

        yield put(cartActions.setLoading({
            productId,
            loading: false
        }))


        const { cart: { preCheckoutRequest: { listItems } } } = yield select()

        if (listItems.find(e => e === productId)) {
            // Cập nhật lại preCheckoutData
            yield call(fetchPreCheckoutData)
        }

    } catch (err) {
        console.error(err)
    }
}

function* clearCart() {
    yield put(cartActions.clearCart())
}

function* toggleSelectCartItem(action) {
    try {
        const { productId, selected } = action.payload
        let { cart: { preCheckoutRequest } } = yield select()
        let { listItems } = preCheckoutRequest
        listItems = [...listItems]

        // Kiểm tra select / unselect
        if (selected) {
            listItems.push(productId)
        } else {
            listItems = listItems.filter(e => e !== productId)
        }

        preCheckoutRequest = {
            ...preCheckoutRequest,
            listItems
        }
        yield put(cartActions.set({ preCheckoutRequest }))

        // Cập nhật lại preCheckoutData
        yield call(fetchPreCheckoutData)

    } catch (err) {
        console.error(err)
    }
}

function* fetchPreCheckoutData() {
    try {
        yield put(cartActions.set({ loadingPreCheckoutData: true }))
        let { cart: { preCheckoutRequest } } = yield select()
        const preCheckoutData = yield call(cartService.preCheckout, preCheckoutRequest)
        yield put(cartActions.set({ preCheckoutData: preCheckoutData.data }))
        yield put(cartActions.set({ loadingPreCheckoutData: false }))
    } catch (err) {
        console.error(err)
    }
}

export function* cartSaga() {
    yield fork(fetchCart)
    yield takeLatest(updateCartItemAction, fetchUpdateCartItem)
    yield takeLatest([loginThunkAction.fulfilled], fetchCart)
    yield takeLatest(logoutThunkAction.fulfilled, clearCart)
    yield takeLatest(selectItemPreCheckoutAction, toggleSelectCartItem)
}