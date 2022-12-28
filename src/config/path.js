const ACCOUNT_PATH = '/ca-nhan'

export const PATH = {
    home: '/',
    product: '/san-pham',
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
}