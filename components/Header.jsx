'use client'

import { Layout, Row, Col, Menu, Button, Drawer, Space, Typography } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Header: AntHeader } = Layout
const { Text } = Typography

export default function Header({ onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { key: 'about', label: 'About' },
    { key: 'curriculum', label: 'Curriculum' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: 'Contact' },
  ]

  const handleMenuClick = (e) => {
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
        zIndex: 100,
        width: '100%',
        padding: '0 16px',
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
          <Space direction="vertical" size={0}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                color: '#d9a451',
                lineHeight: 1.2,
              }}
            >
              LearnToDeal
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: '#8892a0',
                display: 'block',
                lineHeight: 1.2,
              }}
            >
              Live & online dealer training
            </Text>
          </Space>
        </Col>

        {/* Desktop Menu */}
        <Col md={14} className="desktop-only" style={{ display: 'flex', justifyContent: 'center' }}>
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              background: 'transparent',
              border: 'none',
              flex: 1,
              justifyContent: 'center',
            }}
          />
        </Col>

        {/* Desktop CTA Button */}
        <Col md={4} className="desktop-only" style={{ textAlign: 'right' }}>
          <Button type="primary" size="large" onClick={onContactClick}>
            Book Intro Call
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              color: '#d9a451',
            }}
          >
            LearnToDeal
          </Text>
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
          <Button
            type="primary"
            size="large"
            block
            onClick={() => {
              onContactClick()
              setMobileMenuOpen(false)
            }}
          >
            Book Intro Call
          </Button>
        </Space>
      </Drawer>
    </AntHeader>
  )
}
