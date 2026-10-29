import { renderToString } from 'react-dom/server'
import { App } from './App'
import { projects } from './data/projects'
import { articles } from './data/writing'
import { profile } from './data/profile'
import { ui } from './data/ui'
import type { Locale } from './data/types'
import { href, readRoute } from './lib/site'

export function pages() {
  return [
    '',
    ...(['en', 'zh'] as const).flatMap((locale) => [
      `${locale}/`,
      ...projects.map((project) => `${locale}/projects/${project.slug}/`),
      ...articles.map((article) => `${locale}/writing/${article.slug}/`),
    ]),
  ]
}
export function render(path: string) {
  const route = readRoute(href(path))
  const locale: Locale = route.locale
  const item =
    route.kind === 'projects'
      ? projects.find((p) => p.slug === route.slug)
      : route.kind === 'writing'
        ? articles.find((a) => a.slug === route.slug)
        : undefined
  const notFound = !route.valid || (Boolean(route.kind) && !item)
  const title = item
    ? `${item.title[locale]} — ${profile.name?.[locale] || ui[locale].brand}`
    : notFound
      ? `${ui[locale].notFoundTitle} — ${ui[locale].brand}`
      : `${profile.name?.[locale] || ui[locale].brand} — ${locale === 'en' ? 'Research & Engineering' : '研究与工程'}`
  const description = notFound
    ? ui[locale].notFoundBody
    : item?.description[locale] || profile.bio[locale]
  return {
    html: renderToString(<App path={href(path)} />),
    title,
    description,
    locale,
  }
}
