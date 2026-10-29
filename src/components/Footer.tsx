import { ArrowUp } from 'lucide-react'
import type { Locale } from '../data/types'
import { ui } from '../data/ui'
import { href } from '../lib/site'
export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale]
  return (
    <footer className="site-footer container">
      <a className="footer-brand" href={href(`${locale}/`)}>
        {t.brand}
        <span>
          {' '}
          / {locale === 'en' ? 'Research & engineering' : '研究与工程'}
        </span>
      </a>
      <p>{t.footer}</p>
      <a className="back-top" href="#top">
        {t.backTop}
        <ArrowUp size={14} />
      </a>
    </footer>
  )
}
