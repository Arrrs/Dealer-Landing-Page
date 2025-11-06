'use client'

import { ConfigProvider, Layout, Typography, Space, Divider } from 'antd'
import { useState } from 'react'
import themeConfig from '../../theme.config'
import { useTranslations } from '../../hooks/useTranslations'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactModal from '../../components/ContactModal'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header onContactClick={() => setContactModalOpen(true)} />

        <Content style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={1} style={{ marginBottom: 8 }}>{t('title')}</Title>
              <Text type="secondary">{t('lastUpdated')}</Text>
            </div>

            <Paragraph style={{ fontSize: 16 }}>
              {t('intro')}
            </Paragraph>

            <Divider />

            <div>
              <Title level={2}>{t('section1Title')}</Title>
              <Paragraph style={{ fontSize: 16 }}>
                {t('section1Content')}
              </Paragraph>
            </div>

            <div>
              <Title level={2}>{t('section2Title')}</Title>
              <Paragraph style={{ fontSize: 16 }}>
                {t('section2Content')}
              </Paragraph>
            </div>

            <div>
              <Title level={2}>{t('section3Title')}</Title>
              <Paragraph style={{ fontSize: 16 }}>
                {t('section3Content')}
              </Paragraph>
            </div>

            <div>
              <Title level={2}>{t('section4Title')}</Title>
              <Paragraph style={{ fontSize: 16 }}>
                {t('section4Content')}
              </Paragraph>
            </div>

            <div>
              <Title level={2}>{t('section5Title')}</Title>
              <Paragraph style={{ fontSize: 16 }}>
                {t('section5Content')}
              </Paragraph>
            </div>

            <div>
              <Title level={2}>{t('section6Title')}</Title>
              <Paragraph style={{ fontSize: 16 }}>
                {t('section6Content')}
              </Paragraph>
            </div>
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
