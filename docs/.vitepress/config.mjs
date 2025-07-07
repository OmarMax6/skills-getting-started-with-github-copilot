import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Gemini CLI Documentation',
  description: 'Multi-language documentation for Google Gemini CLI',
  
  // Enable multi-language support
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      dir: '/',
      title: 'Gemini CLI Documentation',
      description: 'Multi-language documentation for Google Gemini CLI'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      dir: '/zh/',
      title: 'Gemini CLI 文档',
      description: 'Google Gemini CLI 多语言文档'
    },
    'zh-tw': {
      label: '繁體中文',
      lang: 'zh-TW',
      dir: '/zh-tw/',
      title: 'Gemini CLI 文檔',
      description: 'Google Gemini CLI 多語言文檔'
    },
    es: {
      label: 'Español',
      lang: 'es',
      dir: '/es/',
      title: 'Documentación de Gemini CLI',
      description: 'Documentación multiidioma para Google Gemini CLI'
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      dir: '/fr/',
      title: 'Documentation Gemini CLI',
      description: 'Documentation multilingue pour Google Gemini CLI'
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      dir: '/de/',
      title: 'Gemini CLI Dokumentation',
      description: 'Mehrsprachige Dokumentation für Google Gemini CLI'
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      dir: '/ja/',
      title: 'Gemini CLI ドキュメント',
      description: 'Google Gemini CLI 多言語ドキュメント'
    },
    ko: {
      label: '한국어',
      lang: 'ko',
      dir: '/ko/',
      title: 'Gemini CLI 문서',
      description: 'Google Gemini CLI 다국어 문서'
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      dir: '/pt/',
      title: 'Documentação Gemini CLI',
      description: 'Documentação multilíngue para Google Gemini CLI'
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      dir: '/ru/',
      title: 'Документация Gemini CLI',
      description: 'Многоязычная документация для Google Gemini CLI'
    },
    it: {
      label: 'Italiano',
      lang: 'it',
      dir: '/it/',
      title: 'Documentazione Gemini CLI',
      description: 'Documentazione multilingue per Google Gemini CLI'
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      dir: '/ar/',
      title: 'وثائق Gemini CLI',
      description: 'وثائق متعددة اللغات لـ Google Gemini CLI'
    },
    hi: {
      label: 'हिंदी',
      lang: 'hi',
      dir: '/hi/',
      title: 'Gemini CLI दस्तावेज़',
      description: 'Google Gemini CLI के लिए बहुभाषी दस्तावेज़'
    },
    id: {
      label: 'Bahasa Indonesia',
      lang: 'id',
      dir: '/id/',
      title: 'Dokumentasi Gemini CLI',
      description: 'Dokumentasi multi-bahasa untuk Google Gemini CLI'
    },
    ta: {
      label: 'தமிழ்',
      lang: 'ta',
      dir: '/ta/',
      title: 'Gemini CLI ஆவணங்கள்',
      description: 'Google Gemini CLI க்கான பல மொழி ஆவணங்கள்'
    },
    tr: {
      label: 'Türkçe',
      lang: 'tr',
      dir: '/tr/',
      title: 'Gemini CLI Belgeleri',
      description: 'Google Gemini CLI için çok dilli belgeler'
    }
  },

  themeConfig: {
    // Navigation
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Usage', link: '/usage' },
      { text: 'API', link: '/api' },
      { text: 'GitHub', link: 'https://github.com/google-gemini/gemini-cli' }
    ],

    // Sidebar
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick Start', link: '/quick-start' }
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'Basic Commands', link: '/usage' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Examples', link: '/examples' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'API Reference', link: '/api' },
          { text: 'CLI Options', link: '/cli-options' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    // Footer
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Google LLC'
    },

    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/google-gemini/gemini-cli' }
    ],

    // Search
    search: {
      provider: 'local'
    },

    // Language selector
    langMenuLabel: 'Change language',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme'
  },

  // Build configuration
  base: '/',
  cleanUrls: true,
  
  // Head tags
  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // Ignore dead links temporarily during development
  ignoreDeadLinks: true,

  // Markdown configuration
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})