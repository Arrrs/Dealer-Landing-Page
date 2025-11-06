'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  isLoaded: false
})

export function LanguageProvider({ children, messages }) {
  const [locale, setLocaleState] = useState('en')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load locale from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale')
      if (savedLocale && ['en', 'cs', 'uk', 'ru'].includes(savedLocale)) {
        setLocaleState(savedLocale)
      }
      setIsLoaded(true)
    }
  }, [])

  // Save locale to localStorage when it changes (client-side only)
  const setLocale = (newLocale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
    setLocaleState(newLocale)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = messages[locale]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
