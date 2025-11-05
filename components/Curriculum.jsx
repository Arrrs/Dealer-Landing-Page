'use client'

import { Row, Col, Typography, Space, Card, Tag } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const modules = [
  {
    title: 'Module 1 — Foundations',
    hours: '3–4 hrs',
    copy: 'Rules and payouts for blackjack, roulette and poker. Table equipment, basic chip handling and clean dealing drills.',
    outcomes: 'Deal clean hands, recognize table mistakes, basic math checks.',
  },
  {
    title: 'Module 2 — Blackjack Basics & Dealer Protocol',
    hours: '6 hrs',
    copy: 'Insurance, blackjack payouts, splitting and doubling rules. Dealer-specific protocols and error handling.',
    outcomes: 'Deal, manage insurance, spot payout edge-cases.',
  },
  {
    title: 'Module 3 — Roulette & Wheel Management',
    hours: '4 hrs',
    copy: 'Payout tables, wheel calls, bet types, tracking visual indicators. Handling disputes and lost chips.',
    outcomes: 'Perform correct payouts and run efficient wheel cycles.',
  },
  {
    title: 'Module 4 — Poker Table Management',
    hours: '6 hrs',
    copy: 'Collecting antes, managing pots, proper chip moves, common fouls and dealer wording.',
    outcomes: 'Run a clean poker round under pressure.',
  },
  {
    title: 'Module 5 — Live-Dealer Tech & Online Setup',
    hours: '4 hrs',
    copy: 'Camera framing, audio, basic streaming software, latency handling, and player-facing overlays.',
    outcomes: 'Set up a professional live-dealer stream or assist one.',
  },
  {
    title: 'Module 6 — Soft Skills & Career',
    hours: '2–3 hrs',
    copy: 'Player psychology, floor etiquette, building a CV, where to look for roles, interview prep.',
    outcomes: 'Present yourself professionally and land interviews.',
  },
  {
    title: 'Capstone (Optional)',
    hours: 'Flexible',
    copy: 'Final practical session with live simulated shifts and instructor feedback.',
    outcomes: 'Demonstrate readiness to work a live or online table.',
  },
]

export default function Curriculum() {
  return (
    <Row
      id="curriculum"
      justify="center"
      style={{
        padding: '60px 16px',
        background: '#0a0f16',
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
            Curriculum & Roadmap
          </Title>

          <Paragraph
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#c0c7d0',
              marginBottom: 32,
            }}
          >
            Clear, modular curriculum. Each module has short practical exercises and a real-time practice session.
          </Paragraph>

          {/* Module Cards */}
          <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
            {modules.map((module, index) => (
              <Col xs={24} md={12} lg={12} key={index}>
                <Card
                  variant="borderless"
                  style={{
                    height: '100%',
                    background: index === modules.length - 1
                      ? 'linear-gradient(135deg, #1a2332 0%, #141b28 100%)'
                      : '#1a2332',
                    border: '1px solid #2a3444',
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Module Number & Hours */}
                    <Space style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <Tag
                        color="gold"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: 6,
                        }}
                      >
                        {index === modules.length - 1 ? 'Optional' : `Module ${index + 1}`}
                      </Tag>
                      <Space size="small">
                        <ClockCircleOutlined style={{ color: '#d9a451', fontSize: 14 }} />
                        <Text style={{ color: '#d9a451', fontWeight: 500, fontSize: 13 }}>
                          {module.hours}
                        </Text>
                      </Space>
                    </Space>

                    {/* Module Title */}
                    <Title
                      level={4}
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        margin: 0,
                        fontSize: 18,
                      }}
                    >
                      {module.title.replace(/^Module \d+ — /, '')}
                    </Title>

                    {/* Description */}
                    <Paragraph
                      style={{
                        color: '#c0c7d0',
                        fontSize: 14,
                        marginBottom: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {module.copy}
                    </Paragraph>

                    {/* Outcomes */}
                    <Space direction="vertical" size={4} style={{ width: '100%', marginTop: 8 }}>
                      <Space size="small">
                        <CheckCircleOutlined style={{ color: '#d9a451', fontSize: 14 }} />
                        <Text strong style={{ color: '#d9a451', fontSize: 13 }}>
                          What you'll master:
                        </Text>
                      </Space>
                      <Paragraph style={{ color: '#8892a0', fontSize: 13, marginLeft: 22, marginBottom: 0 }}>
                        {module.outcomes}
                      </Paragraph>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </Col>
    </Row>
  )
}
