'use client'

import { Row, Col, Card, Typography, Space, Tag, Alert, Image } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const formats = [
  {
    title: 'One-on-one (Premium)',
    summary: 'Weekly 60–90 minute live coaching calls, personalized drills, and direct feedback. Best for fast progress and career transition.',
    timeline: 'Typical plan: 8–12 weeks.',
    tag: 'Most Popular',
  },
  {
    title: 'Small Group (Pro)',
    summary: 'Groups of 4–8 students, weekly live sessions with guided practice and community support.',
    timeline: '8–12 weeks with cohort practice sessions.',
    tag: 'Best Value',
  },
  {
    title: 'Mentor-checked Self-study (Starter — future)',
    summary: 'Self-paced learning with periodic mentor reviews and monthly group Q&A.',
    timeline: 'Flexible.',
    tag: 'Coming Soon',
  },
]

export default function HowItWorks() {
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
            How It Works — Format & Guarantees
          </Title>

          <Paragraph
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#c0c7d0',
              marginBottom: 32,
            }}
          >
            Three guided formats — choose the pace and intensity that fit you.
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
                  Satisfaction Guarantee
                </Text>
              </Space>
            }
            description="If you try the first two sessions and don't find them useful, contact us for a partial refund or reschedule — we want students who get results."
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
