import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'
import { pages } from '../work/ssr/entry-server.js'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const base = env.VITE_BASE_PATH || '/'
let checkedLinks = 0
for (const route of pages()) {
  const html = await readFile(path.join('dist', route, 'index.html'), 'utf8')
  assert(!html.includes('<!--app-html-->'), `Unrendered page: ${route}`)
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `Expected one h1: ${route}`,
  )
  assert(html.includes(`lang="${route.startsWith('zh/') ? 'zh-CN' : 'en'}"`))
  assert(html.includes('property="og:title"'))
  assert.equal(html.includes('noindex, nofollow'), !env.SITE_URL)
  assert(html.includes(`data-rendered-path="${base}${route}"`))
  for (const match of html.matchAll(/(?:href|src)="([^"#]*)(?:#[^"]*)?"/g)) {
    const link = match[1]
    if (!link || /^(https?:|mailto:|data:)/.test(link)) continue
    assert(link.startsWith(base), `Link outside base: ${link}`)
    const local = decodeURIComponent(link.slice(base.length))
    const target = path.join('dist', local)
    assert(
      existsSync(target) || existsSync(path.join(target, 'index.html')),
      `Missing link target: ${link}`,
    )
    checkedLinks++
  }
}
const sentry = await readFile('dist/en/projects/sentry/index.html', 'utf8')
assert(sentry.includes('Data integrity · not agent success'))
const cifar = await readFile('dist/en/projects/cifar-10/index.html', 'utf8')
assert(cifar.includes('Validation accuracy') && cifar.includes('72.08%'))
assert(cifar.includes('Test accuracy') && cifar.includes('71.34%'))
assert(existsSync('dist/404.html') && existsSync('dist/og-image.png'))
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
assert.equal(
  (sitemap.match(/<url>/g) || []).length,
  env.SITE_URL ? pages().length - 1 : 0,
)
console.log(
  `Verified ${pages().length} prerendered pages, ${checkedLinks} local links, evidence labels, metadata and static assets (base ${base}).`,
)
