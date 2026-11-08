import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Inter: только latin + cyrillic. Никаких декоративных шрифтов.
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AD Signature — одежда в наличии и под заказ',
  description: 'Каталог одежды в наличии и на заказ. Заявка — через WhatsApp или Telegram.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  )
}
