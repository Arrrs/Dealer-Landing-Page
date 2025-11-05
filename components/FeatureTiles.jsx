'use client'

import { Row, Col, Card, Typography, Space } from 'antd'
import {
  TrophyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  RocketOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const features = [
  {
    icon: <TrophyOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
    title: 'Real Table Mechanics',
    description: 'Deal like a pro: shuffling, dealing, payouts, edge cases.',
    micro: 'Learn the exact hand motions and checks dealers use to avoid mistakes.',
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
    title: 'Game Strategy & Flow',
    description: 'Master how tables act, reading moments, and smooth dealing.',
    micro: 'Recognize tempo, handle busy hands, avoid bottlenecks.',
  },
  {
    icon: <TeamOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
    title: 'Player Interaction',
    description: 'Polish communication and floor etiquette for confidence.',
    micro: 'Confident table talk, handling disputes, and subtle crowd control.',
  },
  {
    icon: <RocketOutlined style={{ fontSize: 48, color: '#d9a451' }} />,
    title: 'Career Paths',
    description: 'Live dealer, online dealer, or casino floor — learn how to apply.',
    micro: 'CV tips, interviewing, where to find paid roles.',
  },
]

export default function FeatureTiles() {
  return (
    <Row
      id="about"
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
              marginBottom: 48,
            }}
          >
            What You'll Learn
          </Title>

          {/* Feature Cards */}
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  variant="borderless"
                  style={{
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {/* Icon */}
                    {feature.icon}

                    {/* Title */}
                    <Title
                      level={4}
                      style={{
                        color: '#ffffff',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {feature.title}
                    </Title>

                    {/* Description */}
                    <Paragraph
                      style={{
                        color: '#c0c7d0',
                        fontSize: 15,
                        marginBottom: 8,
                      }}
                    >
                      {feature.description}
                    </Paragraph>

                    {/* Micro example */}
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#8892a0',
                        fontStyle: 'italic',
                      }}
                    >
                      {feature.micro}
                    </Text>
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
