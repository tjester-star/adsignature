const steps = [
  {
    n: '01',
    title: 'Выбор',
    text: 'Вы выбираете модель и цвет из каталога или присылаете референс.',
  },
  {
    n: '02',
    title: 'Подтверждение',
    text: 'Мы уточняем наличие или срок пошива, цену и детали примерки.',
  },
  {
    n: '03',
    title: 'Доставка',
    text: 'После оплаты отправляем заказ. Сроки и способ фиксируем в переписке.',
  },
]

export default function HowItWorks() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Как это работает</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-x-10">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-line pt-6">
              {/* Крупная цифра — единственный визуальный акцент, без иконок */}
              <span className="text-6xl font-semibold tracking-tight" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="mt-6 text-sm font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
