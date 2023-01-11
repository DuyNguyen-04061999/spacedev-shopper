import { cn } from '@/utils'
import React from 'react'
import { SelectStyle } from './style'



export const Select = (props) => {
    return (
        <SelectStyle className={cn('custom-select', { 'error border border-solid !border-[red] text-[red]': props.error })}  {...props} onChange={ev => props.onChange?.(ev.target.value)}>
            {props.children}
        </SelectStyle>
    )
}
