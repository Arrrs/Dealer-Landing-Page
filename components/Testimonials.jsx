'use client'

import { Row, Col, Card, Typography, Space, Avatar } from 'antd'
import { StarFilled, UserOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const testimonials = [
  {
    quote: 'I went from zero to confidently dealing live tables in six weeks. The instructor does not sugarcoat anything — she shows what works.',
    name: 'Anna P.',
    role: 'Live Dealer (graduated cohort)',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote: 'Practical, fast, and directly applicable. Real drills, real corrections — worth every cent.',
    name: 'Mark S.',
    role: 'Casino floor staff',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    quote: 'Sofia knows the casino floor inside out. Her coaching helped me land my first online dealer position within two months.',
    name: 'Jessica L.',
    role: 'Online Dealer',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
]

export default function Testimonials() {
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
            What Students Say
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
            See a short video from a recent student (30s) — coming soon
          </Text>
        </Space>
      </Col>
    </Row>
  )
}
