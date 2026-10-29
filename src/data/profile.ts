import type { Profile } from './types'

/** Add verified personal information here. Null fields are hidden in the UI. */
export const profile: Profile = {
  name: null,
  role: {
    en: 'Computer Science Undergraduate',
    zh: '计算机科学本科生',
  },
  bio: {
    en: 'Exploring how language models search, reason, and act — through symbolic regression, tool-using agents, and reproducible experiments.',
    zh: '通过符号回归、工具调用智能体与可复现实验，探索语言模型如何搜索、推理和行动。',
  },
  about: {
    en: [
      'My work sits at the intersection of machine learning and software engineering. I am exploring language models for scientific equation discovery and agents that interact with software through tools.',
      'I am interested in research internships and graduate study where I can develop stronger experimental methods, reproduce existing systems, and turn research questions into carefully evaluated implementations.',
    ],
    zh: [
      '我的实践结合机器学习与软件工程，正在探索面向科学公式发现的语言模型，以及通过工具与软件环境交互的智能体。',
      '我希望通过科研实习和研究生阶段的学习，进一步训练实验方法，复现已有系统，并将研究问题转化为经过审慎评估的实现。',
    ],
  },
  interests: {
    en: [
      'Large Language Models',
      'Tool-using Agents',
      'Symbolic Regression',
      'Machine Learning',
    ],
    zh: ['大语言模型', '工具调用智能体', '符号回归', '机器学习'],
  },
  email: null,
  github: null,
  cv: null,
  university: null,
  location: null,
}
