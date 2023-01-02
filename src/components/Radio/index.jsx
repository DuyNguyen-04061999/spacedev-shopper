import React, { createContext, useContext, useEffect, useId, useState } from 'react'

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


Radio.Group = ({ children, value, onChange, uncheckedWhen2nd }) => {
    const name = useId()

    const onClick = (radioValue) => {
        if (uncheckedWhen2nd) {
            if (radioValue == value) {
                onChange?.(undefined, 'uncheckedWhen2nd')
            }
        }
    }

    return <Context.Provider value={{ selected: value, name, onChange, onClick }}>{children}</Context.Provider>
}