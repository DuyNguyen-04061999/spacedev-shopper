import { cartService } from "@/services/cart";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const { reducer: cartReducer, actions: cartActions, name } = createSlice({
    name: 'cart',
    initialState: {
        cart: null,
        openCartOver: false
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        toggleCartOver: (state, action) => {
            state.openCartOver = action.payload
        }
    }
})

export const getCartAction = createAsyncThunk(`${name}/getCart`, async (_, thunkApi) => {
    try {
        const res = await cartService.getCart()
        thunkApi.dispatch(cartActions.setCart(res.data))
    } catch (err) {
        console.error(err)
    }
})


export const updateCartItemAction = createAsyncThunk(`${name}/addCart`, async (data, thunkApi) => {
    try {
        await cartService.updateProduct(data.productId, data.quantity)
        await thunkApi.dispatch(getCartAction())
        if (data.showPopover) {
            thunkApi.dispatch(cartActions.toggleCartOver(true))
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        }

    } catch (err) {
        console.error(err)
    }
})