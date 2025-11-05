'use client'

import { Row, Col, Card, Typography, Button, Space, List, Badge } from 'antd'
import { CheckOutlined, StarFilled } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const packages = [
  {
    name: 'Starter',
    subtitle: 'Group',
    price: 'From $199',
    description: 'Group cohorts, weekly sessions, community support, mentor checks.',
    features: [
      'Group cohort (8-12 students)',
      'Weekly live sessions',
      'Community support',
      'Mentor check-ins',
      'Course materials',
    ],
    cta: 'Join Starter',
    popular: false,
  },
  {
    name: 'Pro',
    subtitle: 'Small Group',
    price: 'From $499',
    description: 'Smaller groups, extra practice time, prioritized feedback.',
    features: [
      'Small group (4-8 students)',
      'Weekly live sessions',
      'Extra practice time',
      'Prioritized feedback',
      'Course materials',
      'Recorded sessions',
    ],
    cta: 'Join Pro',
    popular: true,
  },
  {
    name: 'Premium',
    subtitle: '1:1 Coaching',
    price: 'From $1299',
    description: 'Personalized lessons, recorded sessions, CV review and interview prep.',
    features: [
      'One-on-one coaching',
      'Personalized lesson plans',
      'All sessions recorded',
      'CV review & interview prep',
      'Direct messaging access',
      'Flexible scheduling',
      'Lifetime materials access',
    ],
    cta: 'Book Premium',
    popular: false,
  },
]

export default function Pricing({ onContactClick }) {
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
            Pricing & Packages
          </Title>

          {/* Pricing Cards */}
          <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
            {packages.map((pkg, index) => (
              <Col xs={24} md={8} key={index}>
                <Badge.Ribbon
                  text={
                    <Space size="small">
                      <StarFilled />
                      <Text>Most Popular</Text>
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
                        <Text
                          style={{
                            color: '#8892a0',
                            fontSize: 14,
                            display: 'block',
                            textAlign: 'center',
                          }}
                        >
                          {pkg.subtitle}
                        </Text>
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

                      {/* Description */}
                      <Paragraph
                        style={{
                          color: '#c0c7d0',
                          fontSize: 14,
                          textAlign: 'center',
                          minHeight: 60,
                        }}
                      >
                        {pkg.description}
                      </Paragraph>

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
                        {pkg.cta}
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
            Prices are introductory and may change. Contact us for scholarships or payment plans.
          </Text>
        </Space>
      </Col>
    </Row>
  )
}
