import { useQuery } from '@/hooks/useQuery'
import React, { useState } from 'react'
import { Button } from '../Button'
import { Form } from '../Form'
import { Field } from '../Field'
import { required } from '@/utils/rule'
import { reviewService } from '@/services/review'

export const FormReview = ({ productId, orderId, onSuccess }) => {
    const [star, setStar] = useState(5)
    const { refetch: addReviewService, loading: loadingAddReview } = useQuery({
        queryFn: ({ params }) => reviewService.newReview(productId, {
            orderId,
            star,
            ...params[0]
        }),
        onSuccess: (data) => {
            onSuccess(data)
        },
        enabled: false
    })

    const onClickStar = (star) => () => {
        setStar(star)
    }



    return (
        <div className="mb-10">
            {/* Divider */}
            <hr className="my-8" />
            {/* Form */}
            <Form form={{ rules: { content: [required()] } }} onSubmit={addReviewService}>
                <div className="row">
                    <div className="col-12 mb-6 text-center">
                        {/* Text */}
                        <p className="mb-1 font-size-xs">
                            Score:
                        </p>
                        {/* Rating form */}
                        <div className="rating-form">
                            {/* Rating */}
                            <div className="rating h5 text-dark" data-value={star}>
                                <div className="rating-item">
                                    <i className="fas fa-star cursor-pointer" onClick={onClickStar(1)} />
                                </div>
                                <div className="rating-item">
                                    <i className="fas fa-star cursor-pointer" onClick={onClickStar(2)} />
                                </div>
                                <div className="rating-item">
                                    <i className="fas fa-star cursor-pointer" onClick={onClickStar(3)} />
                                </div>
                                <div className="rating-item">
                                    <i className="fas fa-star cursor-pointer" onClick={onClickStar(4)} />
                                </div>
                                <div className="rating-item">
                                    <i className="fas fa-star cursor-pointer" onClick={onClickStar(5)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        {/* Name */}
                        <Form.Item name="content">
                            <Field
                                renderField={(props) => <textarea {...props} onChange={(ev) => props.onChange(ev.target.value)} className="form-control form-control-sm" rows={5} placeholder="Review *" />}
                            />
                        </Form.Item>
                    </div>
                    <div className="col-12 text-center flex justify-center">
                        {/* Button */}
                        <Button loading={loadingAddReview}>
                            Post Review
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}
