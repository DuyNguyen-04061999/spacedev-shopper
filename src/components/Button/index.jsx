import { cn } from '@/utils'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const Button = ({ type = 'default', link, loading, children, ...props }) => {
    const navigate = useNavigate()

    return (
        <button onClick={() => link && navigate(link)} className={cn("btn btn-sm flex gap-2 items-center", props.className, {
            'disabled pointer-events-none': loading,
            'btn-dark': type === 'default',
            'btn-outline-dark': type === 'outline',
        })} {...props}>
            {loading && <LoadingOutlined />}
            {children}
        </button>
    )
}
