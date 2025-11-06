'use client'

import { Row, Col, Typography, Collapse } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useTranslations } from '../hooks/useTranslations'

const { Title, Paragraph } = Typography

export default function FAQ() {
  const t = useTranslations('faq')

  const faqData = [
    {
      key: '1',
      question: t('q1'),
      answer: t('a1'),
    },
    {
      key: '2',
      question: t('q2'),
      answer: t('a2'),
    },
    {
      key: '3',
      question: t('q3'),
      answer: t('a3'),
    },
    {
      key: '4',
      question: t('q4'),
      answer: t('a4'),
    },
    {
      key: '5',
      question: t('q5'),
      answer: t('a5'),
    },
    {
      key: '6',
      question: t('q6'),
      answer: t('a6'),
    },
  ]

  const items = faqData.map((faq) => ({
    key: faq.key,
    label: (
      <span style={{ fontSize: 16, fontWeight: 500, color: '#ffffff' }}>
        {faq.question}
      </span>
    ),
    children: (
      <Paragraph style={{ color: '#c0c7d0', fontSize: 15, lineHeight: 1.6 }}>
        {faq.answer}
      </Paragraph>
    ),
    extra: <QuestionCircleOutlined style={{ color: '#d9a451', fontSize: 18 }} />,
  }))

  return (
    <Row
      id="faq"
      justify="center"
      style={{
        padding: '60px 16px',
        background: '#0a0f16',
      }}
    >
      <Col xs={24} lg={18} xl={14}>
        {/* Section Title */}
        <Title
          level={2}
          style={{
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 48,
          }}
        >
          {t('title')}
        </Title>

        {/* FAQ Collapse */}
        <Collapse
          items={items}
          variant="borderless"
          defaultActiveKey={['1']}
          expandIconPosition="end"
          style={{
            background: 'transparent',
          }}
        />
      </Col>
    </Row>
  )
}
