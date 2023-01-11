import { cn } from '@/utils'
import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react'

const Context = createContext({})

export const Radio = ({ children, ...props }) => {
    const id = useId()
    const { selected, name, onChange, onClick } = useContext(Context)
    return (
        <div className='custom-control custom-radio '>
            <input
                onChange={(ev) => onChange(ev.target.value)}
                {...props}
            checked={props.value == selected} className="custom-control-input" type="radio" id={id} name={name} />
            <label onClick={() => onClick(props.value)} className="custom-control-label flex items-center" htmlFor={id}>
                {children}
            </label>
        </div>
    )
}


Radio.Toggle = ({ children, ...props }) => {
    const { selected, onChange, name } = useContext(Context)

    return (
        <label className={cn('btn btn-sm btn-outline-border', { active: props.value == selected })} >
            <input {...props}   onChange={(ev) => onChange(ev.target.value)} selected={props.value == selected} type="radio" name={name} /> {children}
        </label>
    )
}

Radio.Group = ({ children, value, toggle, onChange, onCheckedWhen2nd, name }) => {
    const _name = useId()
    const uncheckRef = useRef(false)

    const newOnChange = (value) => {
        if (!uncheckRef.current) {
            onChange?.(value)
        }

        uncheckRef.current = false
    }

    const onClick = (radioValue) => {
        if (onCheckedWhen2nd) {
            if (radioValue == value) {
                onCheckedWhen2nd?.()
                uncheckRef.current = true
            }
        }
    }

    return <div className={cn({ 'btn-group-toggle': toggle })}>
        <Context.Provider value={{ selected: value, name: name || _name, onChange: newOnChange, onClick }}>{children}</Context.Provider>
    </div>
}