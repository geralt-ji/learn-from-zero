// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'
  ],
  content: {
    markdown: {
      toc: { depth: 2, searchDepth: 2 },
    },
    highlight: {
      langs: ['py', 'js'],
      // OR
      theme: {
        // Default theme (same as single string)
        light: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
      }
    }
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  // 在<header><script>中引入pyodide脚本
  app: {
    head: {
      script: [
        {
          src: 'https://jsd.onmicrosoft.cn/pyodide/v0.26.2/full/pyodide.js',
          type: 'text/javascript',
          defer: true
        }
      ]
    }
  }
})
