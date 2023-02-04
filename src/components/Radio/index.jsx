import { cn } from '@/utils'
import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react'

const Context = createContext({})

export const Radio = ({ children, ...props }) => {
    const id = useId()
    const { value, name, onChange } = useContext(Context)
    return (
        <div className='custom-control custom-radio ' onClick={(ev) => onChange(props.value)}>
            <input checked={props.value == value} className="custom-control-input" type="radio" />
            <label className="custom-control-label flex items-center" >
                {children}
            </label>
        </div>
    )
}


Radio.Toggle = ({ children, ...props }) => {
    const { selected, onChange, name } = useContext(Context)

    return (
        <label className={cn('btn btn-sm btn-outline-border', { active: props.value == selected })} >
            <input {...props} onChange={(ev) => onChange(ev.target.value)} selected={props.value == selected} type="radio" name={name} /> {children}
        </label>
    )
}

Radio.Group = ({ children, defaultValue, toggle, onChange, name }) => {
    const _name = useId()
    const [_value, setValue] = useState(defaultValue)
    // const uncheckRef = useRef(false)
    const _onChange = (value) => {
        if (toggle && value === _value) {
            setValue()
            onChange?.()
            return
        }
        setValue(value)
        onChange?.(value)
        // if (!uncheckRef.current) {
        //     onChange?.(value)
        // }

        // uncheckRef.current = false
    }

    // const onClick = (radioValue) => {
    //     if (onCheckedWhen2nd) {
    //         if (radioValue == value) {
    //             onCheckedWhen2nd?.()
    //             uncheckRef.current = true
    //         }
    //     }
    // }

    return <div className={cn({ 'btn-group-toggle': toggle })}>
        <Context.Provider value={{ value: _value, name: name || _name, onChange: _onChange }}>{children}</Context.Provider>
    </div>
}