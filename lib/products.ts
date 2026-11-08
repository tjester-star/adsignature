import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

// Тип товара — ровно те поля, что описаны в public/admin/config.yml
export type Product = {
  slug: string // имя файла без .md
  title: string
  image: string // путь вида /uploads/photo.jpg (пустая строка = плейсхолдер)
  status: 'В наличии' | 'Предзаказ'
  colors: string[] // "Черный, Серый" -> ["Черный", "Серый"]
  description: string
  published: boolean
}

/**
 * Читает content/products/*.md (поля, созданные в CMS).
 * Вызывается один раз на этапе build: после коммита Decap CMS
 * Netlify пересобирает сайт, и каталог обновляется без правки кода.
 */
export function getProducts(): Product[] {
  const dir = path.join(process.cwd(), 'content', 'products')
  if (!fs.existsSync(dir)) return []

  return (
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file) => {
        const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))

        return {
          slug: file.replace(/\.md$/, ''),
          title: String(data.title ?? 'Без названия'),
          image: String(data.image ?? ''),
          status: data.status === 'Предзаказ' ? ('Предзаказ' as const) : ('В наличии' as const),
          colors: String(data.colors ?? '')
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean),
          description: String(data.description ?? ''),
          // Скрытые товары не попадают на сайт
          published: data.published !== false,
        }
      })
      // unpublished не показываем
      .filter((p) => p.published)
  )
}
