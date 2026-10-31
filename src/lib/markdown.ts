import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import type { Root } from 'mdast'
import type { Article, Locale } from '../data/types'
import { tagLabel } from './tags'

interface TextNode {
  type: string
  value?: string
  alt?: string | null
  children?: TextNode[]
}

export interface MarkdownHeading {
  id: string
  title: string
  depth: number
}

function nodeText(node: TextNode): string {
  if (node.type === 'html') return ''
  if (node.type === 'root') return node.children?.map(nodeText).join('\n') || ''
  return node.value ?? node.alt ?? node.children?.map(nodeText).join('') ?? ''
}

function annotateHeadings(tree: Root): MarkdownHeading[] {
  const headings: MarkdownHeading[] = []
  const used = new Set<string>()
  function visit(node: TextNode) {
    if (node.type === 'heading') {
      const heading = node as Root['children'][number] & { depth: number }
      const title = nodeText(node)
      const base = `section-${
        title
          .normalize('NFKC')
          .toLowerCase()
          .replace(/[^\p{L}\p{N}\s_-]/gu, '')
          .trim()
          .replace(/\s+/g, '-') || 'heading'
      }`
      let id = base
      let suffix = 2
      while (used.has(id)) id = `${base}-${suffix++}`
      used.add(id)
      heading.data = { ...heading.data, hProperties: { id } }
      if (heading.depth <= 3) headings.push({ id, title, depth: heading.depth })
    }
    node.children?.forEach(visit)
  }
  visit(tree)
  return headings
}

/** Shared by the table of contents and renderer, so duplicate headings agree. */
export function remarkHeadingIds() {
  return (tree: Root) => {
    annotateHeadings(tree)
  }
}

export function markdownDetails(markdown: string, locale: Locale) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  const text = nodeText(tree)
  const cjk = (
    text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []
  ).length
  const words =
    text
      .replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu, ' ')
      .match(/[\p{L}\p{N}]+/gu)?.length || 0
  const minutes = Math.max(1, Math.ceil(cjk / 400 + words / 200))
  return {
    headings: annotateHeadings(tree),
    readingTime:
      locale === 'en' ? `${minutes} min read` : `约 ${minutes} 分钟阅读`,
  }
}

export function searchArticles(items: Article[], query: string, tag = '') {
  const terms = query
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  return items.filter((article) => {
    if (tag && !article.tags.includes(tag)) return false
    const searchable = [
      article.title.en,
      article.title.zh,
      article.description.en,
      article.description.zh,
      ...article.tags,
      ...article.tags.map((item) => tagLabel(item, 'zh')),
    ]
      .join(' ')
      .normalize('NFKC')
      .toLowerCase()
    return terms.every((term) => searchable.includes(term))
  })
}
