// Одноразовая проверка: есть ли атрибут netlify у формы-прокси в статике
import fs from 'node:fs'

const html = fs.readFileSync('out/index.html', 'utf8')
console.log('netlify attr present:', html.includes('<form netlify="true"'))
const start = html.indexOf('<form')
console.log('form start:', html.slice(start, start + 120))
