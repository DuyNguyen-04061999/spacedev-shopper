import { Button } from '@/components/Button'
import { CartItem } from '@/components/CartItem'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import Skeleton from '@/components/Skeleton'
import { PATH } from '@/config/path'
import { useCart } from '@/hooks/useCart'
import { usePreCheckoutData } from '@/hooks/usePreCheckoutData'
import { changePromotionAction, fetchPreCheckoutDataAction, selectItemPreCheckoutAction } from '@/stories/cart'
import { cn } from '@/utils'
import { currency } from '@/utils/currency'
import { required } from '@/utils/rule'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export const ViewCart = () => {
    const { cart, preCheckoutRequest, loading: { cartLoading, loadingPromotion } } = useCart()
    const { preCheckoutData, loadingPreCheckoutData } = usePreCheckoutData()
    const dispatch = useDispatch()

    const addPromotion = (values, form) => {
        dispatch(changePromotionAction([values.code]))
        form.reset()
    }

    const onSelect = (id) => (checked) => {
        dispatch(selectItemPreCheckoutAction({
            productId: id,
            selected: checked
        }))
    }

    if (cartLoading && !cart) return <ViewCartLoading />

    const { promotion } = preCheckoutData || {}

    const selected = (id) => !!preCheckoutRequest?.listItems?.find(e => e === id)
    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">Shopping Cart</h3>
                    </div>
                </div>
                {
                    cart?.listItems?.length === 0 ?
                        <div className='flex flex-col gap-4 items-center'>
                            <img width={300} src="/img/empty-cart.png" />
                            <p className='mb-0'>Kh??ng c?? s???n ph???m n??o trong gi??? h??ng c???a b???n.</p>
                            <Link to={PATH.product} className="btn btn-dark min-w-[300px] text-center">Ti???p t???c mua s???m</Link>
                        </div> : (
                            <div className="row">
                                <div className="col-12 col-md-7">
                                    {/* List group */}
                                    <ul className="list-group list-group-lg list-group-flush-x mb-6">
                                        {
                                            cart?.listItems?.map(e => <CartItem selected={selected(e.productId)} onSelect={onSelect(e.productId)} allowSelect key={e.productId} {...e.product} quantity={e.quantity} />)
                                        }
                                    </ul>
                                    {/* Footer */}
                                    <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                                        <div className="col-12 col-md-7">
                                            {
                                                promotion && (
                                                    <div className="promotion-code-card mb-5">
                                                        <div className="font-bold">{promotion.title} ({promotion.code})</div>
                                                        <div className="text-sm">{promotion.description}</div>
                                                        <i className="fe fe-x close" onClick={() => dispatch(changePromotionAction([]))} />
                                                    </div>
                                                )
                                            }

                                            {/* Coupon */}
                                            <Form
                                                onSubmit={addPromotion}
                                                form={{
                                                    rules: {
                                                        code: [required()]
                                                    }
                                                }}
                                                className="mb-7 mb-md-0">
                                                <label className="font-size-sm font-weight-bold" htmlFor="cartCouponCode">
                                                    Coupon code:
                                                </label>
                                                <div className="row form-row">
                                                    <div className="col">
                                                        {/* Input */}
                                                        <Form.Item name="code">
                                                            <Input placeholder="Enter coupon code*" />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Button */}
                                                        <Button loading={loadingPromotion}>
                                                            Apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                                    {/* Total */}
                                    <div className="product-card card mb-7 bg-light">
                                        <div className="card-body">
                                            <Spin spinning={loadingPreCheckoutData}>
                                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                                    <li className="list-group-item d-flex">
                                                        <span>Subtotal</span> <span className="ml-auto font-size-sm">{currency(preCheckoutData?.subTotal)}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex">
                                                        <span>Promotion</span> <span className="ml-auto font-size-sm">{!!preCheckoutData?.promotion?.discount && '-'} {currency(preCheckoutData?.promotion?.discount)}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex">
                                                        <span>Tax</span> <span className="ml-auto font-size-sm">{currency(preCheckoutData?.tax)}</span>
                                                    </li>
                                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                                        <span>Total</span> <span className="ml-auto font-size-sm">{currency(preCheckoutData?.viewCartTotal)}</span>
                                                    </li>
                                                    <li className="list-group-item font-size-sm text-center text-gray-500">
                                                        Gi?? v???n chuy???n s??? ???????c t??nh khi checkout *
                                                    </li>
                                                </ul>
                                            </Spin>
                                        </div>
                                    </div>
                                    {/* Button */}
                                    <Link
                                        className={cn("btn btn-block btn-dark mb-2", {
                                            'opacity-50 pointer-events-none': preCheckoutData?.listItems?.length === 0
                                        })}
                                        to={PATH.checkout}>
                                        Proceed to Checkout
                                    </Link>
                                    {/* Link */}
                                    <Link className="btn btn-link btn-sm px-0 text-body" to={PATH.product}>
                                        <i className="fe fe-arrow-left mr-2" /> Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )
                }

            </div>
        </section>
    )
}


const ViewCartLoading = () => {
    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">Shopping Cart</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        <ul className="list-group list-group-lg list-group-flush-x mb-6">
                            <li className='list-group-item'>
                                <Skeleton height={142.31} />
                            </li>
                            <li className='list-group-item'>
                                <Skeleton height={142.31} />
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        <div className="product-card card mb-7 bg-light">
                            <div className="card-body">
                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                    <li className="list-group-item d-flex">
                                        <Skeleton height={22.5} />
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <Skeleton height={22.5} />
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <Skeleton height={22.5} />
                                    </li>
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <Skeleton height={22.5} />
                                    </li>
                                    <li className="list-group-item font-size-sm text-center text-gray-500">
                                        <Skeleton height={22.5} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Skeleton height={54} />
                    </div>
                </div>
            </div>
        </section>
    )
}




export default ViewCart

