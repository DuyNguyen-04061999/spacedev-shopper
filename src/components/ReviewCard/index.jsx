import { PATH } from '@/config/path'
import { useCategories, useCategory } from '@/hooks/useCategories'
import { generatePathProduct } from '@/utils/generatePathProduct'
import { slugify } from '@/utils/slugify'
import moment from 'moment'
import React from 'react'
import { Link, generatePath } from 'react-router-dom'

export const ReviewCard = ({ product, star, content, createdAt, user }) => {
    const category = useCategory(product.categories)
    return (
        <div className="card-lg card border">
            <div className="card-body">
                {/* Header */}
                <div className="row align-items-center mb-6">
                    <div className="col-4">
                        {/* Image */}
                        <img src={product.thumbnail_url} alt="..." className="img-fluid" />
                    </div>
                    <div className="col-8 ml-n2">
                        {/* Preheading */}
                        <Link className="font-size-xs text-muted" to={generatePath(PATH.category, { slug: slugify(category?.title || ''), id: category?.id || '' })}>
                            {category?.title}
                        </Link>
                        {/* Heading */}
                        <Link className="d-block font-weight-bold text-body" to={generatePathProduct(product)}>
                            {product.name}
                        </Link>
                        {/* Rating */}
                        <div className="rating font-size-xxs text-warning" data-value={star}>
                            <div className="rating-item">
                                <i className="fas fa-star" />
                            </div>
                            <div className="rating-item">
                                <i className="fas fa-star" />
                            </div>
                            <div className="rating-item">
                                <i className="fas fa-star" />
                            </div>
                            <div className="rating-item">
                                <i className="fas fa-star" />
                            </div>
                            <div className="rating-item">
                                <i className="fas fa-star" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Blockquote */}
                <blockquote className="mb-0">
                    <p className="text-muted">
                        {content}
                    </p>
                    <footer className="font-size-xs text-muted">
                        {user.name}, <time dateTime="2019-06-01">{moment(createdAt).format('MMM DD, YYYY')}</time>
                    </footer>
                </blockquote>
            </div>
        </div>
    )
}
