// Centralized Ant Design Theme Configuration
// All styling and design tokens in one place

import { theme } from 'antd'

const themeConfig = {
  algorithm: theme.darkAlgorithm,

  token: {
    // Color Palette - Casino-inspired dark theme
    colorPrimary: '#d9a451', // Soft gold
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff6b6b', // Accent coral
    colorInfo: '#d9a451',
    colorTextBase: '#ffffff',
    colorBgBase: '#0f1720', // Dark charcoal background

    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSizeHeading1: 48,
    fontSizeHeading2: 36,
    fontSizeHeading3: 28,
    fontSizeHeading4: 22,
    fontSizeHeading5: 18,
    fontSize: 16,

    // Spacing & Layout
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    padding: 24,
    paddingLG: 32,
    paddingSM: 16,
    paddingXS: 8,
    margin: 24,
    marginLG: 32,
    marginSM: 16,

    // Component-specific
    controlHeight: 48,
    controlHeightLG: 56,
    controlHeightSM: 40,
    lineHeight: 1.6,
    lineHeightHeading: 1.3,
  },

  components: {
    // Layout
    Layout: {
      headerBg: '#0f1720',
      bodyBg: '#0f1720',
      footerBg: '#0a0f16',
      headerPadding: '0 48px',
      footerPadding: '48px 48px 24px',
    },

    // Typography
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      fontSizeHeading1: 48,
      fontWeightStrong: 700,
    },

    // Button
    Button: {
      primaryColor: '#0f1720',
      colorPrimaryHover: '#e6b766',
      colorPrimaryActive: '#c99640',
      defaultBorderColor: '#d9a451',
      defaultColor: '#d9a451',
      fontWeight: 600,
      controlHeight: 48,
      controlHeightLG: 56,
      borderRadius: 8,
      paddingContentHorizontal: 32,
    },

    // Card
    Card: {
      colorBgContainer: '#1a2332',
      colorBorderSecondary: '#2a3444',
      borderRadiusLG: 12,
      padding: 24,
      paddingLG: 32,
    },

    // Form
    Form: {
      labelColor: '#ffffff',
      labelFontSize: 15,
      verticalLabelPadding: '0 0 8px',
    },

    // Input
    Input: {
      colorBgContainer: '#1a2332',
      colorBorder: '#2a3444',
      colorText: '#ffffff',
      colorTextPlaceholder: '#8892a0',
      controlHeight: 48,
      fontSize: 15,
      borderRadius: 8,
      paddingBlock: 12,
      paddingInline: 16,
    },

    // Select
    Select: {
      colorBgContainer: '#1a2332',
      colorBorder: '#2a3444',
      colorText: '#ffffff',
      colorTextPlaceholder: '#8892a0',
      controlHeight: 48,
      fontSize: 15,
      borderRadius: 8,
      optionSelectedBg: '#d9a45120',
    },

    // Modal
    Modal: {
      contentBg: '#1a2332',
      headerBg: '#1a2332',
      titleColor: '#ffffff',
      colorIcon: '#ffffff',
      colorIconHover: '#d9a451',
      borderRadiusLG: 12,
      padding: 32,
      paddingContentHorizontal: 32,
    },

    // Menu
    Menu: {
      itemBg: 'transparent',
      itemColor: '#ffffff',
      itemHoverColor: '#d9a451',
      itemSelectedColor: '#d9a451',
      colorActiveBarBorderSize: 0,
      fontSize: 15,
      fontWeightStrong: 500,
    },

    // Collapse (for FAQ)
    Collapse: {
      contentBg: '#1a2332',
      headerBg: '#1a2332',
      colorBorder: '#2a3444',
      colorText: '#ffffff',
      fontSize: 16,
      fontSizeIcon: 14,
    },

    // Divider
    Divider: {
      colorSplit: '#2a3444',
    },

    // Tag
    Tag: {
      defaultBg: '#d9a45120',
      defaultColor: '#d9a451',
    },

    // Notification
    Notification: {
      colorBgElevated: '#1a2332',
      colorText: '#ffffff',
      colorIcon: '#d9a451',
    },

    // Alert
    Alert: {
      colorSuccessBg: '#1a2332',
      colorSuccessBorder: '#52c41a',
      colorSuccess: '#52c41a',
      colorInfoBg: '#1a2332',
      colorInfoBorder: '#d9a451',
      colorInfo: '#d9a451',
      colorWarningBg: '#1a2332',
      colorWarningBorder: '#faad14',
      colorWarning: '#faad14',
      colorErrorBg: '#1a2332',
      colorErrorBorder: '#ff6b6b',
      colorError: '#ff6b6b',
      colorText: '#ffffff',
      colorTextHeading: '#ffffff',
    },

    // Drawer
    Drawer: {
      colorBgElevated: '#1a2332',
      colorText: '#ffffff',
      colorIcon: '#ffffff',
      colorIconHover: '#d9a451',
    },

    // Badge
    Badge: {
      colorBorderBg: '#1a2332',
      textFontSize: 13,
    },

    // List
    List: {
      colorText: '#ffffff',
      colorTextDescription: '#c0c7d0',
    },

    // Avatar
    Avatar: {
      colorTextPlaceholder: '#8892a0',
      colorBgContainer: '#2a3444',
    },
  },
}

export default themeConfig
