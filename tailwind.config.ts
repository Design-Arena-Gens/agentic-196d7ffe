import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0d10',
        sidebar: '#0f1217',
        surface: '#11151b',
        border: '#1e2430',
        text: '#e5e7eb',
        muted: '#9aa4b2',
        primary: '#7c9cff',
        accent: '#22d3ee'
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
} satisfies Config
