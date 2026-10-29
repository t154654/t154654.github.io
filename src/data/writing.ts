import evaluationEn from '../content/evaluation-boundaries.en.md?raw'
import evaluationZh from '../content/evaluation-boundaries.zh.md?raw'
import reproducibilityEn from '../content/reproducible-search.en.md?raw'
import reproducibilityZh from '../content/reproducible-search.zh.md?raw'
import type { Article } from './types'

/** Methodological notes, not publication records or claims of new findings. */
export const articles: Article[] = [
  {
    slug: 'evaluation-boundaries',
    title: {
      en: 'What does an evaluation number actually measure?',
      zh: '一个评估数字究竟衡量了什么？',
    },
    description: {
      en: 'A methodological note on data integrity, agent success, and the boundary between validation and test results.',
      zh: '关于数据完整性、智能体成功率，以及验证集与测试集指标边界的方法笔记。',
    },
    tags: ['Evaluation', 'Research Notes'],
    content: { en: evaluationEn, zh: evaluationZh },
  },
  {
    slug: 'reproducible-search',
    title: {
      en: 'Keeping a search experiment inspectable',
      zh: '让搜索实验能够被检查',
    },
    description: {
      en: 'A practical checklist for candidate equations, search traces, and reproducibility in symbolic regression.',
      zh: '围绕符号回归中的候选公式、搜索轨迹与可复现性，整理实验记录清单。',
    },
    tags: ['Symbolic Regression', 'Reproducibility'],
    content: { en: reproducibilityEn, zh: reproducibilityZh },
  },
]
