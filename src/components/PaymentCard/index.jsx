import { MESSAGE } from '@/config/message'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { message } from 'antd'
import moment from 'moment'
import React, { useRef } from 'react'
import { Button } from '../Button'
import { useAction } from '@/hooks/useAction'
import { Link, generatePath } from 'react-router-dom'
import { PATH } from '@/config/path'
import Skeleton from '../Skeleton'
import { withLoading } from '@/utils/withLoading'
import { array } from '@/utils/array'
import { Popconfirm } from '../Popconfirm'
import { withListLoading } from '@/utils/withListLoading'

const Card = ({ onDelete, onChangeDefault, type, cardNumber, expired, cardName, default: defaultPayment, _id }) => {
    const _onChangeDefault = useAction({
        action: () => userService.editPayment(_id, { default: true }),
        messageSuccess: MESSAGE.CHANGE_ADDRESS_DEFAULT_SUCCESS,
        onSuccess: onChangeDefault
    })


    const _onDelete = useAction({
        action: () => userService.deletePayment(_id),
        messageSuccess: MESSAGE.DELETE_PAYMENT_SUCCESS,
        onSuccess: onDelete
    })

    const t = expired.split('/')
    const month = t[0]
    const year = t[1]
    // console.log(expried);
    return (
        <div className="payment-card card card-lg bg-light mb-8">
            <div className="card-body relative">
                {/* Heading */}
                <h6 className="mb-6">
                    {type === 'card' ? 'Debit / Credit Card' : 'Paypall'}
                </h6>
                {/* Text */}
                <p className="mb-5">
                    <strong>Card Number:</strong>
                    <span className="text-muted">{cardNumber}</span>
                </p>
                {/* Text */}
                <p className="mb-5">
                    <strong>Expiry Date:</strong>
                    <span className="text-muted">{moment(`${month.padStart(2,0)}/01/${year}`).format('MMM, YYYY')}</span>
                </p>
                {/* Text */}
                <p className="mb-0">
                    <strong>Name on Card:</strong>
                    <span className="text-muted">{cardName}</span>
                </p>
                {
                    defaultPayment && (
                        <div className="card-action-right-bottom select-none">
                            <div href="#" className="color-success">
                                Thanh toán mặc định
                            </div>


                        </div>
                    )
                }
                {
                    !defaultPayment && (
                        <div className='card-action-right-bottom hidden'>
                            <Button size='xs' type="outline" onClick={_onChangeDefault}>Đặt làm mặc định</Button>
                        </div>
                    )
                }


                {/* Action */}
                <div className="card-action card-action-right flex gap-2">
                    <Link to={generatePath(PATH.profile.editPayment, { id: _id })} className="btn btn-xs btn-circle btn-white-primary">
                        <i className="fe fe-edit-2" />
                    </Link>
                    {
                        !defaultPayment && (
                            <Popconfirm placement="topRight" title="Cảnh bảo" onConfirm={_onDelete} description={<p>Bạn có chắc chắn muốn xóa sổ địa chỉ này không ?</p>}>
                                <button  className="btn btn-xs btn-circle btn-white-primary">
                                    <i className="fe fe-x" />
                                </button>
                            </Popconfirm>
                        )
                    }

                </div>
            </div>
        </div>
    )
}


const PaymentCardLoading = () => {
    return (
        <div className="payment-card card card-lg bg-light mb-8">
            <div className="card-body relative">
                {/* Heading */}
                <h6 className="mb-6">
                    <Skeleton height={24} width={200} />
                </h6>
                {/* Text */}
                <p className="mb-5">
                    <Skeleton height={22} width={300} />
                </p>
                {/* Text */}
                <p className="mb-5">
                    <Skeleton height={22} width={250} />
                </p>
                {/* Text */}
                <p className="mb-0">
                    <Skeleton height={22} width={400} />
                </p>
            </div>
        </div>
    )
}

export const PaymentCard = withLoading(Card, PaymentCardLoading)

export default PaymentCard


export const ListPaymentCard = withListLoading(PaymentCard, PaymentCardLoading)