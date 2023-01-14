const profile = '/ca-nhan'

export const PATH = {
    home: '/',
    product: '/san-pham',
    productDetail: '/:slug',
    category: '/:slug/:id',
    contact: '/lien-he',
    faq: '/hoi-dap',
    about: '/ve-chung-toi',
    shipping: '/quy-dinh-giao-hang',
    viewCart: '/gio-hang',
    checkout: '/checkout',
    profile: {
        index: profile,
        order: profile + '/don-hang',
        orderDetail: profile + '/don-hang/:id',
        wishlist: profile + '/san-pham-yeu-thich',
        address: profile + '/so-dia-chi',
        editAddress: profile + '/so-dia-chi/edit/:id',
        newAddress: profile + '/so-dia-chi/new',
        payment: profile + '/so-thanh-toan',
        editPayment: profile + '/so-thanh-toan/edit/:id',
        newPayment: profile + '/so-thanh-toan/new',
    },
    account: '/signin'
}