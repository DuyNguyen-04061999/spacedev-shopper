

// options = [
//     {label: 'Tiếng Việt', value: 'vi'}
// ]

import { useState } from "react"

export const Dropdown = ({
    options = [],
    onChange
}) => {
    const [label, setLabel] = useState(options?.[0]?.label)
    const onClick = (option) => () => {
        setLabel(option.label)
        onChange?.(options.value)
    }

    return (
        <div className="nav-item dropdown">
            {/* Toggle */}
            <a className="nav-link dropdown-toggle" href="#">{label}</a>
            {/* Menu */}
            <div className="dropdown-menu minw-0">
                {options.map(e => <a key={e.value} onClick={onClick(e)} className="dropdown-item" href="#">{e.label}</a>)}
            </div>
        </div>
    )
}
