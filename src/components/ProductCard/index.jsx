import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from '../Skeleton'
import { currency } from '@/utils/currency'

export const ProductCard = ({ name, price, real_price, images, slug, id, rating_average }) => {

    const image1 = images[0].thumbnail_url
    const image2 = images?.[1]?.thumbnail_url || image1
    const salePrice = price - real_price


    const _slug = '/' + slug
    return (
        <div className="card mb-7">
            {/* Badge */}
            {
                salePrice > 0 && <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
                    - {Math.floor(salePrice / price * 100)}%
                </div>
            }

            {/* Image */}
            <div className="card-img">
                {/* Image */}
                <Link to={_slug} className="card-img-hover" href="product.html">
                    <img className="card-img-top card-img-back" src={image1} alt="..." />
                    <img className="card-img-top card-img-front" src={image2} alt="..." />
                </Link>
                {/* Actions */}
                <div className="card-actions">
                    <span className="card-action">
                    </span>
                    <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-shopping-cart" />
                        </button>
                    </span>
                    <span className="card-action">
                        <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-heart" />
                        </button>
                    </span>
                </div>
            </div>
            {/* Body */}
            <div className="card-body px-0">
                {/* Category */}
                <div className="font-size-xs">
                    <a className="text-muted" href="shop.html">Shoes</a>
                </div>
                {/* Title */}
                <div className="font-weight-bold">
                    <Link className="text-body card-product-name" to={_slug}>
                        {name}
                    </Link>
                </div>
                <div className="card-product-rating">

                    {rating_average > 0 && <>
                        {rating_average}
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" size={14} color="#fdd836" height={14} width={14} xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(253, 216, 54)' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" size={14} color="#fdd836" height={14} width={14} xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(253, 216, 54)' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" size={14} color="#fdd836" height={14} width={14} xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(253, 216, 54)' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" size={14} color="#fdd836" height={14} width={14} xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(253, 216, 54)' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" size={14} color="#fdd836" height={14} width={14} xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(253, 216, 54)' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    </>}

                </div>
                {/* Price */}
                <div className="card-product-price flex items-baseline ">
                    {
                        real_price < price ? <>
                            <span className="text-primary sale">{currency(real_price)}</span>
                            <span className="font-size-xs text-gray-350 text-decoration-line-through ml-1">{currency(price)}</span>
                        </> : <>
                            <span className="text-xl flex h-full items-end">{currency(real_price)}</span>
                        </>
                    }

                </div>
            </div>
        </div>
    )
}

export const ProductCardLoading = () => {

    return <div className="card mb-7">
        {/* Image */}
        <div className="card-img">
            {/* Image */}
            <Link to='#' className="card-img-hover" href="product.html">
                <Skeleton height={300} />
            </Link>
        </div>
        {/* Body */}
        <div className="card-body px-0">
            {/* Category */}
            <div className="font-size-xs">
                <a className="text-muted" href="shop.html">
                    <Skeleton height={19} width={150} />
                </a>
            </div>
            {/* Title */}
            <div className="font-weight-bold">
                <Link className="text-body card-product-name" to='#'>
                    <Skeleton height={66} />
                </Link>
            </div>
            <div className="card-product-rating">
                <Skeleton height={21} width={150} />
            </div>
            {/* Price */}
            <div className="card-product-price">
                <Skeleton height={32} width={100} />
            </div>
        </div>
    </div>
}