import { AddressDrawer } from '@/components/AddressDrawer'
import { Button } from '@/components/Button'
import { CartItem } from '@/components/CartItem'
import { useAddress } from '@/hooks/useAddress'
import { useCart } from '@/hooks/useCart'
import { usePreCheckoutData } from '@/hooks/usePreCheckoutData'
import { useQuery } from '@/hooks/useQuery'
import { cartService } from '@/services/cart'
import { cartActions, clearPreCheckoutDataAction, fetchPreCheckoutDataAction } from '@/stories/cart'
import { array } from '@/utils/array'
import { currency } from '@/utils/currency'
import { Skeleton, Spin } from 'antd'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import SkeletonM from '@/components/Skeleton'
import { Radio } from '@/components/Radio'
import { Form } from '@/components/Form'
import { useNavigate } from 'react-router'
import { Navigate } from '@/components/Navigate'
import { PATH } from '@/config/path'
import { useAuth } from '@/hooks/useAuth'
import { preCheckoutStore } from '@/utils/token'
import { Field } from '@/components/Field'
import { Checkbox } from '@/components/Checkbox'
import { AddressForm } from '@/components/AddressForm'
import { handleError } from '@/utils/handleError'
import { userService } from '@/services/user'


const defaultSelectAddress = () => preCheckoutStore.get('selectAddress') || {}
const queryGetShippingMethod = {
    queryFn: () => cartService.getShippingMethod(),
    queryKey: [`shipping-method`],
    cacheTime: 3600000,
    limitDuration: 1000,
}

const queryCheckout = {
    queryFn: ({ params }) => cartService.checkout(...params),
    enabled: false
}




export const Checkout = () => {
    const addressFormRef = useRef()
    const { preCheckoutData, loadingPreCheckoutData, preCheckoutRequest } = usePreCheckoutData()
    const { addressDefault, loading: loadingAddress } = useAddress()
    const [openAddressDrawer, setOpenAddressDrawer] = useState(false)
    const { data: { data: shippingMethod }, loading: loadingShipingMethod } = useQuery(queryGetShippingMethod)
    const { loading, refetch: checkoutService } = useQuery(queryCheckout)
    const [selectAddress, setSelectAddress] = useState(defaultSelectAddress)
    const noteRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!selectAddress._id && addressDefault) {
            setSelectAddress(addressDefault)
        }
    }, [addressDefault])

    useEffect(() => {
        preCheckoutStore.set('selectAddress', selectAddress)
    }, [selectAddress])


    if (loadingPreCheckoutData && !preCheckoutData) return null

    const { promotion, shipping } = preCheckoutData || {}

    const onCheckout = async () => {
        try {
            let address = selectAddress._id ? selectAddress : null
            let promise = []
            if (!address) {
                const form = addressFormRef.current
                if (!form.validate()) return
                address = form.values

                userService.newAddress(address)
            }
            // Checkout
            const res = await checkoutService({
                ...preCheckoutRequest,
                shipping: address,
                note: noteRef.current
            })
            navigate(PATH.checkoutSuccess, { state: res.data })
            dispatch(clearPreCheckoutDataAction())
        } catch (err) {
            handleError(err)
        }



    }

    return (
        <section className="pt-7 pb-12">
            {
                preCheckoutData.listItems.length === 0 && <Navigate to={PATH.viewCart} />
            }

            <AddressDrawer
                onSelect={setSelectAddress}
                open={openAddressDrawer}
                onClose={() => setOpenAddressDrawer(false)}
                selectId={selectAddress._id} />
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-4">Checkout</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* Form */}
                        <div className="max-w-[300px] mb-5">
                            <Button size="xs" type="outline" link={PATH.viewCart}>Quay trở lại giỏ hàng</Button>
                        </div>
                        <div>

                            {/* Heading */}
                            <h6 className="mb-7">Shipping Details</h6>
                            {
                                loadingAddress ? <Skeleton /> : selectAddress._id ? (
                                    <div className="list-group-item relative mb-5">
                                        {/* Title */}
                                        <p className="font-size-sm mb-0 leading-[35px]">
                                            <a className="text-body text-xl font-bold " href="./product.html">{selectAddress.fullName}</a> <br />
                                            <b>Số điện thoại:</b> {selectAddress.phone} <br />
                                            <b>Email:</b>{selectAddress.email}<br />
                                            <b>Quận / Huyện:</b> {selectAddress.district} <br />
                                            <b>Tỉnh / thành phố:</b> {selectAddress.province} <br />
                                            <b>Địa chỉ:</b> {selectAddress.address} <br />
                                        </p>
                                        {/* Remove */}
                                        <Button onClick={e => {
                                            e.preventDefault()
                                            setOpenAddressDrawer(true)
                                        }} type="outline" size="xs" className="font-size-xs ml-auto absolute top-5 right-5" >
                                            Thay đổi địa chỉ khác
                                        </Button>
                                    </div>
                                ) : <AddressForm ref={addressFormRef} />
                            }

                            {/* Heading */}
                            <h6 className="mb-7">Shipping Method</h6>
                            {/* Shipping details */}
                            <div className="table-responsive mb-6">
                                <Radio.Group value={preCheckoutRequest.shippingMethod || 'mien-phi'}
                                    onChange={value => dispatch(cartActions.changeShippingMethod(value))}>
                                    <table className="table table-bordered table-sm table-hover mb-0">
                                        <tbody>
                                            {
                                                loadingShipingMethod ? array(3).map((_, i) => (
                                                    <tr key={i} >
                                                        <td>
                                                            <SkeletonM style={{ height: 22.5 }} />
                                                        </td>
                                                        <td><SkeletonM style={{ height: 22.5 }} /></td>
                                                        <td><SkeletonM style={{ height: 22.5 }} /></td>
                                                    </tr>
                                                )) : shippingMethod?.map(e => (
                                                    <tr key={e.code}>
                                                        <td className="whitespace-nowrap">
                                                            <Radio value={e.code}>{e.title}</Radio>
                                                        </td>
                                                        <td>{e.description}</td>
                                                        <td className="whitespace-nowrap">{currency(e.price)} vnđ</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </Radio.Group>
                            </div>
                            {/* Heading */}
                            <h6 className="mb-7">Payment</h6>
                            {/* List group */}
                            <Radio.Group
                                value={preCheckoutRequest.payment.paymentMethod || 'money'}
                                onChange={value => dispatch(cartActions.changePaymentMethod(value))}
                            >
                                <div className="list-group list-group-sm mb-7">
                                    <div className="list-group-item">
                                        {/* Radio */}
                                        <Radio value="bank">Credit Card <img className="ml-2" src="./img/brands/color/cards.svg" alt="..." /></Radio>
                                    </div>
                                    <div className="list-group-item">
                                        <Radio value="money">Trả tiền khi nhận hàng</Radio>
                                    </div>
                                </div>
                            </Radio.Group>
                            {/* Notes */}
                            <textarea onChange={ev => noteRef.current = ev.currentTarget.value} className="form-control form-control-sm mb-9 mb-md-0 font-size-xs" rows={5} placeholder="Order Notes (optional)" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Heading */}
                        <h6 className="mb-7">Order Items ({preCheckoutData.totalQuantity})</h6>
                        {/* Divider */}
                        <hr className="mt-7 mb-0" />
                        {/* List group */}
                        <div className="product-card">
                            <div className="card-body">
                                <ul className="list-group list-group-lg list-group-flush">
                                    {
                                        preCheckoutData?.listItems?.map(e => <CartItem
                                            className="px-0"
                                            hideRemove
                                            hideInputQuantity
                                            key={e.productId}
                                            quantity={e.quantity}
                                            checkoutPrice={e.quantity > 1 && <div>x {e.quantity} = {currency(e.price)} <u>vnđ</u></div>}
                                            {...e.product} />)
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* Card */}
                        <div className="product-card card mb-9 bg-light">
                            <div className="card-body">
                                <Spin spinning={loadingPreCheckoutData}>
                                    <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                        <li className="list-group-item d-flex">
                                            <span>Subtotal</span> <span className="ml-auto font-size-sm">{currency(preCheckoutData.subTotal)}</span>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <span>Promotion</span> <span className="ml-auto font-size-sm">{!!promotion?.discount && '-'}{currency(promotion?.discount)}</span>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <span>Shipping</span> <span className="ml-auto font-size-sm">{currency(shipping?.shippingPrice)}</span>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <span>Tax</span> <span className="ml-auto font-size-sm">{currency(preCheckoutData.tax)}</span>
                                        </li>
                                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                            <span>Total</span> <span className="ml-auto">{currency(preCheckoutData.total)}</span>
                                        </li>
                                    </ul>
                                </Spin>
                            </div>
                        </div>
                        {/* Disclaimer */}
                        <p className="mb-7 font-size-xs text-gray-500">
                            Your personal data will be used to process your order, support
                            your experience throughout this website, and for other purposes
                            described in our privacy policy.
                        </p>
                        {/* Button */}
                        <Button loading={loading} className="w-full" onClick={onCheckout}>
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </section >
    )
}


export default Checkout