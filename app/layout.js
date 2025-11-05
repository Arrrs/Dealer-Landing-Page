import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App } from 'antd'
import themeConfig from '../theme.config'
import './globals.css'

export const metadata = {
  title: 'Learn To Deal: Live Dealer Coaching for Blackjack, Roulette & Poker',
  description: 'Practical, mentor-led coaching from a professional casino dealer. One-on-one and small-group paths. Learn table mechanics, game tactics, and live-dealer workflow — fast.',
  keywords: ['casino dealer', 'dealer training', 'blackjack', 'roulette', 'poker', 'live dealer', 'dealer coaching'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden', width: '100%' }}>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            <App>
              {children}
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
