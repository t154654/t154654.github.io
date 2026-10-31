import { ArrowLeft, ArrowUpRight, Clock3, Github } from 'lucide-react'
import type { Article, Locale, Project } from '../data/types'
import { ui } from '../data/ui'
import { href } from '../lib/site'
import { tagLabel } from '../lib/tags'
import { ResearchVisual } from '../components/ResearchVisual'
import { MarkdownContent } from '../components/MarkdownContent'
import { articles } from '../data/writing'
import { projects } from '../data/projects'
import { markdownDetails } from '../lib/markdown'

export function ProjectDetail({
  project,
  locale,
}: {
  project: Project
  locale: Locale
}) {
  const t = ui[locale]
  const sections = [
    { id: 'methods', title: t.methods, items: project.methods[locale] },
    { id: 'results', title: t.results, items: project.results[locale] },
    { id: 'evidence', title: t.evidence, items: project.evidence[locale] },
    {
      id: 'limitations',
      title: t.limitations,
      items: project.limitations[locale],
    },
    { id: 'next-steps', title: t.nextSteps, items: project.nextSteps[locale] },
  ]
  const related = articles.filter((article) =>
    project.relatedArticles.includes(article.slug),
  )
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
      <div className="project-question">
        <p className="eyebrow">{t.question}</p>
        <p>{project.question[locale]}</p>
      </div>
      <div className="detail-visual">
        <ResearchVisual kind={project.visual} locale={locale} />
      </div>
      <div className="detail-layout">
        <div className="detail-content">
          <section id="overview">
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
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.id === 'next-steps' && (
                <p className="planned-work-note">{t.nextStepsIntro}</p>
              )}
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="detail-sidebar">
          <nav className="contents-nav" aria-label={t.onThisPage}>
            <h2>{t.onThisPage}</h2>
            <ol>
              <li>
                <a href="#overview">{t.overview}</a>
              </li>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
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
          {related.length > 0 && (
            <div className="sidebar-related">
              <h2>{t.relatedNotes}</h2>
              {related.map((article) => (
                <a
                  key={article.slug}
                  href={href(`${locale}/writing/${article.slug}/`)}
                >
                  {article.title[locale]}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
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
  const details = markdownDetails(article.content[locale], locale)
  const relatedProjects = projects.filter((project) =>
    article.projectSlugs.includes(project.slug),
  )
  const relatedNotes = articles.filter(
    (item) =>
      item.slug !== article.slug &&
      item.projectSlugs.some((slug) => article.projectSlugs.includes(slug)),
  )
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
        <p className="reading-time">
          <Clock3 size={14} aria-hidden="true" />
          {details.readingTime}
        </p>
      </header>
      <div className="article-layout">
        {details.headings.length > 0 && (
          <aside className="article-toc">
            <nav className="contents-nav" aria-label={t.onThisPage}>
              <h2>{t.onThisPage}</h2>
              <ol>
                {details.headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={heading.depth === 3 ? 'nested' : ''}
                  >
                    <a href={`#${heading.id}`}>{heading.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
        <div className="article-body">
          <p className="article-disclosure">{t.writingDisclosure}</p>
          <MarkdownContent content={article.content[locale]} locale={locale} />
          {relatedProjects.length > 0 && (
            <section
              className="article-related"
              aria-labelledby="related-projects-title"
            >
              <h2 id="related-projects-title">{t.relatedProjects}</h2>
              <div>
                {relatedProjects.map((project) => (
                  <a
                    key={project.slug}
                    className="related-project-link"
                    href={href(`${locale}/projects/${project.slug}/`)}
                  >
                    <span>
                      <small>{t[project.category]}</small>
                      <strong>{project.title[locale]}</strong>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}
          {relatedNotes.length > 0 && (
            <section
              className="article-related"
              aria-labelledby="continue-reading-title"
            >
              <h2 id="continue-reading-title">{t.continueReading}</h2>
              {relatedNotes.map((item) => (
                <a
                  className="related-note-link"
                  key={item.slug}
                  href={href(`${locale}/writing/${item.slug}/`)}
                >
                  {item.title[locale]}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </section>
          )}
        </div>
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
