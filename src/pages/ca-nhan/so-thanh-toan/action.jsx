import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Field } from '@/components/Field'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Portal } from '@/components/Portal'
import { Radio } from '@/components/Radio'
import { Select } from '@/components/Select'
import { PROFILE_HEADER_SELECTOR } from '@/config'
import { MESSAGE } from '@/config/message'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { array } from '@/utils/array'
import { handleError } from '@/utils/handleError'
import { required } from '@/utils/rule'
import { Spin, message } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'


const rules = {
    month: [required()],
    year: [required()],
    cardNumber: [required()],
    cardName: [required()],
    cvv: [required()]
}

export default function PaymentDetail() {
    const { id } = useParams()
    const [step, setStep] = useState(id ? 1 : 0)
    const [type, setType] = useState('card')
    const navigate = useNavigate()
    const { loading, refetch: onSubmit } = useQuery({
        queryFn: async ({ params: [values] }) => {
            const obj = {
                cardName: values.cardName,
                cardNumber: values.cardNumber,
                type,
                expired: values.month + '/' + values.year,
                cvv: values.cvv,
                default: values.default
            }

            if (id) {
                const res = await userService.editPayment(id, obj)
                message.success(MESSAGE.EDIT_PAYMENT_SUCCESS)
            } else {
                await userService.newPayment(obj)
                message.success(MESSAGE.ADD_PAYMENT_SUCCESS)
            }
            navigate(PATH.profile.payment)
        },
        onError: (err) => handleError(err),
        enabled: false
    })

    const { loading: loadingPayment, data: payment } = useQuery({
        queryFn: () => userService.getPaymentDetail(id),
        enabled: !!id,
        onSuccess: (res) => {
            const payment = res.data
            const date = payment.expired.split('/')
            payment.month = date[0]
            payment.year = date[1]
            return payment
        }
    })

    // const onSubmit = async (values) => {
    //     try {
    //         await addPaymentService({
    //             cardName: values.cardName,
    //             cardNumber: values.cardNumber,
    //             type,
    //             expired: values.month + '/' + values.year,
    //             cvv: values.cvv,
    //             default: values.default
    //         })
    //         message.success(MESSAGE.ADD_PAYMENT_SUCCESS)
    //         navigate(PATH.profile.payment)
    //     } catch (err) {
    //         handleError(err)
    //     }
    // }


    return (
        <div>
            <Portal selector={PROFILE_HEADER_SELECTOR}>
                Sổ thanh toán
            </Portal>
            <Helmet>
                <titl>Sổ thanh toán</titl>
            </Helmet>
            {/* Heading */}
            <h6 className="mb-7">
                {id ? 'Edit Card' : 'Add Card'} Debit / Credit Card
            </h6>
            {
                step === 0 && (
                    <div>
                        <Radio.Group onChange={value => setType(value)} value={type}>
                            {/* Card */}
                            <div className="form-group card card-sm border">
                                <div className="card-body">
                                    {/* Radio */}
                                    <Radio value="card">I want to add Debit / Credit Card <img className="ml-2" src="/img/brands/color/cards.svg" alt="..." /></Radio>
                                </div>
                            </div>
                            {/* Card */}
                            <div className="form-group card card-sm border">
                                <div className="card-body">
                                    <Radio value="paypall">I want to add PayPall <img src="/img/brands/color/paypal.svg" alt="..." /></Radio>
                                </div>
                            </div>
                        </Radio.Group>
                        {/* Button */}
                        <Button onClick={() => setStep(1)}>
                            Continue <i className="fe fe-arrow-right ml-2" />
                        </Button>
                    </div>
                )
            }

            {
                step === 1 && (
                    <Spin spinning={loadingPayment}>
                        <Form
                            onSubmit={onSubmit}
                            form={{
                                rules,
                                initialValue: payment
                            }}
                        >
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <Form.Item name="cardNumber">
                                        <Field type="number" placeholder="Card Number *" label="Card Number *" />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Form.Item name="cardName">
                                        <Field placeholder="Name on Card *" label="Name on Card *" />
                                    </Form.Item>

                                </div>
                                <div className="col-12">
                                    {/* Label */}
                                    <label>
                                        Expiry Date *
                                    </label>
                                </div>
                                <div className="col-12 col-md-4">
                                    <Form.Item name="month">
                                        <Field
                                            renderField={(props) => (
                                                <Select {...props}>
                                                    <option value="">Month *</option>
                                                    {
                                                        array(12).map((_, i) => <option key={i} value={i + 1}>{moment(`${i + 1}/01/2000`).format('MMMM')}</option>)
                                                    }
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>


                                </div>
                                <div className="col-12 col-md-4">
                                    <Form.Item name="year">
                                        <Field
                                            renderField={(props) => (
                                                <Select {...props}>
                                                    <option value="">Year *</option>
                                                    {
                                                        array(30).map((_, i) => {
                                                            const value = (new Date()).getFullYear() + 10 - i

                                                            return <option key={value} value={value}>{value}</option>
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-12 col-md-4">
                                    <Form.Item name="cvv">
                                        <Input type="number" placeholder="CVV *" helper="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards." />
                                    </Form.Item>

                                    {/* <div className="form-group">
                                    <div className="input-group input-group-merge">
                                        <input className="form-control" id="paymentCardCVV" type="text" placeholder="CVV *" required />
                                        <div className="input-group-append">
                                            <span className="input-group-text" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards." data-original-title title>
                                                <i className="fe fe-help-circle" />
                                            </span>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                                <div className="col-12 mb-5">
                                    <Form.Item name="default">
                                        {
                                            (props) => <Checkbox {...props} onChange={ev => {
                                                if (payment?.default) {
                                                    message.warning('Bạn không thể bỏ địa chỉ mặc định')
                                                    return
                                                }
                                                props?.onChange(ev)
                                            }} >Default payment method</Checkbox>
                                        }
                                    </Form.Item>
                                </div>
                            </div>
                            {/* Button */}
                            <Button loading={loading}>
                                {id ? 'Edit Card' : 'Add Card'}
                            </Button>
                        </Form>
                    </Spin>
                )
            }

        </div>
    )
}
