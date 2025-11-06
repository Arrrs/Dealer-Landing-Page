'use client'

import { Layout, Row, Col, Space, Typography, Divider } from 'antd'
import { useTranslations, useLocale } from '../hooks/useTranslations'
import Link from 'next/link'

const { Footer: AntFooter } = Layout
const { Text } = Typography

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const locale = useLocale()

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
              <Link href="/privacy" style={{ color: '#8892a0' }}>
                {t('privacy')}
              </Link>
              <Link href="/terms" style={{ color: '#8892a0' }}>
                {t('terms')}
              </Link>
              <Link href="/contact" style={{ color: '#8892a0' }}>
                {t('contact')}
              </Link>
              <Link href="/sitemap" style={{ color: '#8892a0' }}>
                {t('sitemap')}
              </Link>
            </Space>

            <Divider style={{ margin: '16px 0' }} />

            {/* Copyright */}
            <Text
              style={{
                fontSize: 14,
                color: '#8892a0',
              }}
            >
              © {currentYear} {tCommon('appName')} — All rights reserved.
            </Text>
          </Space>
        </Col>
      </Row>
    </AntFooter>
  )
}
