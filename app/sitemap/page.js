'use client'

import { ConfigProvider, Layout, Typography, Space, Card, Row, Col } from 'antd'
import { useState } from 'react'
import Link from 'next/link'
import themeConfig from '../../theme.config'
import { useTranslations, useLocale } from '../../hooks/useTranslations'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'
import { languages } from '../../translations'

const { Content } = Layout
const { Title, Text } = Typography

export default function SitemapPage() {
  const t = useTranslations('sitemap')
  const locale = useLocale()
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const mainPages = [
    { key: 'home', href: `/` },
    { key: 'curriculum', href: `/#curriculum` },
    { key: 'pricing', href: `/#pricing` },
    { key: 'testimonials', href: `/#testimonials` },
    { key: 'faq', href: `/#faq` },
    { key: 'contact', href: `/contact` },
  ]

  const legalPages = [
    { key: 'privacy', href: `/privacy` },
    { key: 'terms', href: `/terms` },
  ]

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header onContactClick={() => setContactModalOpen(true)} />

        <Content style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={1}>{t('title')}</Title>
              <Text style={{ fontSize: 18, color: '#8892a0' }}>
                {t('subtitle')}
              </Text>
            </div>

            <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
              {/* Main Pages */}
              <Col xs={24} md={12}>
                <Card
                  style={{
                    background: 'linear-gradient(135deg, #1a1f2e 0%, #2a3447 100%)',
                    border: '1px solid #3d4758',
                    height: '100%',
                  }}
                >
                  <Title level={3} style={{ color: '#d9a451', marginBottom: 24 }}>
                    {t('mainPages')}
                  </Title>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {mainPages.map((page) => (
                      <Link
                        key={page.key}
                        href={page.href}
                        style={{
                          fontSize: 16,
                          color: '#e8eaed',
                          display: 'block',
                          padding: '8px 0',
                          transition: 'color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#d9a451')}
                        onMouseLeave={(e) => (e.target.style.color = '#e8eaed')}
                      >
                        → {t(page.key)}
                      </Link>
                    ))}
                  </Space>
                </Card>
              </Col>

              {/* Legal Pages */}
              <Col xs={24} md={12}>
                <Card
                  style={{
                    background: 'linear-gradient(135deg, #1a1f2e 0%, #2a3447 100%)',
                    border: '1px solid #3d4758',
                    height: '100%',
                  }}
                >
                  <Title level={3} style={{ color: '#d9a451', marginBottom: 24 }}>
                    {t('legal')}
                  </Title>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {legalPages.map((page) => (
                      <Link
                        key={page.key}
                        href={page.href}
                        style={{
                          fontSize: 16,
                          color: '#e8eaed',
                          display: 'block',
                          padding: '8px 0',
                          transition: 'color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#d9a451')}
                        onMouseLeave={(e) => (e.target.style.color = '#e8eaed')}
                      >
                        → {t(page.key)}
                      </Link>
                    ))}
                  </Space>
                </Card>
              </Col>

              {/* Available Languages */}
              <Col xs={24}>
                <Card
                  style={{
                    background: '#f8f9fa',
                    border: '1px solid #e1e4e8',
                  }}
                >
                  <Title level={3} style={{ marginBottom: 24 }}>
                    {t('languages')}
                  </Title>
                  <Row gutter={[16, 16]}>
                    {languages.map((lang) => (
                      <Col xs={12} sm={6} key={lang.code}>
                        <div
                          style={{
                            fontSize: 16,
                            color: '#1a1f2e',
                            padding: '12px',
                            background: locale === lang.code ? '#d9a451' : 'white',
                            color: locale === lang.code ? 'white' : '#1a1f2e',
                            borderRadius: 8,
                            border: '1px solid #e1e4e8',
                            textAlign: 'center',
                          }}
                        >
                          {lang.flag} {lang.name}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Space>
        </Content>

        <Footer />

        <ContactModal
          open={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
      </Layout>
    </ConfigProvider>
  )
}
