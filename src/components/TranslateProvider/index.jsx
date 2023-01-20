import { createContext, useContext, useEffect, useState } from 'react'


export const TranslateContext = createContext({
    t: (keyword) => keyword,
    lang: 'en',
    setLang: (lang) => {}
})

const _global = {}


export const t = (...params) => _global?.t?.(...params)

export const TranslateProvider = ({ children, translate = {}, defaultLanguage = 'en' }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('lang') || defaultLanguage
    })

    const t = (keyword) => translate?.[lang]?.[keyword] || keyword

    useEffect(() => {
        _global.t = t
    }, [t])

    useEffect(() => {
        localStorage.setItem('lang', lang)
    }, [lang])


    return (
        <TranslateContext.Provider value={{ t, setLang, lang }}>{children}</TranslateContext.Provider>
    )
}


export const useTranslate = () => useContext(TranslateContext)