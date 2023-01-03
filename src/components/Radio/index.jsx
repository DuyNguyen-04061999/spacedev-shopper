import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react'

const Context = createContext({})

export const Radio = ({ children, ...props }) => {
    const id = useId()
    const { selected, name, onChange, onClick } = useContext(Context)
    return (
        <>
            <input
                onChange={onChange}
                {...props}
                checked={props.value == selected} className="custom-control-input" type="radio" id={id} name={name} />
            <label onClick={() => onClick(props.value)} className="custom-control-label flex items-center" htmlFor={id}>
                {children}
            </label>
        </>
    )
}


Radio.Group = ({ children, value, onChange, onCheckedWhen2nd }) => {
    const name = useId()
    const uncheckRef = useRef(false)

    const newOnChange = (ev) => {
        if(!uncheckRef.current) {
            onChange?.(ev)
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

    return <Context.Provider value={{ selected: value, name, onChange: newOnChange, onClick }}>{children}</Context.Provider>
}