import { regexp, required } from '@/utils/rule'
import { Field } from '../Field'
import { Form } from '../Form'
import { forwardRef, useRef } from 'react'

const rules = {
    fullName: [required()],
    phone: [required(), regexp('phone')],
    email: [required(), regexp('email')],
    province: [required()],
    district: [required()],
    address: [required()]
}

export const AddressForm = forwardRef(({ initialValue, action, footer, onSubmit }, outerRef) => {

    return (
        <Form ref={outerRef} form={{ rules, initialValue }} onSubmit={onSubmit}>
            <div className="row">
                <div className="col-12">
                    <Form.Item name="fullName">
                        <Field
                            label="Full Name *"
                            placeholder="Full Name *"
                        />
                    </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Item name="phone">
                        <Field
                            label="Phone Number*"
                            placeholder="Phone Number*"

                        />
                    </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Item name="email">
                        <Field
                            label="Email Address *"
                            placeholder="Email Address *"

                        />
                    </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Item name="district">
                        <Field
                            label="District *"
                            placeholder="District *"

                        />
                    </Form.Item>
                </div>
                <div className="col-12 col-md-6">
                    <Form.Item name="province">
                        <Field
                            label="Province / City*"
                            placeholder="Province / City*"

                        />
                    </Form.Item>
                </div>
                <div className="col-12">
                    <Form.Item name="address">
                        <Field
                            label="Address *"
                            placeholder="Address *"
                        />
                    </Form.Item>
                </div>
                {footer}
            </div>
            {/* Button */}
            {action}
        </Form>
    )
})