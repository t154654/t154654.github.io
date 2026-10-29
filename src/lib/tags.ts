import type { Locale } from '../data/types'

const translations: Record<string, string> = {
  'Symbolic Regression': '符号回归',
  Reproducibility: '可复现性',
  'LLM Agent': '大模型智能体',
  'Tool Use': '工具使用',
  'Ablation Studies': '消融实验',
  'Game Scripting': '游戏脚本',
  Localization: '本地化',
  Compatibility: '版本兼容',
  Evaluation: '评估方法',
  'Research Notes': '研究笔记',
}
export function tagLabel(tag: string, locale: Locale) {
  return locale === 'zh' ? translations[tag] || tag : tag
}
