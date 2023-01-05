<<<<<<< HEAD
const profile = '/ca-nhan'
=======
const ACCOUNT_PATH = '/ca-nhan'
>>>>>>> 2eda8a9780371a880ab51f7ccb7d5e9350f724ef

export const PATH = {
    home: '/',
    product: '/san-pham',
<<<<<<< HEAD
    productDetail: '/:slug',
    category: '/:slug/:id',
    contact: '/lien-he',
    faq: '/hoi-dap',
    about: '/ve-chung-toi',
    shipping: '/quy-dinh-giao-hang',
    profile: {
        index: profile,
        order: profile + '/don-hang',
        orderDetail: profile + '/don-hang/:id',
        wishlist: profile + '/san-pham-yeu-thich',
        address: profile + '/so-dia-chi',
        addressDetail: profile + '/so-dia-chi/:id',
        payment: profile + '/so-thanh-toan',
        paymentDetail: profile + '/so-thanh-toan/:id',
        productHistory: profile + '/san-pham-da-xem'
    },
    account: '/signin'
=======
    productDetail: '/:slug-id:id',
    category: '/:slug-c:id',
    account: {
        index: ACCOUNT_PATH,
        address: ACCOUNT_PATH + '/dia-chi',
        payment: ACCOUNT_PATH + '/the-thanh-toan',
        wishlist: ACCOUNT_PATH + '/san-pham-yeu-thich',
        order: ACCOUNT_PATH + '/don-hang',
        historyProduct: ACCOUNT_PATH + '/san-pham-da-xem'
    }
>>>>>>> 2eda8a9780371a880ab51f7ccb7d5e9350f724ef
}