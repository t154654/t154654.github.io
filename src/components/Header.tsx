import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import type { Locale } from '../data/types'
import { ui } from '../data/ui'
import { profile } from '../data/profile'
import { href, languageHref, savePreference } from '../lib/site'

export function Header({
  locale,
  path,
  isHome,
}: {
  locale: Locale
  path: string
  isHome: boolean
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)
  const t = ui[locale]
  const ids = ['about', 'research', 'projects', 'writing']
  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
    // Section IDs are a stable navigation contract.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome])
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  function toggleTheme() {
    const dark = document.documentElement.dataset.theme !== 'dark'
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    savePreference('portfolio-theme', dark ? 'dark' : 'light')
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href={href(`${locale}/`)}
          aria-label={profile.name?.[locale] || t.brand}
        >
          <span className="brand-mark" aria-hidden="true">
            a<span>.</span>
          </span>
          <span>{profile.name?.[locale] || t.brand}</span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={locale === 'en' ? 'Main navigation' : '主导航'}
        >
          {ids.map((id, index) => (
            <a
              key={id}
              className={active === id ? 'active' : ''}
              href={`${isHome ? '' : href(`${locale}/`)}#${id}`}
            >
              {t.nav[index]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language-toggle"
            href={languageHref(path, locale === 'en' ? 'zh' : 'en')}
            lang={locale === 'en' ? 'zh' : 'en'}
            aria-label={t.language}
            onClick={() =>
              savePreference(
                'portfolio-language',
                locale === 'en' ? 'zh' : 'en',
              )
            }
          >
            <span className={locale === 'en' ? 'selected' : ''}>EN</span>
            <span className="language-divider">/</span>
            <span className={locale === 'zh' ? 'selected' : ''}>中</span>
          </a>
          <button
            type="button"
            className="icon-button theme-toggle"
            aria-label={t.theme}
            onClick={toggleTheme}
          >
            <Moon className="moon-icon" size={17} />
            <Sun className="sun-icon" size={17} />
          </button>
          {profile.github && (
            <a
              className="header-github"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
          )}
          <button
            ref={menuButton}
            type="button"
            className="icon-button mobile-menu-button"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label={locale === 'en' ? 'Mobile navigation' : '移动导航'}
        >
          {ids.map((id, index) => (
            <a
              key={id}
              href={`${isHome ? '' : href(`${locale}/`)}#${id}`}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {t.nav[index]}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
