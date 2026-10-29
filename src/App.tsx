import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ArticleDetail, NotFound, ProjectDetail } from './pages/Details'
import { projects } from './data/projects'
import { articles } from './data/writing'
import { ui } from './data/ui'
import { readRoute } from './lib/site'

export function App({ path }: { path: string }) {
  const route = readRoute(path)
  const { locale } = route
  const project = projects.find((item) => item.slug === route.slug)
  const article = articles.find((item) => item.slug === route.slug)
  const isHome = route.valid && !route.kind
  let page = <NotFound locale={locale} />
  if (isHome) page = <Home locale={locale} />
  else if (route.valid && route.kind === 'projects' && project)
    page = <ProjectDetail project={project} locale={locale} />
  else if (route.valid && route.kind === 'writing' && article)
    page = <ArticleDetail article={article} locale={locale} />
  return (
    <>
      <a className="skip-link" href="#main">
        {ui[locale].skip}
      </a>
      <div id="top" />
      <Header locale={locale} path={path} isHome={isHome} />
      <main id="main" tabIndex={-1}>
        {page}
      </main>
      <Footer locale={locale} />
    </>
  )
}
