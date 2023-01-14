import { updateCartItemAction } from '@/stories/cart'
import { cn } from '@/utils'
import { currency } from '@/utils/currency'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Popconfirm } from '../Popconfirm'
import { useCart } from '@/hooks/useCart'

export const CartItem = ({ id, name, real_price, price, quantity, images }) => {
    const dispatch = useDispatch()
    const { loading: { [id]: loading } } = useCart()
    // const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [_quantity, setQuantity] = useState(quantity)

    const onChangeQuantity = (quantity) => async () => {
        // setLoading(true)
        try {
            setQuantity(quantity)
            dispatch(updateCartItemAction({
                quantity,
                productId: id
            }))
        } catch (err) {
            console.error(err)
        }

        // setLoading(false)
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
                            <Popconfirm
                                disabled={_quantity > 1}
                                title="Xóa sản phẩm"
                                placement="left"
                                description={<p>Bạn có muốn xóa sản phẩm khỏi giỏ hàng không ?</p>}
                                onConfirm={onChangeQuantity(_quantity - 1)}
                            >
                                <button className="btn" onClick={_quantity > 1 && onChangeQuantity(_quantity - 1)}>-</button>
                            </Popconfirm>
                            <input
                                type="number"
                                value={_quantity || (!deleting && 1)}
                                onKeyDown={evt => {
                                    if (evt.key === 'e' || evt.key === 'E' || (evt.target.value === '' && evt.key === '0')) {
                                        evt.preventDefault();
                                    }
                                }}
                                onBlur={onChangeQuantity(_quantity || 1)}
                                onChange={(ev) => setQuantity(parseInt(ev.target.value))}
                            />
                            <button className="btn" onClick={onChangeQuantity(_quantity + 1)}>+</button>
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
