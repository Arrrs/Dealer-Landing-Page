'use client'

import { Row, Col, Card, Typography, Button, Space, List, Badge } from 'antd'
import { CheckOutlined, StarFilled } from '@ant-design/icons'
import { useTranslations } from '../hooks/useTranslations'

const { Title, Text, Paragraph } = Typography

export default function Pricing({ onContactClick }) {
  const t = useTranslations('pricing')

  const packages = [
    {
      name: t('plan1Title'),
      price: t('plan1Price'),
      features: [
        t('plan1Feature1'),
        t('plan1Feature2'),
        t('plan1Feature3'),
        t('plan1Feature4'),
      ],
      popular: false,
    },
    {
      name: t('plan2Title'),
      price: t('plan2Price'),
      features: [
        t('plan2Feature1'),
        t('plan2Feature2'),
        t('plan2Feature3'),
        t('plan2Feature4'),
      ],
      popular: true,
    },
    {
      name: t('plan3Title'),
      price: t('plan3Price'),
      features: [
        t('plan3Feature1'),
        t('plan3Feature2'),
        t('plan3Feature3'),
        t('plan3Feature4'),
      ],
      popular: false,
    },
  ]
  return (
    <Row
      id="pricing"
      justify="center"
      style={{
        padding: '60px 16px',
        background: 'radial-gradient(circle at top right, rgba(217, 164, 81, 0.02) 0%, transparent 30%), radial-gradient(circle at bottom left, rgba(217, 164, 81, 0.02) 0%, transparent 30%)',
      }}
    >
      <Col xs={24} lg={22} xl={20}>
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

          {/* Pricing Cards */}
          <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
            {packages.map((pkg, index) => (
              <Col xs={24} md={8} key={index}>
                <Badge.Ribbon
                  text={
                    <Space size="small">
                      <StarFilled />
                      <Text>{t('mostPopular')}</Text>
                    </Space>
                  }
                  color="gold"
                  style={{ display: pkg.popular ? 'block' : 'none' }}
                >
                  <Card
                    variant="borderless"
                    style={{
                      height: '100%',
                      border: pkg.popular ? '2px solid #d9a451' : 'none',
                    }}
                  >
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      {/* Package Name */}
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Title
                          level={3}
                          style={{
                            color: '#d9a451',
                            fontWeight: 700,
                            margin: 0,
                            textAlign: 'center',
                          }}
                        >
                          {pkg.name}
                        </Title>
                      </Space>

                      {/* Price */}
                      <Title
                        level={2}
                        style={{
                          color: '#ffffff',
                          fontWeight: 700,
                          margin: '16px 0',
                          textAlign: 'center',
                        }}
                      >
                        {pkg.price}
                      </Title>

                      {/* Features List */}
                      <List
                        dataSource={pkg.features}
                        renderItem={(item) => (
                          <List.Item
                            style={{
                              border: 'none',
                              padding: '8px 0',
                            }}
                          >
                            <Space size="small">
                              <CheckOutlined style={{ color: '#d9a451', fontSize: 16 }} />
                              <Text style={{ color: '#c0c7d0', fontSize: 14 }}>
                                {item}
                              </Text>
                            </Space>
                          </List.Item>
                        )}
                        style={{ marginTop: 16 }}
                      />

                      {/* CTA Button */}
                      <Button
                        type={pkg.popular ? 'primary' : 'default'}
                        size="large"
                        block
                        onClick={onContactClick}
                        style={{ marginTop: 16 }}
                      >
                        {t('cta')}
                      </Button>
                    </Space>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))}
          </Row>

          {/* Pricing Microcopy */}
          <Text
            style={{
              fontSize: 13,
              color: '#8892a0',
              fontStyle: 'italic',
              display: 'block',
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            {t('note')}
          </Text>
        </Space>
      </Col>
    </Row>
  )
}
