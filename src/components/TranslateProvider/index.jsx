import { createContext, useContext, useEffect, useState } from 'react'


const Context = createContext({
    t: (keyword) => keyword,
    lang: 'en',
    setLang: (lang) => {}
})

export const TranslateProvider = ({ children, translate = {}, defaultLanguage = 'en' }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('lang') || defaultLanguage
    })

    useEffect(() => {
        localStorage.setItem('lang', lang)
    }, [lang])

    const t = (keyword) => translate?.[lang]?.[keyword] || keyword

    return (
        <Context.Provider value={{ t, setLang, lang }}>{children}</Context.Provider>
    )
}


export const useTranslate = () => useContext(Context)