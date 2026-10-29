import type { Locale } from '../data/types'

export const basePath = import.meta.env.BASE_URL
export function href(path = ''): string {
  return `${basePath}${path.replace(/^\//, '')}`
}
export function readRoute(pathname: string) {
  const path = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname.replace(/^\//, '')
  const parts = path.split('/').filter(Boolean)
  const locale: Locale = parts[0] === 'zh' ? 'zh' : 'en'
  const validLocale =
    parts.length === 0 || parts[0] === 'en' || parts[0] === 'zh'
  return {
    locale,
    kind: parts[1],
    slug: parts[2],
    valid: validLocale && parts.length <= 3,
  }
}
export function languageHref(pathname: string, locale: Locale) {
  const path = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname.replace(/^\//, '')
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === 'en' || parts[0] === 'zh') parts.shift()
  return href(`${locale}/${parts.length ? `${parts.join('/')}/` : ''}`)
}
export function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* Browsing stays functional without storage. */
  }
}
export function getPreference(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}
