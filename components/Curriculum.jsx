'use client'

import { Row, Col, Typography, Space, Card, Tag } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useTranslations } from '../hooks/useTranslations'

const { Title, Text, Paragraph } = Typography

export default function Curriculum() {
  const t = useTranslations('curriculum')

  const modules = [
    {
      title: t('module1Title'),
      hours: '3–4 hrs',
      copy: t('module1Copy'),
      outcomes: t('module1Outcomes'),
    },
    {
      title: t('module2Title'),
      hours: '6 hrs',
      copy: t('module2Copy'),
      outcomes: t('module2Outcomes'),
    },
    {
      title: t('module3Title'),
      hours: '4 hrs',
      copy: t('module3Copy'),
      outcomes: t('module3Outcomes'),
    },
    {
      title: t('module4Title'),
      hours: '6 hrs',
      copy: t('module4Copy'),
      outcomes: t('module4Outcomes'),
    },
    {
      title: t('module5Title'),
      hours: '4 hrs',
      copy: t('module5Copy'),
      outcomes: t('module5Outcomes'),
    },
    {
      title: t('module6Title'),
      hours: '2–3 hrs',
      copy: t('module6Copy'),
      outcomes: t('module6Outcomes'),
    },
    {
      title: t('module7Title'),
      hours: 'Flexible',
      copy: t('module7Copy'),
      outcomes: t('module7Outcomes'),
    },
  ]

  return (
    <Row
      id="curriculum"
      justify="center"
      style={{
        padding: '60px 16px',
        background: '#0a0f16',
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

          {/* Module Cards */}
          <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
            {modules.map((module, index) => (
              <Col xs={24} md={12} lg={12} key={index}>
                <Card
                  variant="borderless"
                  style={{
                    height: '100%',
                    background: index === modules.length - 1
                      ? 'linear-gradient(135deg, #1a2332 0%, #141b28 100%)'
                      : '#1a2332',
                    border: '1px solid #2a3444',
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Module Number & Hours */}
                    <Space style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <Tag
                        color="gold"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: 6,
                        }}
                      >
                        {index === modules.length - 1 ? 'Optional' : `Module ${index + 1}`}
                      </Tag>
                      <Space size="small">
                        <ClockCircleOutlined style={{ color: '#d9a451', fontSize: 14 }} />
                        <Text style={{ color: '#d9a451', fontWeight: 500, fontSize: 13 }}>
                          {module.hours}
                        </Text>
                      </Space>
                    </Space>

                    {/* Module Title */}
                    <Title
                      level={4}
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        margin: 0,
                        fontSize: 18,
                      }}
                    >
                      {module.title}
                    </Title>

                    {/* Description */}
                    <Paragraph
                      style={{
                        color: '#c0c7d0',
                        fontSize: 14,
                        marginBottom: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {module.copy}
                    </Paragraph>

                    {/* Outcomes */}
                    <Space direction="vertical" size={4} style={{ width: '100%', marginTop: 8 }}>
                      <Space size="small">
                        <CheckCircleOutlined style={{ color: '#d9a451', fontSize: 14 }} />
                        <Text strong style={{ color: '#d9a451', fontSize: 13 }}>
                          {t('outcomesLabel')}
                        </Text>
                      </Space>
                      <Paragraph style={{ color: '#8892a0', fontSize: 13, marginLeft: 22, marginBottom: 0 }}>
                        {module.outcomes}
                      </Paragraph>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </Col>
    </Row>
  )
}
