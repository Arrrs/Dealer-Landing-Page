'use client'

import { useTranslations } from '../hooks/useTranslations'
import { Row, Col, Card, Typography, Button, Space, Image } from 'antd'

const { Title, Text, Paragraph } = Typography

export default function InstructorBio({ onContactClick }) {
  const t = useTranslations('instructor')
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
                    {t('title')}
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
                    {t('name')}
                  </Title>
                  <Text
                    style={{
                      color: '#8892a0',
                      fontSize: 16,
                    }}
                  >
                    {t('role')}
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
                  {t('bio')}
                </Paragraph>

                {/* CTA */}
                <Space direction="vertical" size="small">
                  <Button
                    type="primary"
                    size="large"
                    onClick={onContactClick}
                    style={{
                      marginTop: 16,
                    }}
                  >
                    {t('ctaButton')}
                  </Button>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#8892a0',
                      fontStyle: 'italic',
                      display: 'block',
                    }}
                  >
                    {t('ctaHint')}
                  </Text>
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
