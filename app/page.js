'use client'

import { ConfigProvider } from 'antd'
import { Layout } from 'antd'
import { useState } from 'react'
import themeConfig from '../theme.config'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FeatureTiles from '../components/FeatureTiles'
import HowItWorks from '../components/HowItWorks'
import Curriculum from '../components/Curriculum'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import InstructorBio from '../components/InstructorBio'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'

const { Content } = Layout

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const handleOpenContactModal = () => {
    setContactModalOpen(true)
  }

  const handleCloseContactModal = () => {
    setContactModalOpen(false)
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <Header onContactClick={handleOpenContactModal} />

        <Content style={{ overflowX: 'hidden', width: '100%' }}>
          <Hero onJoinWaitlist={handleOpenContactModal} />
          <FeatureTiles />
          <HowItWorks />
          <Curriculum />
          <Pricing onContactClick={handleOpenContactModal} />
          <Testimonials />
          <InstructorBio onContactClick={handleOpenContactModal} />
          <FAQ />
        </Content>

        <Footer />

        <ContactModal
          open={contactModalOpen}
          onClose={handleCloseContactModal}
        />
      </Layout>
    </ConfigProvider>
  )
}
