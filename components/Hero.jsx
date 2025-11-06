'use client'

import { Row, Col, Typography, Button, Space, Image } from 'antd'
import { useTranslations } from '../hooks/useTranslations'

const { Title, Text, Paragraph } = Typography

export default function Hero({ onJoinWaitlist }) {
  const t = useTranslations('hero')
  const handleViewCurriculum = () => {
    const element = document.getElementById('curriculum')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: '90vh',
        padding: '60px 16px',
      }}
    >
      <Col xs={24} lg={20} xl={18}>
        <Row gutter={[32, 32]} align="middle">
          {/* Left Column - Text Content */}
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Main Headline */}
              <Title
                level={1}
                style={{
                  fontSize: 'clamp(28px, 6vw, 48px)',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  margin: 0,
                  color: '#ffffff',
                }}
              >
                {t('title')}
              </Title>

              {/* Subheading */}
              <Paragraph
                style={{
                  fontSize: 'clamp(15px, 3vw, 18px)',
                  lineHeight: 1.6,
                  color: '#c0c7d0',
                  margin: 0,
                }}
              >
                {t('subtitle')}
              </Paragraph>

              {/* Trust Line */}
              <Text
                style={{
                  fontSize: 14,
                  color: '#d9a451',
                  fontWeight: 600,
                }}
              >
                {t('trustLine')}
              </Text>

              {/* CTAs */}
              <Space size="middle" wrap style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={onJoinWaitlist}
                  style={{ height: 56, fontSize: 16, paddingLeft: 40, paddingRight: 40 }}
                >
                  {t('cta')}
                </Button>
                <Button
                  size="large"
                  onClick={handleViewCurriculum}
                  style={{ height: 56, fontSize: 16, paddingLeft: 40, paddingRight: 40 }}
                >
                  {t('ctaSecondary')}
                </Button>
              </Space>

              {/* Microcopy under CTA */}
              <Text
                style={{
                  fontSize: 13,
                  color: '#8892a0',
                  fontStyle: 'italic',
                  display: 'block',
                }}
              >
                {t('microcopy')}
              </Text>
            </Space>
          </Col>

          {/* Right Column - Hero Image */}
          <Col xs={24} md={12}>
            <Image
              src="/images/1.png"
              alt={t('imageAlt')}
              preview={false}
              style={{
                width: '100%',
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(217, 164, 81, 0.15)',
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
