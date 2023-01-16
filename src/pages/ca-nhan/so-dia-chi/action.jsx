import { AddressForm } from '@/components/AddressForm'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Field } from '@/components/Field'
import { Form } from '@/components/Form'
import { Portal } from '@/components/Portal'
import { MESSAGE, WARNING } from '@/config/message'
import { PATH } from '@/config/path'
import { useQuery } from '@/hooks/useQuery'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { isEqual } from '@/utils/object'
import { regexp, required } from '@/utils/rule'
import { Spin, message } from 'antd'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'

const rules = {
    fullName: [required()],
    phone: [required(), regexp('phone')],
    email: [required(), regexp('email')],
    province: [required()],
    district: [required()],
    address: [required()]
}

export default function AddressDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: { data: address = null } = {}, loading: dataLoading } = useQuery({
        queryFn: () => userService.getAddressDetail(id),
        enabled: !!id,
        limitDuration: 1000,
        onError: (err) => {
            handleError(err)
            navigate(PATH.profile.address)
        }
    })
    const { loading, refetch: newAddressService } = useQuery({
        queryFn: ({ params }) => userService.newAddress(...params),
        enabled: false
    })

    const { loading: editLoading, refetch: editAddressService } = useQuery({
        queryFn: ({ params }) => userService.editAddress(...params),
        enabled: false
    })

    const onSubmit = async (values) => {

        try {
            if (id) {

                if (isEqual(address, values)) {
                    return message.warning({
                        content: WARNING.NOT_HAVE_CHANGE_TO_EDIT,
                        key: 'warning'
                    })
                }
                await editAddressService(id, values)
                message.success(MESSAGE.EDIT_ADDRESS_SUCCESS)
            } else {
                await newAddressService(values)
                message.success(MESSAGE.ADD_ADDRESS_SUCCESS)
            }
            navigate(PATH.profile.address)
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <>
            <Portal selector="#main-profile-title">
                Sổ địa chỉ
            </Portal>
            <Helmet>
                <title>Sổ địa chỉ</title>
            </Helmet>
            {/* Heading */}
            <h6 className="mb-7">
                {id ? 'Edit Address' : 'Add Address'}
            </h6>
            {/* Form */}
            <Spin spinning={dataLoading}>
                <AddressForm
                    onSubmit={onSubmit}
                    initialValue={address}
                    footer={
                        <div className="col-12">
                            <Form.Item name="default">
                                <Field
                                    renderField={(props) => <Checkbox
                                        checked={props.value}
                                        {...props}
                                        onChange={ev => {
                                            if (address?.default) {
                                                message.warning('Bạn không thể bỏ địa chỉ mặc định')
                                                return
                                            }
                                            props?.onChange(ev)
                                        }}
                                    >Default shipping address</Checkbox>}
                                />
                            </Form.Item>
                        </div>
                    }
                    action={
                        <Button loading={loading || editLoading}>
                            {id ? 'Edit Address' : 'Add Address'}
                        </Button>
                    }

                />
            </Spin>

        </>
    )
}
