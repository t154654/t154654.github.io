import { Children, isValidElement, useState, type ReactNode } from 'react'
import { Check, Copy, Link as LinkIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Locale } from '../data/types'
import { ui } from '../data/ui'
import { remarkHeadingIds } from '../lib/markdown'

function CodeBlock({
  children,
  locale,
}: {
  children: ReactNode
  locale: Locale
}) {
  const t = ui[locale]
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const code = Children.toArray(children)
    .map((child) =>
      isValidElement<{ children?: string }>(child)
        ? child.props.children || ''
        : String(child),
    )
    .join('')
  const codeElement = Children.toArray(children).find((child) =>
    isValidElement(child),
  )
  const language = isValidElement<{ className?: string }>(codeElement)
    ? codeElement.props.className?.replace('language-', '')
    : undefined
  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{language || 'text'}</span>
        <button type="button" onClick={() => void copy()}>
          {status === 'copied' ? <Check size={14} /> : <Copy size={14} />}
          {status === 'copied' ? t.copied : t.copyCode}
        </button>
      </div>
      <pre>{children}</pre>
      <span
        className={status === 'error' ? 'copy-error' : 'sr-only'}
        role="status"
      >
        {status === 'copied'
          ? t.copied
          : status === 'error'
            ? t.copyFailed
            : ''}
      </span>
    </div>
  )
}

export function MarkdownContent({
  content,
  locale,
}: {
  content: string
  locale: Locale
}) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkHeadingIds]}
        components={{
          h1: ({ id, children }) => <h2 id={id}>{children}</h2>,
          h2: ({ id, children }) => (
            <h2 id={id}>
              <a className="section-anchor" href={`#${id}`}>
                {children}
                <LinkIcon size={15} aria-hidden="true" />
              </a>
            </h2>
          ),
          h3: ({ id, children }) => (
            <h3 id={id}>
              <a className="section-anchor" href={`#${id}`}>
                {children}
                <LinkIcon size={13} aria-hidden="true" />
              </a>
            </h3>
          ),
          pre: ({ children }) => (
            <CodeBlock locale={locale}>{children}</CodeBlock>
          ),
          table: ({ children }) => (
            <div
              className="table-scroll"
              role="region"
              aria-label={locale === 'en' ? 'Article table' : '文章表格'}
              tabIndex={0}
            >
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
