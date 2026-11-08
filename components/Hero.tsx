import { SITE } from '@/lib/site'

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Магазин одежды</p>

        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Одежда в наличии и под заказ
        </h1>

        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          Выбираете модель — мы подтверждаем наличие или срок пошива, фиксируем цену
          и доставляем. Без навязанных допродаж и лишних шагов.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#catalog"
            className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-neutral-800"
          >
            Смотреть каталог
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
