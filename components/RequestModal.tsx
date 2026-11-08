'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Product } from '@/lib/products'

// Поля формы заявки
type FormData = { name: string; contact: string; comment: string }

export default function RequestModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<FormData>({ name: '', contact: '', comment: '' })
  const nameRef = useRef<HTMLInputElement>(null)

  // Закрытие по Escape, блокировка прокрутки фона, фокус на первое поле
  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    nameRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  // Сброс состояния при открытии окна (для нового товара тоже)
  useEffect(() => {
    if (product) {
      setSent(false)
      setError('')
      setForm({ name: '', contact: '', comment: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.slug])

  // ==== Куда уходят заявки ====
  // Netlify Forms. Пара файлов: форма-прокси с data-netlify лежит в статике
  // главной страницы (app/page.tsx) — по ней Netlify создаёт форму «request»,
  // а сама модалка сабмитит программно: POST x-www-form-urlencoded на "/"
  // с form-name=request. На Netlify включите письма-уведомления:
  // Netlify UI -> Forms -> request -> Settings -> Email notifications.
  //
  // ВАЖНО: заявка физически сохраняется только на Netlify после деплоя.
  // Локально `serve` тоже отвечает 200 на POST — окно покажет «отправлено»,
  // но в панели Forms это не появится. Проверяйте основной деплой.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'request',
          product: product?.title ?? '',
          name: form.name,
          contact: form.contact,
          comment: form.comment,
        }).toString(),
      })
      if (!res.ok) throw new Error(`формы вернули ${res.status}`)
      setSent(true)
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.')
    }
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6">
      {/* Затемнение фона. Без blur и градиентов */}
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
        className="relative w-full max-w-md rounded-sm border border-line bg-paper p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="request-modal-title" className="text-lg font-semibold tracking-tight">
            Оставить заявку
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="-mr-1 p-1 text-muted transition-colors hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Название выбранного товара подставляется автоматически */}
        <p className="mt-2 text-sm text-muted">
          Товар: <span className="font-medium text-ink">{product.title}</span>
        </p>

        {sent ? (
          <div className="py-10 text-center">
            <p className="text-sm font-medium">Заявка отправлена.</p>
            <p className="mt-2 text-sm text-muted">Свяжемся с вами в WhatsApp или Telegram.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-sm border border-line px-6 py-2.5 text-sm font-medium transition-colors hover:border-ink"
            >
              Хорошо
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="req-name"
                className="block text-xs font-medium uppercase tracking-widest text-muted"
              >
                Имя
              </label>
              <input
                ref={nameRef}
                id="req-name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-sm border border-line bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink"
              />
            </div>

            <div>
              <label
                htmlFor="req-contact"
                className="block text-xs font-medium uppercase tracking-widest text-muted"
              >
                Телефон / Telegram
              </label>
              <input
                id="req-contact"
                required
                autoComplete="tel"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="mt-2 w-full rounded-sm border border-line bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink"
              />
            </div>

            <div>
              <label
                htmlFor="req-comment"
                className="block text-xs font-medium uppercase tracking-widest text-muted"
              >
                Комментарий
              </label>
              <textarea
                id="req-comment"
                rows={3}
                placeholder="Размер, цвет, вопросы"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="mt-2 w-full resize-none rounded-sm border border-line bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-sm bg-ink px-4 py-3 text-sm font-medium text-paper transition-colors hover:bg-neutral-800"
            >
              Отправить заявку
            </button>

            {/* Ошибка сети: серый вторичный текст, в духе дизайн-системы */}
            {error && <p className="text-xs leading-relaxed text-muted">{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}
