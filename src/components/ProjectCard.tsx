import { ArrowUpRight } from 'lucide-react'
import type { Locale, Project } from '../data/types'
import { ui } from '../data/ui'
import { href } from '../lib/site'
import { tagLabel } from '../lib/tags'
import { ResearchVisual } from './ResearchVisual'

export function ProjectCard({
  project,
  locale,
  featured = false,
}: {
  project: Project
  locale: Locale
  featured?: boolean
}) {
  const t = ui[locale]
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <a
        className="project-visual-link"
        href={href(`${locale}/projects/${project.slug}/`)}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ResearchVisual kind={project.visual} locale={locale} />
      </a>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{t[project.category]}</span>
          <span
            className={`status ${project.category === 'research' ? 'ongoing' : ''}`}
          >
            {project.status[locale]}
          </span>
        </div>
        <h3>
          <a href={href(`${locale}/projects/${project.slug}/`)}>
            {project.title[locale]}
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </h3>
        <p className="project-subtitle">{project.subtitle[locale]}</p>
        <p className="project-description">{project.description[locale]}</p>
        {project.metrics && (
          <div className="card-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label.en}>
                <strong>{metric.value}</strong>
                <span>{metric.label[locale]}</span>
              </div>
            ))}
          </div>
        )}
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tagLabel(tag, locale)}</span>
          ))}
        </div>
        <a
          className="text-link project-more"
          href={href(`${locale}/projects/${project.slug}/`)}
        >
          {t.detail}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
