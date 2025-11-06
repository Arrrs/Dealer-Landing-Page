'use client'

import { Row, Col, Card, Typography, Space } from 'antd'
import { useTranslations } from '../hooks/useTranslations'
import {
  TrophyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  RocketOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

export default function FeatureTiles() {
  const t = useTranslations('features')

  const features = [
    {
      icon: <TrophyOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: <TeamOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
    {
      icon: <RocketOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
      title: t('feature4Title'),
      description: t('feature4Desc'),
    },
  ]

  return (
    <Row
      id="about"
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
              marginBottom: 48,
            }}
          >
            {t('title')}
          </Title>

          {/* Feature Cards */}
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  variant="borderless"
                  style={{
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Icon */}
                    {feature.icon}

                    {/* Title */}
                    <Title
                      level={4}
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {feature.title}
                    </Title>

                    {/* Description */}
                    <Paragraph
                      style={{
                        color: '#c0c7d0',
                        fontSize: 15,
                        marginBottom: 8,
                      }}
                    >
                      {feature.description}
                    </Paragraph>
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
