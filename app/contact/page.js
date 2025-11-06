'use client'

import { ConfigProvider, Layout, Typography, Space, Card, Button } from 'antd'
import { ClockCircleOutlined, GlobalOutlined } from '@ant-design/icons'
import { useState } from 'react'
import themeConfig from '../../theme.config'
import { useTranslations } from '../../hooks/useTranslations'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

export default function ContactPage() {
  const t = useTranslations('contact')
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header onContactClick={() => setContactModalOpen(true)} />

        <Content style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={1}>{t('title')}</Title>
              <Paragraph style={{ fontSize: 18, color: '#8892a0' }}>
                {t('subtitle')}
              </Paragraph>
            </div>

            <Paragraph style={{ fontSize: 16, textAlign: 'center' }}>
              {t('intro')}
            </Paragraph>

            {/* Contact Form Card */}
            <Card
              style={{
                marginTop: 24,
                background: 'linear-gradient(135deg, #1a1f2e 0%, #2a3447 100%)',
                border: '1px solid #3d4758',
              }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Title level={3} style={{ color: '#d9a451', marginBottom: 8 }}>
                    {t('formTitle')}
                  </Title>
                  <Text style={{ color: '#b0b8c4' }}>{t('formDescription')}</Text>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => setContactModalOpen(true)}
                  style={{ marginTop: 16 }}
                >
                  {t('formTitle')}
                </Button>
              </Space>
            </Card>

            {/* Alternative Contact Methods */}
            <Card
              style={{
                marginTop: 24,
                background: '#f8f9fa',
                border: '1px solid #e1e4e8',
              }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Title level={3} style={{ marginBottom: 16 }}>
                  {t('alternativeTitle')}
                </Title>

                <Space direction="vertical" size="small">
                  <Space>
                    <ClockCircleOutlined style={{ fontSize: 20, color: '#d9a451' }} />
                    <Text style={{ fontSize: 16 }}>{t('responseTime')}</Text>
                  </Space>

                  <Space>
                    <GlobalOutlined style={{ fontSize: 20, color: '#d9a451' }} />
                    <Text style={{ fontSize: 16 }}>{t('timezoneNote')}</Text>
                  </Space>
                </Space>
              </Space>
            </Card>
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
