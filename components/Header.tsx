import { SITE } from '@/lib/site'

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        {/* Текстовый логотип: акцент через толщину и разрядку */}
        <a href="/" className="text-sm font-semibold uppercase tracking-[0.2em]">
          AD Signature
        </a>
        <nav aria-label="Связь" className="flex items-center gap-5">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Написать в WhatsApp
          </a>
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Telegram
          </a>
        </nav>
      </div>
    </header>
  )
}
