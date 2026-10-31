export type Locale = 'en' | 'zh'

export type Localized<T = string> = { en: T; zh: T }

export interface Profile {
  name: Localized | null
  role: Localized
  bio: Localized
  about: Localized<string[]>
  interests: Localized<string[]>
  email: string | null
  github: string | null
  cv: string | null
  university: Localized | null
  location: Localized | null
}

export interface Project {
  slug: string
  category: 'research' | 'learning' | 'side'
  title: Localized
  subtitle: Localized
  description: Localized
  question: Localized
  status: Localized
  tags: string[]
  methods: Localized<string[]>
  results: Localized<string[]>
  limitations: Localized<string[]>
  evidence: Localized<string[]>
  nextSteps: Localized<string[]>
  relatedArticles: string[]
  github?: string
  url?: string
  metrics?: { label: Localized; value: string }[]
  visual: 'equation' | 'agent' | 'vision' | 'mod'
}

export interface Article {
  slug: string
  title: Localized
  description: Localized
  tags: string[]
  projectSlugs: string[]
  content: Localized
}
