import { Popconfirm as PopconfirmM } from 'antd'
import { useState } from 'react'
import { Button } from '../Button'
export const Popconfirm = ({ children, ...props }) => {
    const [open, setOpen] = useState(false)

    const onCancel = () => {
        setOpen(false)
        props.onCancel?.()
    }

    const _onConfirm = (ev) => {
        setOpen(false)
        props.onConfirm?.(ev)
    }

    return (
        <PopconfirmM
            open={open}
            onOpenChange={(open) => setOpen(open)}
            {...props}
            showCancel={false}
            okButtonProps={{ hidden: true }}
            description={<>
                {props.description}
                <div className="flex gap-2 justify-end">
                    <Button size='xs' onClick={onCancel} type='outline' {...props.cancelButtonProps}>{props.cancelText || 'Cancel'}</Button>
                    <Button size='xs' onClick={_onConfirm} {...props.okButtonProps}>{props.okText || 'Ok'}</Button>
                </div>
            </>}
        >
            {children}

        </PopconfirmM>
    )
}
