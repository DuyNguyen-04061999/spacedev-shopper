import { useCategories } from '@/hooks/useCategories'
import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from '@/hooks/useQuery'
import { productService } from '@/services/product'
import { array } from '@/utils/array'
import { currency } from '@/utils/currency'
import { Drawer } from 'antd'
import queryString from 'query-string'
import React, { useState } from 'react'
import Skeleton from '../Skeleton'

export const SearchDrawer = ({ open, onClose }) => {
    const { data: categories } = useCategories()
    const [value, setValue] = useDebounce('')
    const query = queryString.stringify({
        limit: 5,
        name: value || undefined
    })
    const { data: { data: products = [] } = {}, loading } = useQuery({
        queryKey: ['search', query],
        queryFn: () => productService.getProduct(`?${query}`),
        enabled: !!value.trim(),

    })
    return (
        <Drawer open={open} onClose={onClose} bodyStyle={{ padding: 0 }} width={470} headerStyle={{ display: 'none' }}>
            {/* Close */}
            <button onClick={onClose} type="button" className="close !outline-none" data-dismiss="modal" aria-label="Close">
                <i className="fe fe-x" aria-hidden="true" />
            </button>
            {/* Header*/}
            <div className="modal-header line-height-fixed font-size-lg">
                <strong className="mx-auto">Search Products</strong>
            </div>
            {/* Body: Form */}
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="modalSearchCategories">Categories:</label>
                        <select className="custom-select" id="modalSearchCategories">
                            <option>Tất cả sản phẩm</option>
                            {
                                categories.map(e => <option key={e.id} value={e.id}>{e.title}</option>)
                            }
                        </select>
                    </div>
                    <div className="input-group input-group-merge">
                        <input defaultValue={value} onChange={(ev) => setValue(ev.target.value)} className="form-control" type="search" placeholder="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-border" type="submit">
                                <i className="fe fe-search" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* Body: Results (add `.d-none` to disable it) */}
            <div className="modal-body border-top font-size-sm">
                {/* Heading */}
                {value ? <p>Kết quả tìm kiếm:</p> : <p className='border p-4'>Tìm kiếm bất kỳ sản phẩm nào mà bạn yêu thích, chúng tôi sẽ gợi ý cho bạn</p>}
                {/* Items */}
                {
                    value && (
                        loading ? array(5).map((_, i) => <CartItemLoading key={i}/>) :
                            products.length > 0 ?
                                products.map(e => <CartItem key={e.id} {...e} />) : <p className='border p-4'>Rất tiếu không tìm thấy sản phẩm phù hợp với lựa chọn của bạn</p>
                    )
                }
                {/* Button */}
                <a className="btn btn-link px-0 text-reset" href="./shop.html">
                    View All <i className="fe fe-arrow-right ml-2" />
                </a>
            </div>
            {/* Body: Empty (remove `.d-none` to disable it) */}
            <div className="d-none modal-body">
                {/* Text */}
                <p className="mb-3 font-size-sm text-center">
                    Nothing matches your search
                </p>
                <p className="mb-0 font-size-sm text-center">
                    😞
                </p>
            </div>
        </Drawer>
    )
}


const CartItem = ({ name, real_price, price, slug, id, images }) => {
    return (
        <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
                {/* Image */}
                <img className="img-fluid" src={images?.[0]?.thumbnail_url} alt="..." />
            </div>
            <div className="col position-static">
                {/* Text */}
                <p className="mb-0 font-weight-bold">
                    <a className="stretched-link text-body" href="./product.html">{name}</a> <br />
                    <span className="text-muted">{currency(real_price)}</span>
                </p>
            </div>
        </div>
    )
}

const CartItemLoading = () => {
    return (
        <div className="row align-items-center position-relative mb-5">
            <div className="col-4 col-md-3">
                {/* Image */}
                <Skeleton width={73} height={100} />
            </div>
            <div className="col position-static">
                {/* Text */}
                <p className="mb-0 font-weight-bold">
                    <a className="stretched-link text-body" href="#">
                        <Skeleton height={42.5}/>
                    </a> <br />
                    <span className="text-muted">
                        <Skeleton width={150} height={20}/>
                    </span>
                </p>
            </div>
        </div>
    )
}