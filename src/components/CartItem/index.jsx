import { updateCartItemAction } from '@/stories/cart'
import { cn } from '@/utils'
import { currency } from '@/utils/currency'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Popconfirm } from '../Popconfirm'
import { useCart } from '@/hooks/useCart'
import { Checkbox } from '../Checkbox'
import { onKeyDownNumber } from '@/utils/onKeyDownNumber'

export const CartItem = ({ checkoutPrice, className, selected, allowSelect, hideRemove, hideInputQuantity, onSelect, id, name, real_price, price, quantity, thumbnail_url }) => {
    const dispatch = useDispatch()
    const { loading: { [id]: loading } } = useCart()
    const [_quantity, setQuantity] = useState(quantity)
    useEffect(() => {
        setQuantity(quantity)
    }, [quantity])

    const onChangeQuantity = (quantity) => async (ev) => {
        try {
            setQuantity(quantity)
            dispatch(updateCartItemAction({
                quantity,
                productId: id
            }))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className={cn("list-group-item", className)}>
            <div className="row align-items-center">
                <div className="w-[120px] d-flex flex items-center gap-2">
                    {
                        allowSelect && <Checkbox onChange={onSelect} checked={selected} />
                    }
                    {/* Image */}
                    <a href="./product.html">
                        <img className="img-fluid" src={thumbnail_url} alt="..." />
                    </a>
                </div>
                <div className="flex-1 px-2">
                    {/* Title */}
                    <div className="font-size-sm mb-6">
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
                        <div>{checkoutPrice}</div>
                    </div>
                    {/*Footer */}
                    <div className="d-flex align-items-center">
                        {/* Select */}
                        
                        {
                            !hideInputQuantity && (
                                <div className={cn('btn-group btn-quantity', { 'opacity-30 pointer-events-none': loading })}>
                                    <Popconfirm
                                        disabled={_quantity > 1}
                                        title="X??a s???n ph???m"
                                        placement="left"
                                        description={<p className="mb-4">B???n c?? mu???n x??a s???n ph???m kh???i gi??? h??ng kh??ng ?</p>}
                                        onConfirm={onChangeQuantity(_quantity - 1)}
                                    >
                                        <button className="btn" onClick={_quantity > 1 ? onChangeQuantity(_quantity - 1) : undefined}>-</button>
                                    </Popconfirm>
                                    <input
                                        type="number"
                                        value={_quantity}
                                        onKeyDown={onKeyDownNumber}
                                        onBlur={_quantity !== quantity ? onChangeQuantity(_quantity || 1) : undefined}
                                        onChange={(ev) => setQuantity(parseInt(ev.target.value || '1'))}
                                    />
                                    <button className="btn" onClick={onChangeQuantity(_quantity + 1)}>+</button>
                                </div>
                            )
                        }

                        {/* Remove */}
                        {
                            !hideRemove && (
                                <Popconfirm
                                    title="X??a s???n ph???m"
                                    placement="left"
                                    description={<p className="mb-4">B???n c?? mu???n x??a s???n ph???m kh???i gi??? h??ng kh??ng ?</p>}
                                    onConfirm={onChangeQuantity(0)}
                                >
                                    <a className="font-size-xs text-gray-400 ml-auto" href="#!">
                                        <i className="fe fe-x" /> X??a
                                    </a>
                                </Popconfirm>
                            )
                        }

                    </div>
                </div>
            </div>
        </li>
    )
}
