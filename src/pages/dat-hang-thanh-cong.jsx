import { Button } from '@/components/Button'
import { Navigate } from '@/components/Navigate'
import { PATH } from '@/config/path'
import React from 'react'
import { Link, generatePath, useLocation } from 'react-router-dom'

export const CheckoutSuccess = () => {
    const { state: order = {} } = useLocation()

    if (!order._id) return <Navigate to={PATH.viewCart} />

    const path = generatePath(PATH.profile.orderDetail, { id: order._id })
    return (
        <section className="py-12">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                        {/* Icon */}
                        <div className="mb-7 font-size-h1">❤️</div>
                        {/* Heading */}
                        <h2 className="mb-5">Your Order is Completed!</h2>
                        {/* Text */}
                        <p className="mb-7 text-gray-500">
                            Your order <Link to={path} className="text-body text-decoration-underline">{order._id}</Link> has been completed. Your order
                            details
                            are shown for your personal accont.
                        </p>
                        {/* Button */}
                        <div className="flex justify-center">
                            <Button link={path}>
                                View My Orders
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutSuccess