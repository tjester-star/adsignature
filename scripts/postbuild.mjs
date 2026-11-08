/**
 * Постобработка статического экспорта после `next build`.
 *
 * Зачем: детектор форм Netlify должен увидеть в HTML атрибут netlify.
 * React оставляет только data-netlify="true", а детектор на drag&drop-деплоях
 * в этом случае может не сработать — поэтому страхуемся: вставляем рядом
 * самостоятельный атрибут netlify="true" в каждую форму с data-netlify.
 *
 * Важно (баги первой версии, не повторять):
 *  - `\bnetlify=` в проверке ложно совпадает ВНУТРИ data-netlify= (граница слова
 *    между `-` и `n`), из-за чего замена молча не происходила;
 *  - жадная группа `[^>]*data-netlify` цеплялась за последний data-netlify
 *    в теге и портила data-netlify-honeypot.
 * Теперь tag разбирается целиком, атрибут вставляется в начало, повторный
 * запуск ничего не меняет (идемпотентно).
 *
 * Запускается последней стадией `npm run build` (см. package.json).
 */
import fs from 'node:fs'
import path from 'node:path'

const outDir = path.join(process.cwd(), 'out')
if (!fs.existsSync(outDir)) {
  console.error('postbuild: папка out/ не найдена — сначала next build')
  process.exit(1)
}

let patched = 0

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(p)
    } else if (entry.name.endsWith('.html')) {
      const original = fs.readFileSync(p, 'utf8')
      let changed = false

      const html = original.replace(/<form\b([^>]*)>/g, (fullTag, attrs) => {
        // Самостоятельный netlify="..." уже стоит (перед ним пробел)? Не трогаем.
        if (/(^|\s)netlify=/.test(attrs)) return fullTag
        // Патчим только формы, размеченные для Netlify.
        if (!/data-netlify/.test(attrs)) return fullTag
        changed = true
        return `<form netlify="true"${attrs}>`
      })

      if (changed) {
        fs.writeFileSync(p, html, 'utf8')
        patched++

        // Честная проверка: перечитываем файл и показываем, что реально в нём.
        const verify = fs.readFileSync(p, 'utf8')
        const tag = /<form[^>]{0,90}/.exec(verify)?.[0] ?? '(форма не найдена)'
        console.log(`[postbuild] ${path.relative(outDir, p)} — записано:`)
        console.log('  ' + tag)
      }
    }
  }
}

walk(outDir)
console.log(`postbuild: финал — изменено файлов: ${patched}`)
