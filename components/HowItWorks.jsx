'use client'

import { useTranslations } from '../hooks/useTranslations'
import { Row, Col, Card, Typography, Space, Tag, Alert, Image } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

export default function HowItWorks() {
  const t = useTranslations('howItWorks')

  const formats = [
    {
      title: t('format1Title'),
      summary: t('format1Desc'),
      timeline: t('format1Timeline'),
      tag: t('format1Tag'),
    },
    {
      title: t('format2Title'),
      summary: t('format2Desc'),
      timeline: t('format2Timeline'),
      tag: t('format2Tag'),
    },
    {
      title: t('format3Title'),
      summary: t('format3Desc'),
      timeline: t('format3Timeline'),
      tag: t('format3Tag'),
    },
  ]

  return (
    <Row
      justify="center"
      style={{
        padding: '60px 16px',
      }}
    >
      <Col xs={24} lg={20} xl={18}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Section Title */}
          <Title
            level={2}
            style={{
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            {t('title')}
          </Title>

          <Paragraph
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#c0c7d0',
              marginBottom: 32,
            }}
          >
            {t('subtitle')}
          </Paragraph>

          {/* Visual Banner */}
          <Card
            variant="borderless"
            style={{
              width: '100%',
              height: 200,
              background: 'linear-gradient(135deg, #0a0f16 0%, #1a2332 100%)',
              border: '1px solid #2a3444',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            styles={{
              body: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }
            }}
          >
            <Text style={{ color: '#6b7280', fontSize: 13, textAlign: 'center' }}>
              Image suggestion: Live dealer training session via video call or hands practicing card dealing
            </Text>
          </Card>

          {/* Format Cards */}
          <Row gutter={[24, 24]}>
            {formats.map((format, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  variant="borderless"
                  style={{ height: '100%' }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Tag */}
                    <Tag color="gold" style={{ alignSelf: 'flex-start' }}>
                      {format.tag}
                    </Tag>

                    {/* Title */}
                    <Title
                      level={4}
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {format.title}
                    </Title>

                    {/* Summary */}
                    <Paragraph
                      style={{
                        color: '#c0c7d0',
                        fontSize: 15,
                        lineHeight: 1.6,
                      }}
                    >
                      {format.summary}
                    </Paragraph>

                    {/* Timeline */}
                    <Space>
                      <ClockCircleOutlined style={{ color: '#d9a451' }} />
                      <Text style={{ color: '#8892a0', fontSize: 14 }}>
                        {format.timeline}
                      </Text>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Guarantee */}
          <Alert
            message={
              <Space>
                <CheckCircleOutlined style={{ fontSize: 18 }} />
                <Text strong style={{ fontSize: 16 }}>
                  {t('guaranteeTitle')}
                </Text>
              </Space>
            }
            description={t('guaranteeDesc')}
            type="success"
            showIcon={false}
            style={{
              marginTop: 32,
              borderRadius: 8,
            }}
          />
        </Space>
      </Col>
    </Row>
  )
}
