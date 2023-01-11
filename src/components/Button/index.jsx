import { cn } from '@/utils'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const Button = ({ type = 'default', size = 'sm', loading, children, ...props }) => {

    return (
        <button {...props} className={cn("btn flex gap-2 items-center", `btn-${size}`, props.className, {
            'disabled pointer-events-none': loading,
            'btn-dark': type === 'default',
            'btn-outline-dark': type === 'outline',
        })} >
            {loading && <LoadingOutlined />}
            {children}
        </button>
    )
}
