import { useCart } from '@/hooks/useCart'
import { Drawer } from 'antd'
import React from 'react'
import { CartItem } from '../CartItem'
import { currency } from '@/utils/currency'
import { Link } from 'react-router-dom'
import { PATH } from '@/config/path'

export const CartDrawer = ({ open, onClose }) => {
    const { cart } = useCart()
    return (
        <Drawer open={open} onClose={onClose} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }} width={470}>
            <div>
                {/* Full cart (add `.d-none` to disable it) */}
                <div className="modal-content">
                    {/* Close */}
                    <button onClick={onClose} type="button" className="close !outline-none" data-dismiss="modal" aria-label="Close">
                        <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    {/* Header*/}
                    <div className="modal-header line-height-fixed font-size-lg">
                        <strong className="mx-auto">Your Cart ({cart?.totalQuantity})</strong>
                    </div>

                    {
                        cart?.totalQuantity === 0 ? (
                            <div className="modal-body flex-grow-0 my-auto">
                                {/* Heading */}
                                <h6 className="mb-7 text-center">Your cart is empty 😞</h6>
                                {/* Button */}
                                <Link onClick={onClose} className="btn btn-block btn-outline-dark" to={PATH.product}>
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : <>
                            {/* List group */}
                            <ul className="list-group list-group-lg list-group-flush">

                                {
                                    cart?.listItems?.map(e => <CartItem key={e.product.id} {...e.product} quantity={e.quantity} />)
                                }
                            </ul>
                            {/* Footer */}
                            <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
                                <strong>Subtotal</strong> <strong className="ml-auto">{currency(cart?.subTotal)}</strong>
                            </div>
                            {/* Buttons */}
                            <div className="modal-body">
                                <Link className="btn btn-block btn-outline-dark" onClick={onClose} to={PATH.viewCart}>View Cart</Link>
                            </div>
                        </>
                    }


                </div>
            </div>
        </Drawer>
    )
}
