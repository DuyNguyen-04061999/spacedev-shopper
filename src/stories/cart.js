import { cartService } from "@/services/cart";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { call, takeEvery, takeLatest, put, delay, putResolve } from 'redux-saga/effects'
import { getToken } from "@/utils/token";



export const { reducer: cartReducer, actions: cartActions, name } = createSlice({
    name: 'cart',
    initialState: {
        cart: null,
        openCartOver: false,
        loading: {}
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
        }
    }
})

export const getCartAction = createAsyncThunk(`${name}/getCart`, async (_, thunkApi) => {
    if (getToken()) {
        try {
            const res = await cartService.getCart()
            thunkApi.dispatch(cartActions.setCart(res.data))
        } catch (err) {
            console.error(err)
        }
    }

})

export const updateCartItemAction = createAction(`${name}/addCart`)


// export const updateCartItemAction = createAsyncThunk(`${name}/addCart`, async (data, thunkApi) => {
// try {
//     await cartService.updateProduct(data.productId, data.quantity)
//     await thunkApi.dispatch(getCartAction())
//     if (data.showPopover) {
//         thunkApi.dispatch(cartActions.toggleCartOver(true))
//         window.scroll({
//             top: 0,
//             behavior: 'smooth'
//         })
//     }

// } catch (err) {
//     console.error(err)
// }
// })




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
        yield putResolve(getCartAction())
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

    } catch (err) {
        console.error(err)
    }
}

export function* cartSaga() {
    console.log('cartSaga')
    yield takeLatest(updateCartItemAction, fetchUpdateCartItem)
}