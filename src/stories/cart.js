import { cartService } from "@/services/cart";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { call, takeEvery, takeLatest, put, delay, putResolve, take, fork, race, select, all } from 'redux-saga/effects'
import { getToken, preCheckoutStore } from "@/utils/token";
import { authActions, loginThunkAction, logoutThunkAction } from "./auth";
import { message } from "antd";
import { handleError } from "@/utils/handleError";



export const { reducer: cartReducer, actions: cartActions, name, getInitialState } = createSlice({
    name: 'cart',
    initialState: () => ({
        cart: null,
        openCartOver: false,
        loading: {
            cartLoading: true,
            loadingPreCheckoutData: true,
        },
        preCheckoutData: null,
        preCheckoutRequest: preCheckoutStore.get('preCheckoutRequest') || {
            listItems: [],
            shippingMethod: 'mien-phi',
            promotionCode: [],
            payment: {
                paymentMethod: "money"
            }
        }

    }),
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        clearCart: (state) => {
            return getInitialState()
        },
        toggleCartOver: (state, action) => {
            state.openCartOver = action.payload
        },
        setLoading: (state, action) => {
            for (let i in action.payload) {
                state.loading[i] = action.payload[i]
            }
        },
        set(state, action) {
            for (let i in action.payload) {
                state[i] = action.payload[i]
            }
        },
        changeShippingMethod(state, action) {
            state.preCheckoutRequest.shippingMethod = action.payload
        },
        changePaymentMethod(state, action) {
            state.preCheckoutRequest.payment.paymentMethod = action.payload
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
        yield put(cartActions.setLoading({ cartLoading: true }))
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
        yield put(cartActions.setLoading({ cartLoading: false }))
    }
}

export const updateCartItemAction = createAction(`${name}/addCart`)
export const selectItemPreCheckoutAction = createAction(`${name}/selectItemPreCheckout`)
export const changePromotionAction = createAction(`${name}/changePromotion`)
export const fetchPreCheckoutDataAction = createAction(`${name}/fetchPreCheckoutData`)

function* fetchUpdateCartItem(action) {
    try {
        yield delay(200)
        const { productId, quantity } = action.payload
        yield put(cartActions.setLoading({
            [productId]: true
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
            [productId]: false
        }))


        const { cart: { preCheckoutRequest: { listItems } } } = yield select()

        if (listItems.find(e => e === productId)) {
            // Cập nhật lại preCheckoutData
            yield call(fetchPreCheckoutData)
        }

    } catch (err) {
        console.error(err)
        throw err
    }
}

function* clearCart() {
    preCheckoutStore.clear()
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
        yield put(cartActions.setLoading({ loadingPreCheckoutData: true }))
        let { cart: { preCheckoutRequest } } = yield select()
        preCheckoutStore.set('preCheckoutRequest',preCheckoutRequest)

        const preCheckoutData = yield call(cartService.preCheckout, preCheckoutRequest)
        yield put(cartActions.set({ preCheckoutData: preCheckoutData.data }))
        yield put(cartActions.setLoading({ loadingPreCheckoutData: false }))
    } catch (err) {
        console.error(err)
    }
}

function* changePromotion(action) {
    const key = 'promotion'
    message.loading({
        key,
        content: action.payload.length ? 'Đang thêm mã giảm giá' : 'Đang xóa mã giảm giá',
        duration: 0
    })
    try {

        let { cart: { preCheckoutRequest } } = yield select()
        preCheckoutRequest = { ...preCheckoutRequest }
        preCheckoutRequest.promotionCode = action.payload || []

        // Check xem promoition code có tồn tại hay không
        if (preCheckoutRequest.promotionCode.length > 0) {
            yield call(cartService.getPromotion, preCheckoutRequest.promotionCode[0])
        }else {

        }

        yield put(cartActions.setLoading({ loadingPromotion: true }))
        yield put(cartActions.set({ preCheckoutRequest }))
        yield call(fetchPreCheckoutData)
        message.success({
            key,
            content: action.payload.length ? 'Thêm mã giảm giá thành công' : "Xóa mã giảm giá thành công"
        })
    } catch (err) {
        console.error(err)
        handleError(err, key)
    }

    yield put(cartActions.setLoading({ loadingPromotion: false }))

}

function* fetchCartFirstTime() {
    yield put(cartActions.setLoading({ cartLoading: true }))
    yield all([
        call(fetchCart),
        delay(1000)
    ])
    yield put(cartActions.setLoading({ cartLoading: false }))
}

export function* cartSaga() {
    yield fork(fetchCartFirstTime)
    yield takeLatest(updateCartItemAction, fetchUpdateCartItem)
    yield takeLatest([loginThunkAction.fulfilled], fetchCart)
    yield takeLatest(logoutThunkAction.fulfilled, clearCart)
    yield takeLatest(selectItemPreCheckoutAction, toggleSelectCartItem)
    yield takeLatest(changePromotionAction, changePromotion)
    yield takeLatest([fetchPreCheckoutDataAction, cartActions.changeShippingMethod, cartActions.changePaymentMethod], fetchPreCheckoutData)
}