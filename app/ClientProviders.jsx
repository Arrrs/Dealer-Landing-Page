'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import themeConfig from '../theme.config'

export default function ClientProviders({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
