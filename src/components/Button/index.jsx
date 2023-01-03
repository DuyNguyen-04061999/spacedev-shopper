import { cn } from '@/utils'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const Button = ({ loading, children, ...props }) => {
    return (
        <button className={cn("btn btn-sm btn-dark flex gap-2 items-center", props.className, { 'disabled pointer-events-none': loading })} {...props}>
            {loading && <LoadingOutlined />}
            {children}
        </button>
    )
}
