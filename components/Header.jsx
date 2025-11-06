'use client'

import { Layout, Row, Col, Menu, Button, Drawer, Space, Typography } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useTranslations, useLocale } from '../hooks/useTranslations'
import { useRouter } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'

const { Header: AntHeader } = Layout
const { Text } = Typography

export default function Header({ onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const locale = useLocale()

  const t = useTranslations('nav')
  const tCommon = useTranslations('common')

  const menuItems = [
    { key: 'home', label: t('home') },
    { key: 'about', label: t('about') },
    { key: 'curriculum', label: t('curriculum') },
    { key: 'pricing', label: t('pricing') },
    { key: 'testimonials', label: t('testimonials') },
    { key: 'faq', label: t('faq') },
    { key: 'contact', label: t('contact') },
  ]

  const handleMenuClick = (e) => {
    if (e.key === 'home') {
      router.push('/')
      setMobileMenuOpen(false)
      return
    }

    if (e.key === 'contact') {
      onContactClick()
      setMobileMenuOpen(false)
      return
    }

    const element = document.getElementById(e.key)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <AntHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        padding: '0 16px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ width: '100%', maxWidth: 1400, margin: '0 auto' }}
      >
        {/* Logo */}
        <Col xs={18} sm={18} md={6}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 64 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                color: '#d9a451',
                lineHeight: 1.3,
                marginBottom: 2,
              }}
            >
              {tCommon('appName')}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#8892a0',
                lineHeight: 1.2,
              }}
            >
              {tCommon('tagline')}
            </Text>
          </div>
        </Col>

        {/* Desktop Menu */}
        <Col md={12} className="desktop-only" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          <Space size={4}>
            {menuItems.map((item) => (
              <Button
                key={item.key}
                type="text"
                onClick={() => handleMenuClick({ key: item.key })}
                style={{
                  color: '#e8eaed',
                  fontWeight: 500,
                  fontSize: 14,
                  height: 40,
                  padding: '0 12px',
                  position: 'relative',
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#d9a451'
                  e.currentTarget.style.background = 'rgba(217, 164, 81, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#e8eaed'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Space>
        </Col>

        {/* Desktop CTA Button & Language Switcher */}
        <Col md={6} className="desktop-only" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          <LanguageSwitcher style={{ width: 160 }} />
          <Button
            type="primary"
            size="large"
            onClick={onContactClick}
            style={{
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {tCommon('bookIntroCall')}
          </Button>
        </Col>

        {/* Mobile Menu Button */}
        <Col xs={6} className="mobile-only" style={{ textAlign: 'right' }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: '#d9a451' }} />}
            onClick={() => setMobileMenuOpen(true)}
          />
        </Col>
      </Row>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 64 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                color: '#d9a451',
                lineHeight: 1.3,
                marginBottom: 2,
              }}
            >
              {tCommon('appName')}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#8892a0',
                lineHeight: 1.2,
              }}
            >
              {tCommon('tagline')}
            </Text>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined style={{ color: '#ffffff' }} />}
        width={280}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Menu
            mode="vertical"
            items={menuItems}
            onClick={handleMenuClick}
            style={{ background: 'transparent', border: 'none' }}
          />
          <LanguageSwitcher style={{ width: '100%' }} />
          <Button
            type="primary"
            size="large"
            block
            onClick={() => {
              onContactClick()
              setMobileMenuOpen(false)
            }}
            style={{
              whiteSpace: 'normal',
              height: 'auto',
              minHeight: 56,
              padding: '12px 24px',
              textAlign: 'center',
            }}
          >
            {tCommon('bookIntroCall')}
          </Button>
        </Space>
      </Drawer>
    </AntHeader>
  )
}
