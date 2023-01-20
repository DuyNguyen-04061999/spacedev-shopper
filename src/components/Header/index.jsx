import { PATH } from '@/config/path'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchDrawer } from '../SearchDrawer'
import { useAuth } from '@/hooks/useAuth'
import { avatarDefault } from '@/config/assets'
import { useDispatch } from 'react-redux'
import { logoutThunkAction } from '@/stories/auth'
import { Dropdown, Popover } from 'antd'
import { useCart } from '@/hooks/useCart'
import { Button } from '../Button'
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons'
import { cartActions } from '@/stories/cart'
import { CartDrawer } from '../CartDrawer'
import { useTranslate } from '../TranslateProvider'
import _ from 'lodash'


const LANG = {
    en: 'English',
    vi: 'Tiếng Việt',
    zh: 'China'
}


export const Header = () => {
    const { t, setLang, lang } = useTranslate()
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [openCart, setOpenCart] = useState(false)
    const { cart, openCartOver } = useCart()
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
    const onOpenSearchDrawer = (ev) => {
        ev.preventDefault()
        setOpenSearchDrawer(true)
    }


    const items = useMemo(() => {
        return [
            {
                key: 1,
                label: (
                    <Link to={PATH.profile.index}>
                        Tài khoản của tôi
                    </Link>
                ),
            },
            {
                key: 3,
                label: (
                    <Link to={PATH.profile.order}>
                        Đơn hàng
                    </Link>
                ),
            },
            {
                key: 2,
                label: 'Đăng xuất',
                onClick: () => {
                    dispatch(logoutThunkAction())
                }
            }
        ]
    }, [])

    return (
        <>
            <SearchDrawer open={openSearchDrawer} onClose={() => setOpenSearchDrawer(false)} />
            {/* NAVBAR */}
            <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
                <div className="container">
                    {/* Promo */}
                    <div className="mr-xl-8">
                        <i className="fe fe-truck mr-2" /> <span className="heading-xxxs">Vận chuyển toàn cầu</span>
                    </div>
                    {/* Toggler */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topbarCollapse" aria-controls="topbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Collapse */}
                    <div className="navbar-collapse" id="topbarCollapse">
                        {/* Nav */}
                        <ul className="nav nav-divided navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                {/* Toggle */}
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                                    <img className="mb-1 mr-1" src="/img/flags/usa.svg" alt="..." /> United States
                                </a>
                                {/* Menu */}
                                <div className="dropdown-menu minw-0">
                                    <a className="dropdown-item" href="#!">
                                        <img className="mb-1 mr-2" src="/img/flags/usa.svg" alt="USA" />United States
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        <img className="mb-1 mr-2" src="/img/flags/canada.svg" alt="Canada" />Canada
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        <img className="mb-1 mr-2" src="/img/flags/germany.svg" alt="Germany" />Germany
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                {/* Toggle */}
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">USD</a>
                                {/* Menu */}
                                <div className="dropdown-menu minw-0">
                                    <a className="dropdown-item" href="#!">USD</a>
                                    <a className="dropdown-item" href="#!">EUR</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Dropdown arrow placement="topRight" menu={{
                                    items: _.map(LANG, (title, code) => ({
                                        key: code,
                                        label: title,
                                        onClick: () => setLang(code)
                                    }))
                                    // [
                                    //     {
                                    //         label: 'English',
                                    //         onClick: () => setLang('en')
                                    //     },
                                    //     {
                                    //         label: 'Tiếng Việt',
                                    //         onClick: () => setLang('vi')
                                    //     },
                                    //     {
                                    //         label: 'China',
                                    //         onClick: () => setLang('zh')
                                    //     },
                                    // ]
                                }}>
                                    <a className="nav-link dropdown-toggle" href="#">{LANG[lang]}</a>
                                </Dropdown>
                            </li>
                        </ul>
                        {/* Nav */}
                        <ul className="nav navbar-nav mr-8">
                            <li className="nav-item">
                                <a className="nav-link" href="./shipping-and-returns.html">Quy định giao hàng</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./faq.html">Câu hỏi</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./contact-us.html">Liên hệ</a>
                            </li>
                        </ul>
                        {/* Nav */}
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-facebook-f" />
                                </a>
                            </li>
                            <li className="nav-item ml-xl-n4">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-twitter" />
                                </a>
                            </li>
                            <li className="nav-item ml-xl-n4">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                            <li className="nav-item ml-xl-n4">
                                <a className="nav-link text-gray-350" href="#!">
                                    <i className="fab fa-medium" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                    {/* Brand */}
                    <Link className="navbar-brand" to={PATH.home}>
                        <img style={{ width: '50px' }} src="/img/logo.svg" />
                        Shopper.
                    </Link>
                    {/* Toggler */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Collapse */}
                    <div className="navbar-collapse" id="navbarCollapse">
                        {/* Nav */}
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={PATH.home}>{t('Home')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={PATH.product}>{t('Product')}</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="./shop.html">Laptop</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="./shop.html">Máy tính</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./shop.html">Sản phẩm khuyến mãi</a>
                            </li>
                        </ul>
                        {/* Nav */}
                        <ul className="navbar-nav flex-row">
                            <li className="nav-item">
                                <a onClick={onOpenSearchDrawer} className="nav-link" data-toggle="modal" href="#modalSearch">
                                    <i className="fe fe-search" />
                                </a>
                            </li>
                            <li className="nav-item ml-lg-n4">
                                <Link className="nav-link" to={PATH.profile.wishlist}>
                                    <i className="fe fe-heart" />
                                </Link>
                            </li>
                            <li className="nav-item ml-lg-n4">
                                <Popover
                                    trigger={[openCartOver ? 'click' : 'hover']}
                                    onOpenChange={() => dispatch(cartActions.toggleCartOver(false))}
                                    open={openCartOver}
                                    placement='bottomRight'
                                    content={<div>
                                        <p className='mb-2 flex items-center gap-1'> <span className='text-green-500'><CheckCircleFilled /></span> Thêm vào giỏ hàng thành công</p>
                                        <Button onClick={() => dispatch(cartActions.toggleCartOver(false))} link={PATH.viewCart} size='xs'>Xem giỏ hàng và thanh toán</Button>
                                    </div>}
                                >
                                    <div onClick={() => setOpenCart(true)} className="nav-link cursor-pointer">
                                        <span data-cart-items={cart?.totalQuantity || undefined}>
                                            <i className="fe fe-shopping-cart" />
                                        </span>
                                    </div>

                                </Popover>

                                <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
                            </li>
                            <li className="nav-item ml-lg-n4">
                                {
                                    user ? (
                                        <Dropdown menu={{ items }} placement='bottomRight' arrow>
                                            <div className="header-avatar nav-link cursor-pointer">
                                                <img src={user.avatar || avatarDefault} />
                                            </div>
                                        </Dropdown>
                                    ) : (
                                        <Link className="nav-link" to={PATH.account}>
                                            <i className="fe fe-user" />
                                        </Link>
                                    )

                                }

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
