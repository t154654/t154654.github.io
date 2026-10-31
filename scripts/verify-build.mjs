import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import { loadEnv } from 'vite'
import { pages } from '../work/ssr/entry-server.js'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const base = env.VITE_BASE_PATH || '/'
const siteUrl = env.SITE_URL
  ? env.SITE_URL.replace(/\/+$/, '') + '/'
  : undefined
const origin = siteUrl ? new URL(siteUrl).origin : 'https://portfolio.invalid'
const documents = new Map()
async function documentAt(filename) {
  if (!documents.has(filename))
    documents.set(
      filename,
      new JSDOM(await readFile(filename, 'utf8')).window.document,
    )
  return documents.get(filename)
}
let checkedLinks = 0
let checkedAnchors = 0
for (const route of pages()) {
  const filename = path.join('dist', route, 'index.html')
  const document = await documentAt(filename)
  assert.equal(
    document.querySelectorAll('h1').length,
    1,
    'Expected one h1: ' + route,
  )
  assert.equal(
    document.documentElement.lang,
    route.startsWith('zh/') ? 'zh-CN' : 'en',
  )
  assert(document.querySelector('meta[property="og:title"]'))
  assert.equal(
    Boolean(
      document.querySelector(
        'meta[name="robots"][content="noindex, nofollow"]',
      ),
    ),
    !siteUrl,
  )
  assert.equal(
    document.getElementById('root').dataset.renderedPath,
    base + route,
  )
  const ids = [...document.querySelectorAll('[id]')].map((node) => node.id)
  assert.equal(new Set(ids).size, ids.length, 'Duplicate section IDs: ' + route)
  if (siteUrl) {
    const canonical = siteUrl + (route || 'en/')
    assert.equal(
      document.querySelector('link[rel="canonical"]').href,
      canonical,
    )
    assert.equal(
      document.querySelector('meta[property="og:url"]').content,
      canonical,
    )
    assert.equal(
      document.querySelector('meta[property="og:image"]').content,
      siteUrl + 'og-image.png',
    )
    const counterpart = route
      ? route.replace(/^(en|zh)\//, route.startsWith('zh/') ? 'en/' : 'zh/')
      : 'zh/'
    assert(
      [...document.querySelectorAll('link[rel="alternate"]')].some(
        (link) => link.href === siteUrl + counterpart,
      ),
      'Missing language counterpart: ' + route,
    )
  }
  for (const element of document.querySelectorAll(
    'a[href], script[src], link[href], img[src]',
  )) {
    const link = element.getAttribute('href') || element.getAttribute('src')
    if (!link || /^(mailto:|data:|tel:)/.test(link)) continue
    const url = new URL(link, origin + base + route)
    if (url.origin !== origin) continue
    assert(
      url.pathname.startsWith(base),
      'Link outside deployment base: ' + link,
    )
    let target = path.join(
      'dist',
      decodeURIComponent(url.pathname.slice(base.length)),
    )
    assert(existsSync(target), 'Missing link target: ' + link)
    if (statSync(target).isDirectory()) target = path.join(target, 'index.html')
    assert(existsSync(target), 'Missing page: ' + link)
    checkedLinks++
    if (url.hash && target.endsWith('.html')) {
      const targetDocument = await documentAt(target)
      assert(
        targetDocument.getElementById(decodeURIComponent(url.hash.slice(1))),
        'Missing anchor ' + link + ' from ' + route,
      )
      checkedAnchors++
    }
  }
}
const sentry = await readFile('dist/en/projects/sentry/index.html', 'utf8')
assert(sentry.includes('Data integrity · not agent success'))
const cifar = await readFile('dist/en/projects/cifar-10/index.html', 'utf8')
assert(cifar.includes('Validation accuracy') && cifar.includes('72.08%'))
assert(cifar.includes('Test accuracy') && cifar.includes('71.34%'))
assert(existsSync('dist/404.html') && existsSync('dist/og-image.png'))
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
)
assert.deepEqual(
  locations,
  siteUrl
    ? pages()
        .filter(Boolean)
        .map((route) => siteUrl + route)
    : [],
)
console.log(
  'Verified ' +
    pages().length +
    ' pages, ' +
    checkedLinks +
    ' local links and ' +
    checkedAnchors +
    ' anchors; evidence, bilingual metadata and sitemap passed (base ' +
    base +
    ').',
)
