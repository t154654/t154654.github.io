import type { Locale, Project } from '../data/types'
import { ui } from '../data/ui'

export function ResearchVisual({
  kind,
  locale,
}: {
  kind: Project['visual']
  locale: Locale
}) {
  const t = ui[locale]
  if (kind === 'equation')
    return (
      <div
        className="research-visual equation-visual"
        role="img"
        aria-label={t.visualEquation}
      >
        <div className="visual-grid" />
        <span className="equation-small eq-one">f(x) = ?</span>
        <svg className="tree-lines" viewBox="0 0 460 250" aria-hidden="true">
          <path d="M230 44V83M230 83H110V122M230 83H350V122M110 150V178H62V206M110 178H160V206M350 150V178H300V206M350 178H398V206" />
          <circle cx="230" cy="36" r="15" />
          <circle cx="110" cy="137" r="14" />
          <circle cx="350" cy="137" r="14" />
          <circle cx="62" cy="218" r="8" />
          <circle cx="160" cy="218" r="8" />
          <circle cx="300" cy="218" r="8" />
          <circle cx="398" cy="218" r="8" />
        </svg>
        <span className="equation-small eq-two">sin(x) + x²</span>
        <span className="equation-small eq-three">a · eᵇˣ</span>
        <div className="formula-result">
          ŷ = f(x; θ)
          <span>
            {locale === 'en'
              ? 'search → evaluate → refine'
              : '搜索 → 评估 → 改进'}
          </span>
        </div>
        <span className="visual-corner">01 / SR</span>
      </div>
    )
  if (kind === 'agent')
    return (
      <div
        className="research-visual agent-visual"
        role="img"
        aria-label={t.visualAgent}
      >
        <div className="visual-grid" />
        <svg viewBox="0 0 440 240" aria-hidden="true">
          <path
            d="M150 71H293V170H150Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <g fill="var(--surface)" stroke="currentColor">
            <rect x="90" y="48" width="118" height="46" rx="8" />
            <rect x="235" y="48" width="118" height="46" rx="8" />
            <rect x="90" y="147" width="118" height="46" rx="8" />
            <rect x="235" y="147" width="118" height="46" rx="8" />
          </g>
          <g
            fill="currentColor"
            fontSize="12"
            fontFamily="monospace"
            textAnchor="middle"
          >
            <text x="149" y="76">
              {locale === 'en' ? 'observe' : '观察'}
            </text>
            <text x="294" y="76">
              {locale === 'en' ? 'plan' : '规划'}
            </text>
            <text x="294" y="175">
              {locale === 'en' ? 'tool use' : '调用工具'}
            </text>
            <text x="149" y="175">
              {locale === 'en' ? 'inspect' : '检查'}
            </text>
          </g>
          <g fill="currentColor">
            <path d="m222 68 5 3-5 3zM290 117l3 5 3-5zM222 167l-5 3 5 3zM145 122l3-5 3 5z" />
          </g>
        </svg>
        <span className="visual-corner">02 / AGENT</span>
      </div>
    )
  if (kind === 'vision')
    return (
      <div
        className="research-visual vision-visual"
        role="img"
        aria-label={t.visualVision}
      >
        <div className="visual-grid" />
        <svg viewBox="0 0 440 240" aria-hidden="true">
          <defs>
            <pattern
              id="pixels"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <rect width="10" height="10" fill="currentColor" opacity=".18" />
            </pattern>
          </defs>
          <rect
            x="48"
            y="77"
            width="84"
            height="84"
            fill="url(#pixels)"
            stroke="currentColor"
            opacity=".7"
          />
          <path
            d="M145 118h32m-5-4 5 4-5 4M244 118h30m-5-4 5 4-5 4M335 118h23"
            stroke="currentColor"
            fill="none"
          />
          <g stroke="currentColor" fill="var(--surface)">
            <rect x="180" y="73" width="49" height="89" rx="2" />
            <rect x="187" y="79" width="49" height="89" rx="2" />
            <rect x="194" y="85" width="49" height="89" rx="2" />
            <rect x="281" y="87" width="43" height="65" rx="2" />
            <rect x="288" y="94" width="43" height="65" rx="2" />
          </g>
          <g fill="currentColor">
            <rect x="363" y="91" width="30" height="6" rx="2" />
            <rect x="363" y="106" width="21" height="6" rx="2" opacity=".5" />
            <rect x="363" y="121" width="14" height="6" rx="2" opacity=".35" />
            <rect x="363" y="136" width="9" height="6" rx="2" opacity=".2" />
          </g>
          <g
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="middle"
          >
            <text x="90" y="195">
              32 × 32
            </text>
            <text x="213" y="195">
              Conv + BN
            </text>
            <text x="306" y="195">
              {locale === 'en' ? 'Features' : '特征'}
            </text>
          </g>
        </svg>
        <span className="visual-corner">03 / VISION</span>
      </div>
    )
  return (
    <div
      className="research-visual mod-visual"
      role="img"
      aria-label={t.visualMod}
    >
      <div className="visual-grid" />
      <svg viewBox="0 0 440 240" aria-hidden="true">
        <g fill="none" stroke="currentColor">
          <path
            d="M0 90 62 75l25-30 44 10 28 28-10 26-39 11-23 31-45 10L0 143M440 62l-53 21-39-8-33 30 14 32-25 27 39 34 45-16 52 15"
            opacity=".4"
          />
          <path d="M105 145q90-110 227-15" strokeDasharray="4 6" />
          <circle cx="105" cy="145" r="5" />
          <circle cx="332" cy="130" r="5" />
          <path d="M218 86v77m-27-34h54m-27-43-9 43 9 34 9-34z" />
          <circle cx="218" cy="129" r="32" opacity=".3" />
          <path
            d="M0 210q20-10 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0"
            opacity=".3"
          />
        </g>
      </svg>
      <span className="visual-corner">SIDE / EU IV</span>
    </div>
  )
}
