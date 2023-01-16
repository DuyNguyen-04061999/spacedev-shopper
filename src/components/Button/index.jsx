import { cn } from '@/utils'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Button = ({link, type = 'default', size = 'sm', loading, children, ...props }) => {
    let Com = 'button'
    if(link) {
        Com = Link
    }


    return (
        <Com to={link} {...props} className={cn("btn flex justify-center gap-2 items-center ", `btn-${size}`, props.className, {
            'disabled pointer-events-none': loading,
            'btn-dark': type === 'default',
            'btn-outline-dark': type === 'outline',
        })} >
            {loading && <LoadingOutlined />}
            {children}
        </Com>
    )
}
