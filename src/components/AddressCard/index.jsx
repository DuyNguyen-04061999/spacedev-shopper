import { MESSAGE } from '@/config/message'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import {  message } from 'antd'
import { Popconfirm } from '../Popconfirm'
import { Link, generatePath } from 'react-router-dom'
import { PATH } from '@/config/path'
import { Button } from '../Button'
import { useRef } from 'react'
import { withListLoading } from '@/utils/withListLoading'
import Skeleton from '../Skeleton'

export const AddressCard = ({ onDelete, onChangeDefault, _id, default: addressDefault, fullName, district, province, address, email, phone }) => {
    const loadingDefaultRef = useRef(false)
    const loadingDeleteRef = useRef(false)
    const _onChangeDefault = async (ev) => {
        if (loadingDefaultRef.current) return


        loadingDefaultRef.current = true
        try {
            const key = `address-default-${_id}`
            message.loading({
                key,
                content: MESSAGE.LOADING_MESSAGE
            })
            await userService.editAddress(_id, { default: true })
            onChangeDefault?.(_id)
            message.success({
                key,
                content: MESSAGE.CHANGE_ADDRESS_DEFAULT_SUCCESS,
            })
        } catch (err) {
            handleError(err, key)
        }
        loadingDefaultRef.current = false
    }

    const _onDelete = async (ev) => {
        if (loadingDeleteRef.current) return

        loadingDeleteRef.current = true
        try {
            const key = `remove-address-${_id}`
            message.loading({
                key,
                content: MESSAGE.LOADING_MESSAGE
            })
            await userService.deleteAddress(_id)
            onDelete?.(_id)
            message.success({
                key,
                content: MESSAGE.DELETE_ADDRESS_SUCCESS,
            })
        } catch (err) {
            handleError(err)
        }
        loadingDeleteRef.current = false

    }

    return (
        <div className="address-card card card-lg bg-light mb-8">
            <div className="card-body">
                {/* Text */}
                <p className="font-size-sm mb-0 leading-[35px]">
                    <a className="text-body text-xl font-bold " href="./product.html">{fullName}</a> <br />
                    <b>S??? ??i???n tho???i:</b> {phone} <br />
                    <b>Email:</b>{email}<br />
                    <b>Qu???n / Huy???n:</b> {district} <br />
                    <b>T???nh / th??nh ph???:</b> {province} <br />
                    <b>?????a ch???:</b> {address}
                </p>

                {
                    addressDefault ? (
                        <div className='card-action-right-bottom select-none'>
                            <div className="link color-success">?????a ch??? m???c ?????nh</div>
                        </div>
                    ) : (
                        <div className='card-action-right-bottom hidden'>
                            <Button size="xs" type="outline" onClick={_onChangeDefault}>
                                ?????t l??m ?????a ch??? m???c ?????nh
                            </Button>
                        </div>
                    )
                }

                {/* Action */}
                <div className="card-action card-action-right gap-2 flex">
                    {/* Button */}
                    <Link className="btn btn-xs btn-circle btn-white-primary" to={generatePath(PATH.profile.editAddress, { id: _id })}>
                        <i className="fe fe-edit-2" />
                    </Link>
                    {
                        !addressDefault && (
                            <Popconfirm
                                placement='topRight'
                                title="C???nh b??o"
                                cancelText="H???y b???"
                                okText="Ti???p t???c x??a"
                                onConfirm={_onDelete}
                                description={<p>Thao t??c n??y s??? kh??ng th??? ho??n l???i, b???n c?? ch???c ch???n mu???n th???c hi???n thao t??c n??y?</p>}>
                                <button className="btn btn-xs btn-circle btn-white-primary">
                                    <i className="fe fe-x"></i>
                                </button>
                            </Popconfirm>
                        )
                    }

                </div>
            </div>
        </div>
    )
}


export const AddressCardLoading = () => {
    return (
        <div className="address-card card card-lg bg-light mb-8" style={{ height: 274 }}>
            <div className="card-body h-full">
                {/* Heading */}
                <p className="font-size-sm mb-0 flex gap-5 flex-col h-full">
                    <Skeleton height={20} width="65%"/>
                    <Skeleton height={20} width="40%"/>
                    <Skeleton height={20} width="54%"/>
                    <Skeleton height={20} width="35%"/>
                    <Skeleton height={20} width="35%"/>
                    <Skeleton height={20} width="20%"/>
                </p>


            </div>
        </div>
    )
}

export const ListAddressCard = withListLoading(AddressCard, AddressCardLoading)