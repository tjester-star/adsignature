'use client'

// Клиентский компонент: держит состояние окна заявки.
import { useState } from 'react'
import type { Product } from '@/lib/products' // import type — node-модули не попадут в бандл
import RequestModal from '@/components/RequestModal'

export default function Catalog({ products }: { products: Product[] }) {
  // Товар, для которого открыто окно заявки (null — окно закрыто)
  const [requested, setRequested] = useState<Product | null>(null)

  return (
    <section id="catalog" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Каталог</p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
          В наличии и под заказ
        </h2>

        {products.length > 0 ? (
          // Сетка товаров: 3 колонки на десктопе, большие интервалы
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onRequest={() => setRequested(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-sm border border-line px-6 py-16 text-center text-sm text-muted">
            Каталог обновляется. Загляните позже или напишите нам в WhatsApp.
          </div>
        )}
      </div>

      {/* Окно заявки: название выбранного товара подставляется автоматически */}
      <RequestModal product={requested} onClose={() => setRequested(null)} />
    </section>
  )
}

function ProductCard({ product, onRequest }: { product: Product; onRequest: () => void }) {
  const inStock = product.status === 'В наличии'

  return (
    <article>
      {/* Фото, aspect-ratio 3/4 */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-line">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          // Плейсхолдер, пока владелец не загрузил фото в CMS
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-muted">
            Фото в CMS
          </div>
        )}
        {/* Бейдж статуса: налитой для «В наличии», контурный для «Предзаказ» */}
        <span
          className={
            inStock
              ? 'absolute left-3 top-3 rounded-sm bg-ink px-2 py-1 text-[11px] font-medium uppercase tracking-widest text-paper'
              : 'absolute left-3 top-3 rounded-sm border border-line bg-paper px-2 py-1 text-[11px] font-medium uppercase tracking-widest text-ink'
          }
        >
          {product.status}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-medium">{product.title}</h3>

      {product.colors.length > 0 && (
        <p className="mt-1 text-sm text-muted">{product.colors.join(' · ')}</p>
      )}

      {product.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
      )}

      <button
        type="button"
        onClick={onRequest}
        className="mt-4 w-full rounded-sm border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink"
      >
        Оставить заявку
      </button>
    </article>
  )
}
