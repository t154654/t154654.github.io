import evaluationEn from '../content/evaluation-boundaries.en.md?raw'
import evaluationZh from '../content/evaluation-boundaries.zh.md?raw'
import reproducibilityEn from '../content/reproducible-search.en.md?raw'
import reproducibilityZh from '../content/reproducible-search.zh.md?raw'
import ablationEn from '../content/cnn-ablation-notes.en.md?raw'
import ablationZh from '../content/cnn-ablation-notes.zh.md?raw'
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
    projectSlugs: ['sentry', 'cifar-10'],
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
    projectSlugs: ['restart'],
    content: { en: reproducibilityEn, zh: reproducibilityZh },
  },
  {
    slug: 'cnn-ablation-notes',
    title: {
      en: 'Making a CNN ablation experiment interpretable',
      zh: '让 CNN 消融实验能够被解释',
    },
    description: {
      en: 'How to document model comparisons on CIFAR-10, separate validation from test results, and keep unreported effects open.',
      zh: '如何记录 CIFAR-10 模型对照，区分验证集与测试集结果，并谨慎解释尚未报告的消融效果。',
    },
    tags: ['Ablation Studies', 'PyTorch'],
    projectSlugs: ['cifar-10'],
    content: { en: ablationEn, zh: ablationZh },
  },
]
