'use client'

import { Modal, Form, Input, Select, Radio, Button, Space, notification } from 'antd'
import { useState } from 'react'
import { submitContactForm } from '../lib/api'

const { TextArea } = Input

export default function ContactModal({ open, onClose }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)

    try {
      await submitContactForm(values)

      // Show success notification
      notification.success({
        message: 'Request Received',
        description: 'Thanks — your request was received. We will contact you within 48 hours.',
        placement: 'topRight',
        duration: 5,
      })

      // Disable submit for 10 seconds to avoid duplicates
      setSubmitDisabled(true)
      setTimeout(() => {
        setSubmitDisabled(false)
      }, 10000)

      // Reset form and close modal
      form.resetFields()
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      let errorMessage = error.message || 'Something went wrong. Please try again or contact us directly.'

      // Show more helpful message for CORS errors in development
      if (error.message === 'Failed to fetch' && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        errorMessage = 'CORS error: This form will work in production. The Google Apps Script needs to be deployed with CORS headers enabled. See google-apps-script/Code.gs for the updated code with CORS support.'
      }

      notification.error({
        message: 'Submission Failed',
        description: errorMessage,
        placement: 'topRight',
        duration: 8,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Join Waitlist"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      styles={{
        body: { padding: '32px 24px' }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
      >
        {/* Full Name */}
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: 'Please enter your full name' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input placeholder="Your full name" size="large" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Your email address" size="large" type="email" />
        </Form.Item>

        {/* Phone (Optional) */}
        <Form.Item
          name="phone"
          label="Phone (Optional)"
        >
          <Input placeholder="Phone (optional)" size="large" type="tel" />
        </Form.Item>

        {/* Preferred Course Format */}
        <Form.Item
          name="course_format"
          label="Preferred Course Format"
          rules={[{ required: true, message: 'Please select a format' }]}
        >
          <Select placeholder="Choose a format" size="large">
            <Select.Option value="One-on-one">One-on-one</Select.Option>
            <Select.Option value="Small group">Small group</Select.Option>
            <Select.Option value="Mentor checks">Mentor checks</Select.Option>
          </Select>
        </Form.Item>

        {/* Experience Level */}
        <Form.Item
          name="experience"
          label="Experience Level"
          rules={[{ required: true, message: 'Please select your experience level' }]}
        >
          <Radio.Group size="large">
            <Space direction="vertical">
              <Radio value="Beginner">Beginner</Radio>
              <Radio value="Some experience">Some experience</Radio>
              <Radio value="Experienced">Experienced</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* Timezone & Availability */}
        <Form.Item
          name="tz"
          label="Timezone & Availability"
        >
          <Input
            placeholder="e.g. Europe/Kyiv — evenings UTC+2"
            size="large"
          />
        </Form.Item>

        {/* Short Message */}
        <Form.Item
          name="message"
          label="Short Message"
        >
          <TextArea
            placeholder="Tell us your goal in 1-2 sentences"
            rows={4}
            size="large"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            disabled={submitDisabled}
          >
            {submitDisabled ? 'Request Sent — Check Your Email' : 'Send Request'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
