import { useForm } from '@/hooks/useForm'
import { cn } from '@/utils'
import React, { createContext, forwardRef, useContext, useEffect, useImperativeHandle } from 'react'

const Context = createContext({})

export const Form = forwardRef(({ className, children, onSubmit, form = { initialValue: undefined, rules: undefined, dependencies: {} } }, outerRef) => {

    useEffect(() => {
        if (form.initialValue) {
            _form.setValues(form.initialValue)
        }
    }, [form.initialValue])
    const _form = useForm(form.rules, form)


    useImperativeHandle(outerRef, () => {
        return _form
    }, [_form])

    const _onSubmit = (ev) => {
        ev.preventDefault()
        if (_form.validate()) {
            onSubmit?.(_form.values, _form)
        }
    }

    return (
        <Context.Provider value={{ ..._form }}>
            <form onSubmit={_onSubmit} className={cn(className)}>{children}</form>
        </Context.Provider>
    )
})

Form.Item = ({ name, children }) => {
    const { register } = useContext(Context)
    const props = register(name)
    return typeof children === 'function' ? children?.(props) : React.cloneElement(children, props)
}