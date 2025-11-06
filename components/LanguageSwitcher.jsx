'use client'

import { Select } from 'antd'
import { useLocale } from '../hooks/useTranslations'
import { setLocale } from '../lib/i18n'
import { languages } from '../translations'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher({ style, showText = false }) {
  const locale = useLocale()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Select
      value={locale}
      onChange={setLocale}
      style={{ width: isMobile || showText ? 180 : 65, ...style }}
      options={languages.map(lang => ({
        value: lang.code,
        label: isMobile || showText ? `${lang.flag} ${lang.name}` : lang.flag
      }))}
    />
  )
}
