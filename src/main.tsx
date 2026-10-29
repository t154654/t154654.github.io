import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { basePath, getPreference, href, readRoute } from './lib/site'
import './styles.css'

const path = window.location.pathname
if (
  (path === basePath || path === basePath.slice(0, -1)) &&
  getPreference('portfolio-language') === 'zh'
) {
  window.location.replace(
    href('zh/') + window.location.search + window.location.hash,
  )
} else {
  document.documentElement.lang =
    readRoute(path).locale === 'zh' ? 'zh-CN' : 'en'
  const root = document.getElementById('root')!
  const app = (
    <StrictMode>
      <App path={path} />
    </StrictMode>
  )
  // Static hosts can serve 404.html at any URL; only hydrate matching markup.
  if (root.children.length && root.dataset.renderedPath === path)
    hydrateRoot(root, app)
  else createRoot(root).render(app)
}
