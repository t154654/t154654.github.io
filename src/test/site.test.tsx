import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from '../App'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { articles } from '../data/writing'
import { ui } from '../data/ui'
import { href } from '../lib/site'

describe('portfolio navigation and preferences', () => {
  it('renders the English home at the default route', () => {
    render(<App path="/" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ui.en.heroA,
    )
    expect(
      screen.getByRole('heading', { name: ui.en.projectsTitle }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: ui.en.language })).toHaveAttribute(
      'href',
      href('zh/'),
    )
  })

  it('preserves a project slug when switching languages and saves the preference', async () => {
    const user = userEvent.setup()
    render(<App path="/en/projects/sentry/" />)
    const languageLink = screen.getByRole('link', { name: ui.en.language })
    expect(languageLink).toHaveAttribute('href', href('zh/projects/sentry/'))
    // Prevent jsdom navigation while allowing React's real preference handler to run.
    languageLink.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    })
    await user.click(languageLink)
    expect(localStorage.getItem('portfolio-language')).toBe('zh')
  })

  it('toggles the color theme and persists both choices', async () => {
    const user = userEvent.setup()
    render(<App path="/en/" />)
    const toggle = screen.getByRole('button', { name: 'Toggle color theme' })
    await user.click(toggle)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
    await user.click(toggle)
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })

  it('filters the primary projects while retaining the separate side project', async () => {
    const user = userEvent.setup()
    render(<App path="/en/" />)
    const filters = screen.getByRole('group', { name: 'Filter projects' })
    const projectTitle = (slug: string) =>
      projects.find((project) => project.slug === slug)!.title.en
    const heading = (slug: string) =>
      screen.queryByRole('heading', { name: projectTitle(slug) })

    expect(heading('restart')).toBeInTheDocument()
    expect(heading('cifar-10')).toBeInTheDocument()
    await user.click(within(filters).getByRole('button', { name: /^Research/ }))
    expect(heading('restart')).toBeInTheDocument()
    expect(heading('sentry')).toBeInTheDocument()
    expect(heading('cifar-10')).not.toBeInTheDocument()
    expect(heading('miku-mod')).toBeInTheDocument()

    const machineLearning = within(filters).getByRole('button', {
      name: /^Machine learning/,
    })
    await user.click(machineLearning)
    expect(machineLearning).toHaveAttribute('aria-pressed', 'true')
    expect(heading('cifar-10')).toBeInTheDocument()
    expect(heading('restart')).not.toBeInTheDocument()
    expect(heading('sentry')).not.toBeInTheDocument()
    expect(heading('miku-mod')).toBeInTheDocument()

    await user.click(within(filters).getByRole('button', { name: /^All work/ }))
    expect(heading('restart')).toBeInTheDocument()
    expect(heading('cifar-10')).toBeInTheDocument()
  })

  it('provides a recovery link for an unknown route', () => {
    render(<App path="/en/projects/does-not-exist/" />)
    expect(
      screen.getByRole('heading', { name: ui.en.notFoundTitle }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: ui.en.home })).toHaveAttribute(
      'href',
      href('en/'),
    )
  })
})

describe('evidence boundaries and content rendering', () => {
  it('labels the Sentry task count as data integrity rather than agent success', () => {
    render(<App path="/en/projects/sentry/" />)
    const main = screen.getByRole('main')
    expect(main).toHaveTextContent('147/147')
    expect(main).toHaveTextContent('Data integrity · not agent success')
    expect(main).toHaveTextContent('not 147 tasks solved by an agent')
    expect(main).toHaveTextContent('no agent success rate is reported')
  })

  it('keeps validation and test metrics separately labeled in the CIFAR detail', () => {
    render(<App path="/en/projects/cifar-10/" />)
    const main = screen.getByRole('main')
    expect(main).toHaveTextContent('Validation accuracy')
    expect(main).toHaveTextContent('72.08%')
    expect(main).toHaveTextContent('Test accuracy')
    expect(main).toHaveTextContent('71.34%')
    expect(main).toHaveTextContent(
      '72.08% validation accuracy and 71.34% test accuracy',
    )
  })

  it('hides unknown personal details and their links', () => {
    const previous = {
      name: profile.name,
      email: profile.email,
      github: profile.github,
      cv: profile.cv,
    }
    Object.assign(profile, { name: null, email: null, github: null, cv: null })
    try {
      const { container } = render(<App path="/en/" />)
      expect(
        container.querySelector('a[href^="mailto:"]'),
      ).not.toBeInTheDocument()
      expect(
        container.querySelector('a[href*="github.com"]'),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('link', { name: /Curriculum vitae|Resume|GitHub/i }),
      ).not.toBeInTheDocument()
      expect(container).not.toHaveTextContent(
        /Your Name|your@email|example@example|TODO|待填写/i,
      )
    } finally {
      Object.assign(profile, previous)
    }
  })

  it('renders the Chinese Markdown article including its table and evidence labels', () => {
    const article = articles[0]
    render(<App path={`/zh/writing/${article.slug}/`} />)
    expect(
      screen.getByRole('heading', { level: 1, name: article.title.zh }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '数据就绪是前置条件' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: '检查' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('验证集准确率 72.08%')
    expect(screen.getByRole('main')).toHaveTextContent('测试集准确率 71.34%')
    expect(screen.getByRole('link', { name: ui.zh.language })).toHaveAttribute(
      'href',
      href(`en/writing/${article.slug}/`),
    )
  })
})
