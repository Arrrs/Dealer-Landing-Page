'use client'

import { Row, Col, Typography, Collapse } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const faqData = [
  {
    key: '1',
    question: 'Do I need experience to join?',
    answer: 'No. Most students start with little to no experience. We begin with fundamentals and practical drills.',
  },
  {
    key: '2',
    question: 'How long before I can work?',
    answer: 'Typical timeline is 8–12 weeks for a confident, working baseline — it depends on practice and prior skill.',
  },
  {
    key: '3',
    question: 'Do you provide a certificate?',
    answer: 'We provide a completion record and recorded sessions; formal casino certificates vary by region.',
  },
  {
    key: '4',
    question: 'Is this legal / ethical?',
    answer: 'Yes. This is training and career coaching for regulated dealer roles. We do not teach cheating or exploitative behavior.',
  },
  {
    key: '5',
    question: 'How are payments handled?',
    answer: 'Payments via Stripe or bank transfer (details provided at checkout). Custom plans available.',
  },
  {
    key: '6',
    question: 'What if I miss a session?',
    answer: 'Sessions are recorded when possible; reschedules allowed within reason.',
  },
]

export default function FAQ() {
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
          Frequently Asked Questions
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
