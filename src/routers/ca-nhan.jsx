import { PrivateRoute } from "@/components/PrivateRoute"
import { PATH } from "@/config/path"
import { ProfileLayout } from "@/layouts/ProfileLayout"
import { lazy } from "react"

const Profile = lazy(() => import('@/pages/ca-nhan'))
const Order = lazy(() => import('@/pages/ca-nhan/don-hang'))
const OrderDetail = lazy(() => import('@/pages/ca-nhan/don-hang/[id]'))
const Wishlist = lazy(() => import('@/pages/ca-nhan/san-pham-yeu-thich'))
const Address = lazy(() => import('@/pages/ca-nhan/so-dia-chi'))
const AddressDetail = lazy(() => import('@/pages/ca-nhan/so-dia-chi/action'))
const Payment = lazy(() => import('@/pages/ca-nhan/so-thanh-toan'))
const PaymentDetail = lazy(() => import('@/pages/ca-nhan/so-thanh-toan/action'))
const ViewCart = lazy(() => import('@/pages/gio-hang'))
const Checkout = lazy(() => import('@/pages/checkout'))
const CheckoutSuccess = lazy(() => import('@/pages/dat-hang-thanh-cong'))

export const profile = {
    element: <PrivateRoute redirect={PATH.account} />,
    children: [
        {
            element: <ViewCart />,
            path: PATH.viewCart
        },
        {
            element: <Checkout />,
            path: PATH.checkout
        },
        {
            element: <CheckoutSuccess />,
            path: PATH.checkoutSuccess
        },
        {
            element: <ProfileLayout />,
            path: PATH.profile.index,
            children: [
                {
                    element: <Profile />,
                    index: true
                },
                {
                    element: <Order />,
                    path: PATH.profile.order
                },
                {
                    element: <OrderDetail />,
                    path: PATH.profile.orderDetail
                },
                {
                    element: <Wishlist />,
                    path: PATH.profile.wishlist
                },
                {
                    element: <Address />,
                    path: PATH.profile.address
                },
                {
                    element: <AddressDetail />,
                    path: PATH.profile.editAddress
                },
                {
                    element: <AddressDetail />,
                    path: PATH.profile.newAddress
                },
                {
                    element: <Payment />,
                    path: PATH.profile.payment
                },
                {
                    element: <PaymentDetail />,
                    path: PATH.profile.newPayment
                },
                {
                    element: <PaymentDetail />,
                    path: PATH.profile.editPayment
                },
            ]
        }
    ]
}