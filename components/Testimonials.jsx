'use client'

import { Row, Col, Card, Typography, Space, Avatar } from 'antd'
import { StarFilled, UserOutlined } from '@ant-design/icons'
import { useTranslations } from '../hooks/useTranslations'

const { Title, Text, Paragraph } = Typography

export default function Testimonials() {
  const t = useTranslations('testimonials')

  const testimonials = [
    {
      quote: t('testimonial1'),
      name: t('name1'),
      role: t('role1'),
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      quote: t('testimonial2'),
      name: t('name2'),
      role: t('role2'),
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    {
      quote: t('testimonial3'),
      name: t('name3'),
      role: t('role3'),
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ]
  return (
    <Row
      id="testimonials"
      justify="center"
      style={{
        padding: '60px 16px',
        background: 'radial-gradient(ellipse at center, rgba(217, 164, 81, 0.03) 0%, #0a0f16 70%)',
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

          {/* Testimonial Cards */}
          <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  variant="borderless"
                  style={{ height: '100%' }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Stars */}
                    <Space size="small">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarFilled key={star} style={{ color: '#d9a451', fontSize: 16 }} />
                      ))}
                    </Space>

                    {/* Quote */}
                    <Paragraph
                      style={{
                        color: '#c0c7d0',
                        fontSize: 15,
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                        minHeight: 100,
                      }}
                    >
                      "{testimonial.quote}"
                    </Paragraph>

                    {/* Author */}
                    <Space size="middle" align="center">
                      <Avatar
                        size={48}
                        src={testimonial.avatar}
                        icon={<UserOutlined />}
                      />
                      <Space direction="vertical" size={0}>
                        <Text
                          strong
                          style={{
                            color: '#ffffff',
                            fontSize: 15,
                          }}
                        >
                          {testimonial.name}
                        </Text>
                        <Text
                          style={{
                            color: '#8892a0',
                            fontSize: 13,
                          }}
                        >
                          {testimonial.role}
                        </Text>
                      </Space>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Video Testimonial Note */}
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
            {t('videoNote')}
          </Text>
        </Space>
      </Col>
    </Row>
  )
}
