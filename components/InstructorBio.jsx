'use client'

import { Row, Col, Card, Typography, Button, Space, Image } from 'antd'

const { Title, Text, Paragraph } = Typography

export default function InstructorBio({ onContactClick }) {
  return (
    <Row
      justify="center"
      style={{
        padding: '60px 16px',
      }}
    >
      <Col xs={24} lg={18} xl={16}>
        <Card
          variant="borderless"
          style={{
            background: 'linear-gradient(135deg, #1a2332 0%, #0f1720 100%)',
          }}
        >
          <Row gutter={[48, 48]} align="middle">
            {/* Image Column */}
            <Col xs={24} md={10}>
              <Card
                variant="borderless"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  background: 'linear-gradient(135deg, #1a2332 0%, #0a0f16 100%)',
                  borderRadius: 8,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #2a3444',
                }}
              >
                <Space direction="vertical" size="small" align="center">
                  <Text style={{ color: '#8892a0', fontSize: 14, textAlign: 'center' }}>
                    Instructor Photo
                  </Text>
                  <Text style={{ fontSize: 11, color: '#6b7280', fontStyle: 'italic', textAlign: 'center' }}>
                    Generate: Professional female dealer portrait in black vest and white shirt, confident friendly expression, dark background
                  </Text>
                </Space>
              </Card>
            </Col>

            {/* Bio Content Column */}
            <Col xs={24} md={14}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* Title */}
                <Space direction="vertical" size="small">
                  <Title
                    level={3}
                    style={{
                      color: '#d9a451',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    Sofia
                  </Title>
                  <Text
                    style={{
                      color: '#8892a0',
                      fontSize: 16,
                    }}
                  >
                    Professional Casino Dealer & Live-Dealer Specialist
                  </Text>
                </Space>

                {/* Bio Text */}
                <Paragraph
                  style={{
                    color: '#c0c7d0',
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  Sofia started as a floor dealer and spent several years across live and online tables mastering blackjack, roulette and poker. Training on the job was fast and unforgiving; formal courses were scarce and expensive. Having navigated the real-world learning path, she now helps motivated students learn the right skills quickly — from clean dealing to streaming setups and career transitions. Her coaching is direct, practical, and focused on outcomes.
                </Paragraph>

                {/* CTA */}
                <Button
                  type="primary"
                  size="large"
                  onClick={onContactClick}
                  style={{
                    marginTop: 16,
                    whiteSpace: 'normal',
                    height: 'auto',
                    padding: '12px 24px',
                  }}
                >
                  Book an intro call — see if coaching fits your goals
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
