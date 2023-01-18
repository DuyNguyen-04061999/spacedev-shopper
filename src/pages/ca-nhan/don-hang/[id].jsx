import { Navigate } from '@/components/Navigate'
import { OrderItemStatus } from '@/components/OrderItem/OrderItemStatus'
import Skeleton from '@/components/Skeleton'
import { PAYMENT_METHOD } from '@/config'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import { useShippingMethod } from '@/hooks/useShippingMethod'
import { orderService } from '@/services/order'
import { currency } from '@/utils/currency'
import moment from 'moment/moment'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Skeleton as SkeletonA } from 'antd'


export default function OrderDetail() {
    const { id } = useParams()
    const { data: { data: detail }, loading, error } = useQuery({
        queryFn: () => orderService.getOrderDetail(id),
        limitDuration: 1000
    })

    const { data: { data: shippingMethod = [] } } = useShippingMethod()

    const checkoutReturn = useMemo(() => {
        if (detail && detail.status === 'finished') {
            return moment(detail.finishedDate) > moment().add(-7, 'd')
        }
    }, [detail])

    const shipping = useMemo(() => shippingMethod.find(e => e.code === detail.shipping.shippingMethod) || null, [detail])

    if (loading) return <Loading />
    if (!detail) return <Navigate to={PATH.profile.order} />


    return (
        <>
            {/* Order */}
            <div className="card card-lg mb-5 border">
                <div className="card-body pb-0">
                    {/* Info */}
                    <div className="card card-sm">
                        <OrderItemStatus {...detail} />
                    </div>
                </div>
                <div className="card-footer">
                    {/* Heading */}
                    <h6 className="mb-7">Order Items ({detail.totalQuantity})</h6>

                    {/* Divider */}
                    <hr className="my-5" />
                    {/* List group */}
                    <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
                        {
                            detail.listItems.map(e => (
                                <li key={e.productId} className="list-group-item px-0">
                                    <div className="flex align-items-center gap-2">
                                        <a className="block w-[120px]" href="product.html"><img src={e.product.thumbnail_url} alt="..." className="img-fluid" /></a>
                                        <div className="flex-1">
                                            {/* Title */}
                                            <p className="mb-4 font-size-sm font-weight-bold">
                                                <a className="text-body" href="product.html">{e.product.name} {e.quantity > 1 ? `x ${e.quantity}` : ''}</a> <br />
                                                <span className="text-muted">{currency(e.price)}</span>
                                            </p>

                                        </div>
                                        {
                                            detail.status === 'finished' && (
                                                <div className="">
                                                    {
                                                        checkoutReturn && <a href="#" className="btn btn-sm btn-block btn-outline-dark">Đỏi trả</a>
                                                    }
                                                    {
                                                        !e.review && <a href="#" className="btn btn-sm btn-block btn-outline-dark">Viết review</a>
                                                    }

                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    {
                        checkoutReturn && <p className="text-sm text-red-400">Sản phẩm "đổi trả" trong thời hạn 7 ngày sau khi nhận</p>
                    }
                </div>
            </div>
            {/* Total */}
            <div className="card card-lg mb-5 border">
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">Order Total</h6>
                    {/* List group */}
                    <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                        <li className="list-group-item d-flex">
                            <span>Subtotal</span>
                            <span className="ml-auto">{currency(detail.subTotal)}</span>
                        </li>
                        <li className="list-group-item d-flex">
                            <span>Tax</span>
                            <span className="ml-auto">{currency(detail.tax)}</span>
                        </li>
                        <li className="list-group-item d-flex">
                            <span>Promotion</span>
                            <span className="ml-auto">{currency(detail.promotion?.discount)}</span>
                        </li>
                        <li className="list-group-item d-flex">
                            <span>Shipping</span>
                            <span className="ml-auto">{currency(detail.shipping.shippingPrice)}</span>
                        </li>
                        <li className="list-group-item d-flex font-size-lg font-weight-bold">
                            <span>Total</span>
                            <span className="ml-auto">{currency(detail.total)}</span>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Details */}
            <div className="card card-lg border">
                <div className="card-body">
                    <h6 className="mb-7">Shipping Details</h6>
                    {/* Content */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {/* Heading */}
                            <p className="font-size-sm mb-0 leading-[35px]">
                                <a className="text-body text-xl font-bold " href="./product.html">{detail.shipping.fullName}</a> <br />
                                <b>Số điện thoại:</b> {detail.shipping.phone} <br />
                                <b>Email:</b>{detail.shipping.email}<br />
                                <b>Quận / Huyện:</b> {detail.shipping.district} <br />
                                <b>Tỉnh / thành phố:</b> {detail.shipping.province} <br />
                                <b>Địa chỉ:</b> {detail.shipping.address} <br />
                            </p>
                        </div>
                        <div className="col-12 col-md-6">
                            {/* Heading */}
                            <p className="mb-4 text-body text-xl font-bold">
                                Shipping Method:
                            </p>
                            <p className="mb-7">
                                {shipping?.title}
                            </p>
                            <p className="mb-7 text-gray-500">
                                {shipping?.description}
                            </p>
                            {/* Heading */}
                            <p className="mb-4 text-body text-xl font-bold">
                                Payment Method:
                            </p>
                            <p className="mb-0 text-gray-500">
                                {PAYMENT_METHOD[detail.payment.paymentMethod]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}





const Loading = () => {
    return <>
        {/* Order */}
        <div className="card card-lg mb-5 border">
            <div className="card-body pb-0">
                {/* Info */}
                <div className="card card-sm">
                    <Skeleton height={75.69} />
                </div>
            </div>
            <div className="card-footer">
                {/* Heading */}
                <h6 className="mb-7">Order Items </h6>

                {/* Divider */}
                <hr className="my-5" />
                {/* List group */}
                <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
                    <li className="list-group-item px-0">
                        <Skeleton height={120} />
                    </li>
                    <li className="list-group-item px-0">
                        <Skeleton height={120} />
                    </li>
                    <li className="list-group-item px-0">
                        <Skeleton height={120} />
                    </li>
                </ul>
            </div>
        </div>
        {/* Total */}
        <div className="card card-lg mb-5 border">
            <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">Order Total</h6>
                {/* List group */}
                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                    <li className="list-group-item d-flex">
                        <Skeleton height={24} />
                    </li>
                    <li className="list-group-item d-flex">
                        <Skeleton height={24} />
                    </li>
                    <li className="list-group-item d-flex">
                        <Skeleton height={24} />
                    </li>
                    <li className="list-group-item d-flex">
                        <Skeleton height={24} />
                    </li>
                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                        <Skeleton height={24} />
                    </li>
                </ul>
            </div>
        </div>
        {/* Details */}
        <div className="card card-lg border">
            <div className="card-body">
                <h6 className="mb-7">Shipping Details</h6>
                {/* Content */}
                <SkeletonA />
                <SkeletonA />
            </div>
        </div>
    </>
}