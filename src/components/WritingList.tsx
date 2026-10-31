import { useState } from 'react'
import { ArrowUpRight, Clock3, Search, X } from 'lucide-react'
import type { Locale } from '../data/types'
import { articles } from '../data/writing'
import { ui } from '../data/ui'
import { href } from '../lib/site'
import { tagLabel } from '../lib/tags'
import { markdownDetails, searchArticles } from '../lib/markdown'

export function WritingList({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('')
  const topics = [...new Set(articles.map((article) => article.tags[0]))]
  const visible = searchArticles(articles, query, tag)
  const reset = () => {
    setQuery('')
    setTag('')
  }
  return (
    <>
      <form
        className="writing-search"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <Search size={17} aria-hidden="true" />
        <label className="sr-only" htmlFor="writing-query">
          {t.searchNotes}
        </label>
        <input
          id="writing-query"
          type="search"
          placeholder={t.searchNotes}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            type="button"
            className="icon-button"
            aria-label={t.clearSearch}
            onClick={() => setQuery('')}
          >
            <X size={16} />
          </button>
        )}
      </form>
      <div className="writing-controls">
        <div className="writing-topics" role="group" aria-label={t.filterNotes}>
          {['', ...topics].map((topic) => (
            <button
              type="button"
              key={topic}
              aria-pressed={tag === topic}
              onClick={() => setTag(topic)}
            >
              {topic ? tagLabel(topic, locale) : t.allTopics}
            </button>
          ))}
        </div>
        <p className="writing-count" role="status">
          {t.notesCount.replace('{count}', String(visible.length))}
        </p>
      </div>
      <div className="writing-list">
        {visible.map((article) => (
          <article className="writing-row" key={article.slug}>
            <span className="writing-number">
              {String(articles.indexOf(article) + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="writing-type">
                {t.note}
                <span> / </span>
                {tagLabel(article.tags[0], locale)}
              </p>
              <h3>
                <a href={href(`${locale}/writing/${article.slug}/`)}>
                  {article.title[locale]}
                </a>
              </h3>
              <p>{article.description[locale]}</p>
              <span className="reading-time">
                <Clock3 size={12} aria-hidden="true" />
                {markdownDetails(article.content[locale], locale).readingTime}
              </span>
            </div>
            <a
              className="writing-arrow"
              href={href(`${locale}/writing/${article.slug}/`)}
              aria-label={`${t.read}: ${article.title[locale]}`}
            >
              <ArrowUpRight size={23} />
            </a>
          </article>
        ))}
        {!visible.length && (
          <div className="writing-empty">
            <p>{t.noNotes}</p>
            <button type="button" className="text-link" onClick={reset}>
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
