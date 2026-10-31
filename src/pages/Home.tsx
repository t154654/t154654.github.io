import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  FileText,
  FlaskConical,
  Github,
  Mail,
  Network,
  Sparkle,
} from 'lucide-react'
import type { Locale } from '../data/types'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { ui } from '../data/ui'
import { ResearchVisual } from '../components/ResearchVisual'
import { ProjectCard } from '../components/ProjectCard'
import { WritingList } from '../components/WritingList'

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  )
}

export function Home({ locale }: { locale: Locale }) {
  const t = ui[locale]
  const [filter, setFilter] = useState(0)
  const selected = projects.filter(
    (project) =>
      project.category !== 'side' &&
      (filter === 0 ||
        project.category === (filter === 1 ? 'research' : 'learning')),
  )
  const sideProjects = projects.filter((project) => project.category === 'side')
  const counts = [
    projects.filter((p) => p.category !== 'side').length,
    projects.filter((p) => p.category === 'research').length,
    projects.filter((p) => p.category === 'learning').length,
  ]
  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-square" />
            {t.eyebrow}
          </p>
          {profile.name && <p className="hero-name">{profile.name[locale]}</p>}
          <p className="hero-role">{profile.role[locale]}</p>
          <h1 id="hero-title">
            {t.heroA}
            <br />
            <em>{t.heroB}</em>
          </h1>
          <p className="hero-description">{profile.bio[locale]}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              {t.viewWork}
              <ArrowDown size={16} />
            </a>
            {profile.cv ? (
              <a className="text-link" href={profile.cv}>
                {t.cv}
                <FileText size={16} />
              </a>
            ) : (
              <a className="text-link" href="#about">
                {t.aboutMe}
                <ArrowUpRight size={16} />
              </a>
            )}
            {profile.github && (
              <a
                className="icon-button"
                href={profile.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={20} />
              </a>
            )}
          </div>
          <div className="hero-interests">
            <span>{t.focusLabel}</span>
            <div>
              {profile.interests[locale].map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-notebook">
          <div className="notebook-header">
            <span>
              <span className="notebook-dot" />
              {t.notebook}
            </span>
            <span>{locale === 'en' ? 'LLM × SCIENCE' : 'LLM × 科学'}</span>
          </div>
          <div className="notebook-title">
            {t.notebookTitle}
            <Braces size={18} />
          </div>
          <ResearchVisual kind="equation" locale={locale} />
          <div className="notebook-tags">
            {t.notebookTags.map((tag, index) => (
              <span key={tag}>
                <span>0{index + 1}</span>
                {tag}
              </span>
            ))}
          </div>
          <div className="notebook-caption">
            <span>{t.notebookCaption}</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            {locale === 'en' ? (
              <>
                LLMs <span>/</span> Agents <span>/</span> Symbolic Regression{' '}
                <span>/</span> Machine Learning
              </>
            ) : (
              <>
                大语言模型 <span>/</span> 智能体 <span>/</span> 符号回归{' '}
                <span>/</span> 机器学习
              </>
            )}
          </span>
          <a href="#about" aria-label={t.aboutMe}>
            <ArrowDown size={16} />
          </a>
        </div>
      </section>

      <section id="about" className="about-section container section-block">
        <div>
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div className="about-main">
          <h3>{t.aboutLead}</h3>
          {profile.about[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {profile.university && <p>{profile.university[locale]}</p>}
          {profile.location && <p>{profile.location[locale]}</p>}
        </div>
        <aside className="about-aside">
          <Sparkle size={19} />
          <h3>{t.aboutAside}</h3>
          <p>{t.aboutAsideBody}</p>
        </aside>
      </section>

      <section id="research" className="research-section section-block">
        <div className="container">
          <SectionHeading
            eyebrow={t.researchEyebrow}
            title={t.researchTitle}
            intro={t.researchIntro}
          />
          <div className="research-topics">
            {t.researchTopics.map((topic, i) => (
              <article key={topic.title} className="research-topic">
                <div className="topic-icon">
                  {i === 0 ? (
                    <FlaskConical size={23} strokeWidth={1.5} />
                  ) : (
                    <Network size={23} strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.body}</p>
                  <div className="research-tags">
                    {topic.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="method-strip">
            <p className="eyebrow">{t.methodLabel}</p>
            <ol>
              {t.methodSteps.map((step, i) => (
                <li key={step.title}>
                  <span className="method-number">0{i + 1}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                  {i < 2 && <ArrowRight className="method-arrow" size={18} />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="container section-block projects-section"
      >
        <div className="projects-heading">
          <SectionHeading
            eyebrow={t.projectsEyebrow}
            title={t.projectsTitle}
            intro={t.projectsIntro}
          />
          <div
            className="filter-tabs"
            role="group"
            aria-label={locale === 'en' ? 'Filter projects' : '筛选项目'}
          >
            {t.filters.map((label, i) => (
              <button
                type="button"
                key={label}
                aria-pressed={filter === i}
                className={filter === i ? 'selected' : ''}
                onClick={() => setFilter(i)}
              >
                {label}
                <span>{counts[i]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="project-grid" aria-live="polite">
          {selected.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              featured={filter !== 2 && i === 0}
            />
          ))}
        </div>
        {sideProjects.map((side) => (
          <div className="side-project" key={side.slug}>
            <div className="side-project-intro">
              <p className="eyebrow">{t.sideLabel}</p>
              <h3>{t.sideTitle}</h3>
              <p>{t.sideDescription}</p>
            </div>
            <ProjectCard project={side} locale={locale} />
          </div>
        ))}
      </section>

      <section id="skills" className="skills-section section-block">
        <div className="container">
          <SectionHeading eyebrow={t.skillsEyebrow} title={t.skillsTitle} />
          <div className="skills-grid">
            {t.skillsGroups.map((group, i) => (
              <div key={group.title}>
                <span className="skill-index">0{i + 1}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.values.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="writing" className="container section-block writing-section">
        <SectionHeading
          eyebrow={t.writingEyebrow}
          title={t.writingTitle}
          intro={t.writingIntro}
        />
        <WritingList locale={locale} />
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-inner">
          <div>
            <p className="eyebrow">{t.contactEyebrow}</p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
          </div>
          <div className="contact-links">
            {profile.email && (
              <a className="primary-button" href={`mailto:${profile.email}`}>
                <Mail size={17} />
                {t.email}
                <ArrowUpRight size={16} />
              </a>
            )}
            {profile.github && (
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                GitHub
                <ArrowUpRight size={16} />
              </a>
            )}
            {profile.cv && (
              <a className="text-link" href={profile.cv}>
                <FileText size={18} />
                {t.cv}
                <ArrowUpRight size={16} />
              </a>
            )}
            <a className="contact-explore" href="#projects">
              {t.viewWork}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
