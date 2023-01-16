import { useAddress } from '@/hooks/useAddress'
import { cn } from '@/utils'
import React from 'react'
import { Drawer } from '../Drawer'
import { Button } from '../Button'
import { PATH } from '@/config/path'

export const AddressDrawer = ({ open, onSelect, onClose, selectId }) => {
    const { address, loading } = useAddress()

    const _onSelect = (address) => () => {
        onSelect?.(address)
        onClose()
    }
    return (
        <Drawer title="Select your address" open={open} onClose={onClose} >
            <>
                {
                    address.length > 0 && <>
                        <ul className="list-group list-group-lg list-group-flush">
                            {
                                address?.map(e => (
                                    <li key={e._id}
                                        className={cn("list-group-item relative leading-[35px] hover:bg-[#eefff3]",
                                            {
                                                'bg-[#eefff3]': e._id === selectId,
                                                'cursor-pointer': e._id !== selectId
                                            })}
                                        onClick={_onSelect(e)}
                                    >
                                        {/* Title */}
                                        <p className="font-size-sm ">
                                            <a className="text-body text-xl font-bold " href="./product.html">{e.fullName}</a> <br />
                                            <b>Số điện thoại:</b> {e.phone} <br />
                                            <b>Email:</b>{e.email}<br />
                                            <b>Quận / Huyện:</b> {e.district} <br />
                                            <b>Tỉnh / thành phố:</b> {e.province} <br />
                                            <b>Địa chỉ:</b> {e.address} <br />
                                        </p>
                                        {/* Remove */}
                                        {
                                            e.default && (
                                                <a className="font-size-xs text-green-500 hover:text-green-500 ml-auto absolute top-10 right-10" href="#!">
                                                    Địa chỉ mặc định
                                                </a>
                                            )
                                        }
                                        <a className="font-size-xs text-gray-400 hover:text-green-500 ml-auto absolute top-16 right-10" href="#!">
                                            Chỉnh sửa
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        {/* Buttons */}
                        <div className="modal-body mt-auto">
                            <Button type="outline" link={PATH.profile.newAddress}>Thêm mới</Button>
                        </div>
                    </>
                }

                {
                    !loading && address?.length === 0 && (
                        <div className="modal-body">
                            <h6 className="mb-7 text-center">Hiện tại bạn chưa lưu địa chỉ nào 😞</h6>
                            <a className="btn btn-block btn-outline-dark" href="#!">
                                Thêm mới
                            </a>
                        </div>
                    )
                }
            </>
        </Drawer >
    )
}
