import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Catalog from '@/components/Catalog'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'
import { getProducts } from '@/lib/products'

// Товары читаются из content/products/*.md на этапе build.
// CMS коммитит изменения в эти файлы -> Netlify пересобирает сайт -> каталог обновлён.
export default function Page() {
  const products = getProducts()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Catalog products={products} />
        <Reviews />
      </main>
      <Footer />

      {/* ===== Форма-прокси для Netlify Forms =====
          Netlify находит формы только в статичном HTML при сборке, поэтому
          настоящая форма заявки (она рендерится в модалке по клику) дублируется
          здесь — без визуального оформления, hidden. Поля name-атрибутов
          должны совпадать с теми, что сабмитит RequestModal. Сам пользователь
          эту разметку никогда не видит и не сабмитит напрямую. */}
      <form name="request" data-netlify="true" method="post" data-netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="request" />
        <p hidden>
          <label>
            Не заполняйте, если вы человек: <input name="bot-field" />
          </label>
        </p>
        <input type="text" name="product" />
        <input type="text" name="name" required />
        <input type="text" name="contact" required />
        <textarea name="comment" />
      </form>
    </>
  )
}
