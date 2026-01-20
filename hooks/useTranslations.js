'use client'

import { useState, useEffect } from 'react'
import { getLocale, translate, subscribeLocale } from '../lib/i18n'

export function useTranslations(namespace) {
  const [locale, setLocaleState] = useState('en')

  useEffect(() => {
    setLocaleState(getLocale())
    return subscribeLocale(setLocaleState)
  }, [])

  return (key) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    return translate(fullKey, locale)
  }
}

export function useLocale() {
  const [locale, setLocaleState] = useState('en')

  useEffect(() => {
    setLocaleState(getLocale())
    return subscribeLocale(setLocaleState)
  }, [])

  return locale
}
