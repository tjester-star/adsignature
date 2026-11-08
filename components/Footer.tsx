import { SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">AD Signature</p>
            <p className="mt-3 max-w-xs text-sm text-muted">Одежда в наличии и под заказ.</p>
          </div>

          <nav aria-label="Контакты" className="space-y-2 sm:justify-self-end">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Контакты</p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-muted transition-colors hover:text-ink"
            >
              WhatsApp
            </a>
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-muted transition-colors hover:text-ink"
            >
              Telegram
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-muted transition-colors hover:text-ink"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-muted">© {new Date().getFullYear()} AD Signature</p>
        </div>
      </div>
    </footer>
  )
}
