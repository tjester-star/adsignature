import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
      <body className="bg-paper font-sans text-ink antialiased">
        {children}

        {/* Виджет Netlify Identity: обрабатывает вход по ссылкам из писем —
            приглашение в админку (#invite_token=...) и сброс пароля
            (#recovery_token=...). Такие ссылки ведут на корень сайта, поэтому
            виджет обязан быть на всех страницах: он сам открывает окно
            задания пароля. В обычной работе посетитель его никогда не видит. */}
        <Script
          id="netlify-identity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function () {
  function boot() {
    if (window.netlifyIdentity) { window.netlifyIdentity.init(); return }
    var s = document.createElement('script')
    s.src = 'https://unpkg.com/netlify-identity-widget@1/build/netlify-identity-widget.js'
    s.async = true
    s.onload = function () { if (window.netlifyIdentity) window.netlifyIdentity.init() }
    document.head.appendChild(s)
  }
  boot()
})()`,
          }}
        />
      </body>
    </html>
  )
}
