import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Дизайн-система: ровно 4 цвета, без синего/purple и без теней
      colors: {
        paper: '#FAFAFA', // фон
        ink: '#171717', // текст
        muted: '#737373', // вторичный текст
        line: '#E5E5E5', // границы
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
