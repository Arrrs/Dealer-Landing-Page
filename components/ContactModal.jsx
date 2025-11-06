'use client'

import { Modal, Form, Input, Select, Radio, Button, Space, notification } from 'antd'
import { useState } from 'react'
import { useTranslations } from '../hooks/useTranslations'
import { submitContactForm } from '../lib/api'

const { TextArea } = Input

export default function ContactModal({ open, onClose }) {
  const t = useTranslations('contactModal')
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)

    try {
      await submitContactForm(values)

      // Show success notification
      notification.success({
        message: t('successTitle'),
        description: t('successMessage'),
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
      let errorMessage = error.message || t('errorMessage')

      // Show more helpful message for CORS errors in development
      if (error.message === 'Failed to fetch' && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        errorMessage = 'CORS error: This form will work in production. The Google Apps Script needs to be deployed with CORS headers enabled. See google-apps-script/Code.gs for the updated code with CORS support.'
      }

      notification.error({
        message: t('errorTitle'),
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
      title={t('title')}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      style={{
        padding: '0 16px',
        maxWidth: 'calc(100vw - 32px)'
      }}
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
          label={t('nameLabel')}
          rules={[
            { required: true, message: t('nameRequired') },
            { min: 2, message: t('nameMin') },
            { max: 100, message: t('nameMax') },
            {
              pattern: /^[a-zA-ZÀ-ž\s'-]+$/,
              message: t('namePattern')
            }
          ]}
        >
          <Input placeholder={t('namePlaceholder')} size="large" maxLength={100} />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label={t('emailLabel')}
          rules={[
            { required: true, message: t('emailRequired') },
            { type: 'email', message: t('emailInvalid') },
          ]}
        >
          <Input placeholder={t('emailPlaceholder')} size="large" type="email" />
        </Form.Item>

        {/* Phone (Optional) */}
        <Form.Item
          name="phone"
          label={t('phoneLabel')}
          rules={[
            {
              pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
              message: t('phonePattern')
            },
            {
              min: 7,
              message: t('phoneMin')
            },
            {
              max: 20,
              message: t('phoneMax')
            }
          ]}
        >
          <Input placeholder={t('phonePlaceholder')} size="large" type="tel" />
        </Form.Item>

        {/* Preferred Course Format */}
        <Form.Item
          name="course_format"
          label={t('formatLabel')}
          rules={[{ required: true, message: t('formatRequired') }]}
        >
          <Select placeholder={t('formatPlaceholder')} size="large">
            <Select.Option value="One-on-one">{t('formatOneOnOne')}</Select.Option>
            <Select.Option value="Small group">{t('formatSmallGroup')}</Select.Option>
            <Select.Option value="Mentor checks">{t('formatMentorChecks')}</Select.Option>
          </Select>
        </Form.Item>

        {/* Experience Level */}
        <Form.Item
          name="experience"
          label={t('experienceLabel')}
          rules={[{ required: true, message: t('experienceRequired') }]}
        >
          <Radio.Group size="large">
            <Space direction="vertical">
              <Radio value="Beginner">{t('experienceBeginner')}</Radio>
              <Radio value="Some experience">{t('experienceSome')}</Radio>
              <Radio value="Experienced">{t('experienceExperienced')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* Timezone & Availability */}
        <Form.Item
          name="tz"
          label={t('tzLabel')}
          rules={[
            {
              max: 100,
              message: t('tzMax')
            }
          ]}
        >
          <Input
            placeholder={t('tzPlaceholder')}
            size="large"
            maxLength={100}
          />
        </Form.Item>

        {/* Short Message */}
        <Form.Item
          name="message"
          label={t('messageLabel')}
          rules={[
            {
              max: 500,
              message: t('messageMax')
            }
          ]}
        >
          <TextArea
            placeholder={t('messagePlaceholder')}
            rows={4}
            size="large"
            maxLength={500}
            showCount
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
            style={{
              minHeight: '48px',
              height: 'auto',
              whiteSpace: 'normal',
              padding: '12px 24px'
            }}
          >
            {submitDisabled ? t('submitButtonDisabled') : t('submitButton')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
