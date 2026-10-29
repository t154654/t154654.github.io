import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { render, pages } from '../work/ssr/entry-server.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const env = { ...loadEnv('production', root, ''), ...process.env }
const base = env.VITE_BASE_PATH || '/'
if (!base.startsWith('/') || !base.endsWith('/'))
  throw new Error('VITE_BASE_PATH must start and end with /.')
let siteUrl = env.SITE_URL?.trim()
if (siteUrl) {
  const parsed = new URL(siteUrl)
  if (
    !['https:', 'http:'].includes(parsed.protocol) ||
    parsed.search ||
    parsed.hash ||
    parsed.username ||
    parsed.password
  )
    throw new Error(
      'SITE_URL must be an absolute HTTP(S) deployment root without credentials, query or hash.',
    )
  if (parsed.pathname !== base && `${parsed.pathname}/` !== base)
    throw new Error('SITE_URL path must match VITE_BASE_PATH.')
  siteUrl = `${siteUrl.replace(/\/+$/, '')}/`
}
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ],
  )
const template = await readFile(path.join(root, 'dist/index.html'), 'utf8')
const allPages = pages()
function pageHtml(route, noindex = false) {
  const page = render(route)
  const url = siteUrl && `${siteUrl}${route || 'en/'}`
  const other = route.replace(
    /^(en|zh)\//,
    page.locale === 'en' ? 'zh/' : 'en/',
  )
  const metas = [
    `<meta name="description" content="${escape(page.description)}">`,
    `<meta property="og:type" content="${route.includes('/writing/') ? 'article' : 'website'}">`,
    `<meta property="og:title" content="${escape(page.title)}">`,
    `<meta property="og:description" content="${escape(page.description)}">`,
    `<meta property="og:locale" content="${page.locale === 'en' ? 'en_US' : 'zh_CN'}">`,
    `<meta property="og:site_name" content="${page.locale === 'en' ? 'Academic Portfolio' : '学术作品集'}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ]
  if (url && !noindex)
    metas.push(
      `<link rel="canonical" href="${escape(url)}">`,
      `<meta property="og:url" content="${escape(url)}">`,
      `<meta property="og:image" content="${escape(`${siteUrl}og-image.png`)}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<link rel="alternate" hreflang="${page.locale === 'en' ? 'en' : 'zh-CN'}" href="${escape(url)}">`,
      `<link rel="alternate" hreflang="${page.locale === 'en' ? 'zh-CN' : 'en'}" href="${escape(`${siteUrl}${other || 'zh/'}`)}">`,
    )
  if (!siteUrl || noindex)
    metas.push('<meta name="robots" content="noindex, nofollow">')
  return template
    .replace(
      '<html lang="en">',
      `<html lang="${page.locale === 'en' ? 'en' : 'zh-CN'}">`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace('<!--page-meta-->', metas.join('\n    '))
    .replace(
      '<div id="root">',
      `<div id="root" data-rendered-path="${escape(base + route)}">`,
    )
    .replace('<!--app-html-->', page.html)
}
for (const route of allPages) {
  const output = path.join(root, 'dist', route)
  await mkdir(output, { recursive: true })
  await writeFile(path.join(output, 'index.html'), pageHtml(route))
}
await writeFile(
  path.join(root, 'dist/404.html'),
  pageHtml('en/not-found/', true),
)
await writeFile(
  path.join(root, 'dist/robots.txt'),
  siteUrl
    ? `User-agent: *\nAllow: ${base}\nSitemap: ${siteUrl}sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
)
const urls = siteUrl
  ? allPages
      .filter(Boolean)
      .map((route) => `<url><loc>${escape(siteUrl + route)}</loc></url>`)
      .join('\n')
  : ''
await writeFile(
  path.join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(
  `Prerendered ${allPages.length} routes + 404. ${siteUrl ? 'Canonical URLs and sitemap enabled.' : 'SITE_URL unset: noindex enabled; configure before public deployment.'}`,
)
