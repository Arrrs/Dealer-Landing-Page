'use client'

import { Row, Col, Typography, Button, Space, Image } from 'antd'

const { Title, Text, Paragraph } = Typography

export default function Hero({ onJoinWaitlist }) {
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
                From Dealer's Table To Your Career — Learn Pro Casino Dealing
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
                Hands-on coaching by a seasoned dealer. Live practice, real tips, and step-by-step mentoring — for beginners who want pro results.
              </Paragraph>

              {/* Trust Line */}
              <Text
                style={{
                  fontSize: 14,
                  color: '#d9a451',
                  fontWeight: 600,
                }}
              >
                Years at live and online tables — real shifts, real pay.
              </Text>

              {/* CTAs */}
              <Space size="middle" wrap style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={onJoinWaitlist}
                  style={{ height: 56, fontSize: 16, paddingLeft: 40, paddingRight: 40 }}
                >
                  Join Waitlist
                </Button>
                <Button
                  size="large"
                  onClick={handleViewCurriculum}
                  style={{ height: 56, fontSize: 16, paddingLeft: 40, paddingRight: 40 }}
                >
                  View Curriculum
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
                Limited seats in the first cohort. Free 20-minute intro call for early signups.
              </Text>
            </Space>
          </Col>

          {/* Right Column - Hero Image */}
          <Col xs={24} md={12}>
            <Image
              src="/images/1.png"
              alt="Professional casino dealer dealing cards at a casino table"
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
