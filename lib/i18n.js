// Simple i18n without React context - works with static export
import { messages } from '../translations'

export function getLocale() {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('locale')
  return saved && ['en', 'cs', 'uk', 'ru'].includes(saved) ? saved : 'en'
}

export function setLocale(locale) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale)
    window.location.reload() // Reload to apply new language
  }
}

export function translate(key, locale) {
  const currentLocale = locale || getLocale()
  const keys = key.split('.')
  let value = messages[currentLocale]

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key
    }
  }

  return value || key
}
