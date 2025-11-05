'use client'

import { Layout, Row, Col, Space, Typography, Divider } from 'antd'

const { Footer: AntFooter } = Layout
const { Text, Link } = Typography

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <AntFooter
      style={{
        textAlign: 'center',
        padding: '48px 16px 24px',
      }}
    >
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Links */}
            <Space size="large" wrap style={{ justifyContent: 'center' }}>
              <Link href="#about" style={{ color: '#8892a0' }}>Privacy</Link>
              <Link href="#about" style={{ color: '#8892a0' }}>Terms</Link>
              <Link href="#contact" style={{ color: '#8892a0' }}>Contact</Link>
              <Link href="#about" style={{ color: '#8892a0' }}>Sitemap</Link>
            </Space>

            <Divider style={{ margin: '16px 0' }} />

            {/* Privacy Notice */}
            <Text
              style={{
                fontSize: 13,
                color: '#6b7280',
                display: 'block',
                lineHeight: 1.6,
              }}
            >
              Form submissions are saved to Google Sheets used for course administration. We do not sell your data.
            </Text>

            {/* Copyright */}
            <Text
              style={{
                fontSize: 14,
                color: '#8892a0',
              }}
            >
              © {currentYear} LearnToDeal — All rights reserved.
            </Text>
          </Space>
        </Col>
      </Row>
    </AntFooter>
  )
}
