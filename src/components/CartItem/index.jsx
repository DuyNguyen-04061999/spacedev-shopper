import { updateCartItemAction } from '@/stories/cart'
import { cn } from '@/utils'
import { currency } from '@/utils/currency'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const CartItem = ({ id, name, real_price, price, quantity, images }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const onDecre = async () => {
        setLoading(true)
        try {
            await dispatch(updateCartItemAction({
                quantity: quantity - 1,
                productId: id
            }))
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
    }

    const onIncre = async () => {
        setLoading(true)
        try {
            await dispatch(updateCartItemAction({
                quantity: quantity + 1,
                productId: id
            }))
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
    }

    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-4">
                    {/* Image */}
                    <a href="./product.html">
                        <img className="img-fluid" src={images[0].thumbnail_url} alt="..." />
                    </a>
                </div>
                <div className="col-8">
                    {/* Title */}
                    <p className="font-size-sm font-weight-bold mb-6">
                        <a className="text-body" href="./product.html">{name}</a> <br />
                        <span className="card-product-price">
                            {
                                real_price === price ? (
                                    <span className="text-muted ml-1 inline-block text-2xl">{currency(price)}</span>
                                ) : <>
                                    <span className="sale text-primary">{currency(real_price)}</span>
                                    <span className="text-muted line-through ml-1 inline-block">{currency(price)}</span>
                                </>
                            }

                        </span>
                    </p>
                    {/*Footer */}
                    <div className="d-flex align-items-center">
                        {/* Select */}
                        <div className={cn('btn-group btn-quantity', { 'opacity-30 pointer-events-none': loading })}>
                            <button className="btn" onClick={onDecre}>-</button>
                            <input defaultValue={quantity} />
                            <button className="btn" onClick={onIncre}>+</button>
                        </div>
                        {/* Remove */}
                        <a className="font-size-xs text-gray-400 ml-auto" href="#!">
                            <i className="fe fe-x" /> Xóa
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}
