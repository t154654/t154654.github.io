import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Article, Locale, Project } from '../data/types'
import { ui } from '../data/ui'
import { href } from '../lib/site'
import { tagLabel } from '../lib/tags'
import { ResearchVisual } from '../components/ResearchVisual'

export function ProjectDetail({
  project,
  locale,
}: {
  project: Project
  locale: Locale
}) {
  const t = ui[locale]
  const sections = [
    { title: t.methods, items: project.methods[locale] },
    { title: t.results, items: project.results[locale] },
    { title: t.evidence, items: project.evidence[locale] },
    { title: t.limitations, items: project.limitations[locale] },
  ]
  return (
    <article className="container detail-page">
      <a
        className="text-link back-link"
        href={`${href(`${locale}/`)}#projects`}
      >
        <ArrowLeft size={16} />
        {t.backProjects}
      </a>
      <div className="detail-heading">
        <p className="eyebrow">
          {t[project.category]} / {t.projectNotes}
        </p>
        <h1>{project.title[locale]}</h1>
        <p className="detail-subtitle">{project.subtitle[locale]}</p>
        <span
          className={`status ${project.category === 'research' ? 'ongoing' : ''}`}
        >
          {project.status[locale]}
        </span>
      </div>
      <div className="detail-visual">
        <ResearchVisual kind={project.visual} locale={locale} />
      </div>
      <div className="detail-layout">
        <div className="detail-content">
          <section>
            <h2>{t.overview}</h2>
            <p>{project.description[locale]}</p>
            {project.metrics && (
              <div className="detail-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label.en}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label[locale]}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="detail-sidebar">
          <h2>{t.technologies}</h2>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tagLabel(tag, locale)}</span>
            ))}
          </div>
          {project.github && (
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.url && (
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {t.detail}
              <ArrowUpRight size={14} />
            </a>
          )}
          <p className="sidebar-note">{project.limitations[locale][0]}</p>
        </aside>
      </div>
      <a
        className="text-link back-link"
        href={`${href(`${locale}/`)}#projects`}
      >
        <ArrowLeft size={16} />
        {t.backProjects}
      </a>
    </article>
  )
}

export function ArticleDetail({
  article,
  locale,
}: {
  article: Article
  locale: Locale
}) {
  const t = ui[locale]
  return (
    <article className="container article-page">
      <a className="text-link back-link" href={`${href(`${locale}/`)}#writing`}>
        <ArrowLeft size={16} />
        {t.backWriting}
      </a>
      <header className="article-heading">
        <p className="eyebrow">{t.note}</p>
        <h1>{article.title[locale]}</h1>
        <p>{article.description[locale]}</p>
        <div className="tags">
          {article.tags.map((tag) => (
            <span key={tag}>{tagLabel(tag, locale)}</span>
          ))}
        </div>
      </header>
      <p className="article-disclosure">{t.writingDisclosure}</p>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content[locale]}
        </ReactMarkdown>
      </div>
      <a className="text-link back-link" href={`${href(`${locale}/`)}#writing`}>
        <ArrowLeft size={16} />
        {t.backWriting}
      </a>
    </article>
  )
}

export function NotFound({ locale }: { locale: Locale }) {
  const t = ui[locale]
  return (
    <section className="container not-found">
      <p className="eyebrow">404</p>
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundBody}</p>
      <a className="primary-button" href={href(`${locale}/`)}>
        {t.home}
        <ArrowLeft size={16} />
      </a>
    </section>
  )
}
