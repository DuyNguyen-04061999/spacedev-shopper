import PaymentCard, { ListPaymentCard } from '@/components/PaymentCard'
import { Portal } from '@/components/Portal'
import { PROFILE_HEADER_SELECTOR } from '@/config'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { array } from '@/utils/array'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Payment() {
    const { loading, data: { data: payments = [] } = {}, callBackgroundApi } = useQuery({
        queryFn: () => userService.getPayment(),
        onSuccess: (res) => {
            res.data.sort(e => e.default ? -1 : 0)
            return res
        }
    })

    return (
        <>
            <Portal selector={PROFILE_HEADER_SELECTOR}>
                Sổ thanh toán
            </Portal>
            <Helmet>
                <titl>Sổ thanh toán</titl>
            </Helmet>
            <div className="row">

                <ListPaymentCard
                    loading={loading}
                    data={payments}
                    onDelete={callBackgroundApi}
                    onChangeDefault={callBackgroundApi}
                />

                {/* {
                    loading ? array(3).map((_, i) => <div key={i} className='col-12'>
                        <PaymentCard loading={true} />
                    </div>) :
                        payments.length > 0 ? payments.map(e => (
                            <div key={e._id} className="col-12">
                                <PaymentCard onDelete={callBackgroundApi} onChangeDefault={callBackgroundApi} {...e} />
                            </div>
                        )) : <div className="col-12"><p className='text-xl border p-5 text-center'>Hiện bạn chưa có thanh toán nào, thêm sổ thanh toán để sử dụng trong quá trình mua hàng được tốt hơn 😞</p></div>
                } */}

                <div className="col-12">
                    {/* Button */}
                    <Link className="btn btn-block btn-lg btn-outline-border" to={PATH.profile.newPayment}>
                        Add Payment Method <i className="fe fe-plus" />
                    </Link>
                </div>
            </div>
        </>
    )
}
