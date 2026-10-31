import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { App } from '../App'
import { articles } from '../data/writing'
import { ui } from '../data/ui'
import { markdownDetails } from '../lib/markdown'
import { MarkdownContent } from '../components/MarkdownContent'

describe('searchable bilingual notes', () => {
  it('combines filters with search and recovers from an empty result', async () => {
    const user = userEvent.setup()
    render(<App path="/en/" />)
    const region = within(document.getElementById('writing')!)
    const query = region.getByRole('searchbox', { name: ui.en.searchNotes })
    await user.click(region.getByRole('button', { name: 'Ablation Studies' }))
    expect(
      region.getByRole('heading', { name: articles[2].title.en }),
    ).toBeInTheDocument()
    expect(
      region.queryByRole('heading', { name: articles[0].title.en }),
    ).not.toBeInTheDocument()
    await user.type(query, 'unknown topic')
    expect(region.getByText(ui.en.noNotes)).toBeInTheDocument()
    await user.click(region.getByRole('button', { name: ui.en.resetFilters }))
    expect(query).toHaveValue('')
    expect(
      region.getByRole('heading', { name: articles[0].title.en }),
    ).toBeInTheDocument()
  })

  it('finds a Chinese note using an English technical keyword', async () => {
    const user = userEvent.setup()
    render(<App path="/zh/" />)
    const region = within(document.getElementById('writing')!)
    await user.type(
      region.getByRole('searchbox', { name: ui.zh.searchNotes }),
      'CIFAR',
    )
    expect(
      region.getByRole('heading', { name: articles[2].title.zh }),
    ).toBeInTheDocument()
    expect(
      region.queryByRole('heading', { name: articles[1].title.zh }),
    ).not.toBeInTheDocument()
  })
})

describe('article navigation and Markdown', () => {
  it('matches nested, duplicate and Setext headings while excluding code fences', () => {
    const content =
      '## Scope\n\n### **证据** and `logs`\n\n## Scope\n\n```md\n## Not a heading\n```\n\nSetext heading\n---\n\n## ~~Old~~ approach'
    const details = markdownDetails(content, 'en')
    render(<MarkdownContent content={content} locale="en" />)
    expect(details.headings).toHaveLength(5)
    expect(new Set(details.headings.map((heading) => heading.id)).size).toBe(5)
    for (const heading of details.headings)
      expect(document.getElementById(heading.id)).toHaveTextContent(
        heading.title,
      )
    expect(details.headings.map((heading) => heading.title)).not.toContain(
      'Not a heading',
    )
    expect(markdownDetails('很短的笔记。', 'zh').readingTime).toBe(
      '约 1 分钟阅读',
    )
  })

  it('connects every table of contents entry to a rendered section', () => {
    render(<App path="/zh/writing/cnn-ablation-notes/" />)
    const toc = screen.getByRole('navigation', { name: ui.zh.onThisPage })
    for (const link of within(toc).getAllByRole('link'))
      expect(
        document.getElementById(link.getAttribute('href')!.slice(1)),
      ).not.toBeNull()
    expect(
      screen.getByRole('heading', { name: ui.zh.relatedProjects }),
    ).toBeInTheDocument()
  })

  it('copies actual code text and reports a clipboard failure', async () => {
    const user = userEvent.setup()
    const write = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined)
    render(
      <MarkdownContent content={'```json\n{"seed": null}\n```'} locale="en" />,
    )
    await user.click(screen.getByRole('button', { name: ui.en.copyCode }))
    expect(write).toHaveBeenCalledWith('{"seed": null}\n')
    expect(
      screen.getByRole('button', { name: ui.en.copied }),
    ).toBeInTheDocument()
    write.mockRejectedValueOnce(new Error('permission denied'))
    await user.click(screen.getByRole('button', { name: ui.en.copied }))
    expect(screen.getByRole('status')).toHaveTextContent(ui.en.copyFailed)
  })

  it('does not execute raw HTML or expose executable Markdown URLs', () => {
    const { container } = render(
      <MarkdownContent
        content={
          '<script>window.evil = true</script>\n\n[unsafe](javascript:alert(1))'
        }
        locale="en"
      />,
    )
    expect(container.querySelector('script')).toBeNull()
    expect(container.querySelector('a[href^="javascript:"]')).toBeNull()
  })

  it('separates planned project work from results and links related notes', () => {
    render(<App path="/en/projects/restart/" />)
    expect(document.getElementById('next-steps')).toHaveTextContent(
      ui.en.nextStepsIntro,
    )
    const toc = screen.getByRole('navigation', { name: ui.en.onThisPage })
    expect(
      within(toc).getByRole('link', { name: ui.en.results }),
    ).toHaveAttribute('href', '#results')
    expect(
      screen.getByRole('link', { name: articles[1].title.en }),
    ).toHaveAttribute('href', '/en/writing/reproducible-search/')
  })
})
