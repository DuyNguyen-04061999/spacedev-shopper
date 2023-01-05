import { logoutThunkAction } from '@/stories/auth'
import React, { Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

export const ProfileLayout = () => {
  const dispatch = useDispatch()
  const logout = (ev) => {
    ev.preventDefault()
    dispatch(logoutThunkAction())
  }

  return (
    <section className="pt-7 pb-12">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10">Theo dõi đơn hàng</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-orders.html">Đơn hàng</a>
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-personal-info.html">Tài khoản của tôi</a>
                <a className="list-group-item list-group-item-action dropright-toggle active" href="account-wishlist.html">Sản phẩm yêu thích</a>
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-address.html">Sổ địa chỉ</a>
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-payment.html">Sổ thanh toán</a>
                <a className="list-group-item list-group-item-action dropright-toggle " href="account-product.html">Sản phẩm đã xem</a>
                <a className="list-group-item list-group-item-action dropright-toggle" href="#!" onClick={logout}>Đăng xuất</a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            <Suspense fallback={<div>ProfileLayout loading....</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </section>

  )
}
