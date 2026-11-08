import { SITE } from '@/lib/site'

export default function Reviews() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Отзывы</p>
        <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
          Пока здесь пусто
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Мы публикуем только реальные отзывы и не собираем их авансом.
          Покупали у нас? Оставьте первый — нам важно ваше мнение.
        </p>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-sm border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
        >
          Оставить первый отзыв
        </a>
      </div>
    </section>
  )
}
