import { cn } from '@/utils'
import React, { useId } from 'react'
import { ErrorText, FieldStyle } from './ErrorText'

export const Field = ({ renderField, autoComplete = 'new-password', ...args }) => {
    const id = useId()
    const { label, required, error, type = 'text', ...props } = args

    const onChange = (ev) => {
        props?.onChange?.(ev)
    }

    return (
        <FieldStyle className={cn('form-group relative', { error })}>
            <label className={cn({ "sr-only": !label })} htmlFor={id}>
                {label} {required && '*'}
            </label>
            {
                renderField?.(args) || <input autoComplete={autoComplete} {...props} onChange={onChange} className={cn("form-control form-control-sm", props.className)} id={id} type={type} />
            }
            {error && <ErrorText>{error}</ErrorText>}
        </FieldStyle>
    )
}
