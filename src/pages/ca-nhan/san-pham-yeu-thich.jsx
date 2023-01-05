import { Paginate } from '@/components/Paginate'
import { ProductCard, ProductCardLoading } from '@/components/ProductCard'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import { useSearch } from '@/hooks/useSearch'
import { productService } from '@/services/product'
import { array } from '@/utils/array'
import { indexDBStorage } from '@/utils/indexDB'
import queryString from 'query-string'
import React from 'react'
import { Link } from 'react-router-dom'


export default function Wishlist() {
    const [search] = useSearch({ page: 1, limit: 9 })

    const qs = queryString.stringify(search)

    const { data: { data: products = [], paginate = {} } = {}, loading } = useQuery({
        queryFn: () => productService.getWishlist(`?${qs}`),
        queryKey: [qs],
        keepPreviousData: true
    })
    return (
        <>
            {/* Products */}
            <div className="row">
                {
                    loading ? array(9).map((_, i) => (<div key={i} className="col-6 col-md-4"><ProductCardLoading /></div>))
                        :
                        products.length > 0 ? products.map(e => (<div key={e.id} className="col-6 col-md-4"><ProductCard hideWishlist {...e} /></div>))
                            : <p className='text-xl border p-5 w-full text-center'>Hiện bạn chưa có sản phẩm yêu thích nào, bạn có thể đưa bất kỳ sản phẩm nào bạn muốn vào sản phẩm yêu thích 😞
                                <br />
                                <Link className='btn btn-sm btn-dark mt-5' to={PATH.product}>Sản phẩm</Link>
                            </p>
                }
            </div>
            {/* Pagination */}
            <Paginate totalPage={paginate.totalPage} />
        </>
    )
}
