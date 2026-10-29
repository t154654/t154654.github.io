import type { Project } from './types'

/** Public summaries only. Add links only after confirming they are public. */
export const projects: Project[] = [
  {
    slug: 'restart',
    category: 'research',
    title: { en: 'RESTART / LLM-SRBench', zh: 'RESTART / LLM-SRBench' },
    subtitle: {
      en: 'Language models for equation discovery',
      zh: '面向公式发现的语言模型',
    },
    description: {
      en: 'An ongoing exploration of LLM-guided symbolic regression: candidate equations, search strategies, and the evidence needed to evaluate them.',
      zh: '进行中的 LLM 引导符号回归探索，关注候选公式、搜索策略，以及评估这些方法所需的证据。',
    },
    status: { en: 'Research in progress', zh: '研究探索中' },
    tags: ['LLM', 'Symbolic Regression', 'MCTS', 'Reproducibility'],
    methods: {
      en: [
        'Explore formula search and LLM-generated candidate equations in the context of scientific equation discovery.',
        'Investigate MCTS-related search ideas and motif-level structural evidence.',
        'Use experimental validation, search logs, and reproducibility tests to examine candidate behavior.',
      ],
      zh: [
        '围绕科学公式发现，探索公式搜索与语言模型生成的候选表达式。',
        '探索 MCTS 相关搜索思路与 motif 层面的结构证据。',
        '通过实验验证、搜索日志和可复现性测试，分析候选公式的行为。',
      ],
    },
    results: {
      en: [
        'The project is an ongoing research exploration. No final performance result or validated novelty claim is reported here.',
      ],
      zh: [
        '该项目仍处于研究探索阶段，此处不报告最终性能结果或已证实的创新结论。',
      ],
    },
    limitations: {
      en: [
        'Search ideas and structural observations require further experimental validation.',
        'No publication, state-of-the-art result, or benchmark superiority is claimed.',
      ],
      zh: [
        '搜索思路与结构观察仍需进一步实验验证。',
        '不声称已有论文发表、SOTA 结果或基准性能优势。',
      ],
    },
    evidence: {
      en: [
        'Evidence under investigation includes candidate equations, motif structures, search logs, and reproducibility checks. These are described here; no private code or experimental data is distributed.',
      ],
      zh: [
        '关注的证据包括候选公式、motif 结构、搜索日志与可复现性检查。此处仅介绍这些证据类型，不分发未公开代码或实验数据。',
      ],
    },
    visual: 'equation',
  },
  {
    slug: 'sentry',
    category: 'research',
    title: { en: 'Sentry / AppWorld', zh: 'Sentry / AppWorld' },
    subtitle: {
      en: 'Reproducing a tool-using agent baseline',
      zh: '工具调用智能体基线复现',
    },
    description: {
      en: 'Environment setup, Together API adaptation, and reproduction experiments for a Sentry baseline in AppWorld.',
      zh: '完成 AppWorld 数据及 Sentry 基线环境配置，并开展 Together API 适配与复现实验。',
    },
    status: { en: 'Reproduction in progress', zh: '复现实验中' },
    tags: ['LLM Agent', 'Tool Use', 'AppWorld', 'Together API'],
    methods: {
      en: [
        'Configure AppWorld task data and the Sentry baseline environment.',
        'Adapt model access through Together API and run reproduction experiments.',
        'Keep data integrity checks separate from agent task outcomes when interpreting runs.',
      ],
      zh: [
        '配置 AppWorld 任务数据及 Sentry 基线运行环境。',
        '适配 Together API 模型访问，并开展复现实验。',
        '解释实验运行时，明确区分数据完整性检查与智能体任务完成情况。',
      ],
    },
    results: {
      en: [
        'AppWorld data and the Sentry baseline environment have been configured.',
        '147/147 tasks passed the data task integrity check. This is a data readiness result, not 147 tasks solved by an agent.',
        'Together API adaptation and reproduction experiments are in progress; no agent success rate is reported.',
      ],
      zh: [
        '已完成 AppWorld 数据和 Sentry 基线环境配置。',
        '147/147 个任务通过了数据任务完整性验证。这是数据就绪检查结果，不代表智能体成功解决了 147 个任务。',
        '正在进行 Together API 适配与复现实验，尚不报告智能体任务成功率。',
      ],
    },
    limitations: {
      en: [
        'Data availability, API compatibility, and agent performance are distinct checks. The integrity count cannot establish an agent success rate.',
      ],
      zh: [
        '数据可用性、API 兼容性和智能体性能属于不同检查，完整性计数不能用于推断智能体成功率。',
      ],
    },
    evidence: {
      en: [
        'The confirmed quantitative evidence is the 147/147 data task integrity validation. Public run artifacts and project links have not been supplied.',
      ],
      zh: [
        '目前已确认的量化证据为 147/147 数据任务完整性验证；尚未提供公开运行产物或项目链接。',
      ],
    },
    metrics: [
      {
        label: {
          en: 'Data integrity · not agent success',
          zh: '数据完整性 · 非智能体成功数',
        },
        value: '147/147',
      },
    ],
    visual: 'agent',
  },
  {
    slug: 'cifar-10',
    category: 'learning',
    title: { en: 'CIFAR-10 Image Classification', zh: 'CIFAR-10 图像分类' },
    subtitle: {
      en: 'Learning through controlled experiments',
      zh: '通过对照实验理解模型',
    },
    description: {
      en: 'A PyTorch classification project comparing CNN and MLP models, optimizers, normalization, and regularization through ablation experiments.',
      zh: '基于 PyTorch 的图像分类项目，通过消融实验比较 CNN 与 MLP、优化器、归一化和正则化方法。',
    },
    status: { en: 'Experiment results available', zh: '已有实验结果' },
    tags: ['PyTorch', 'CNN', 'MLP', 'Ablation Studies'],
    methods: {
      en: [
        'Implement CNN and MLP classifiers in PyTorch.',
        'Conduct ablation experiments involving Adam, SGD, BatchNorm, and Dropout.',
        'Report validation and test accuracy separately to preserve the distinction between model selection and final evaluation.',
      ],
      zh: [
        '使用 PyTorch 实现 CNN 和 MLP 分类模型。',
        '围绕 Adam、SGD、BatchNorm 与 Dropout 开展多种消融实验。',
        '分别报告验证集和测试集准确率，保留模型选择与最终评估之间的区别。',
      ],
    },
    results: {
      en: [
        'The best CNN achieved 72.08% validation accuracy and 71.34% test accuracy.',
        'Multiple ablation experiments were completed. Per-ablation numbers have not been supplied and are not inferred here.',
      ],
      zh: [
        '最佳 CNN 的验证集准确率为 72.08%，测试集准确率为 71.34%。',
        '已完成多种消融实验。尚未提供各项消融的具体数值，此处不作推断。',
      ],
    },
    limitations: {
      en: [
        'These figures describe the supplied experiment results. Run variance, split details, and per-ablation metrics are not available in this summary.',
      ],
      zh: [
        '以上指标对应已提供的实验结果；本摘要未提供多次运行方差、数据划分细节或各项消融指标。',
      ],
    },
    evidence: {
      en: [
        'Reported best-CNN validation accuracy: 72.08%. Reported test accuracy: 71.34%. No additional benchmark result is claimed.',
      ],
      zh: [
        '已报告的最佳 CNN 验证集准确率：72.08%；测试集准确率：71.34%。不声称其他基准结果。',
      ],
    },
    metrics: [
      {
        label: { en: 'Validation accuracy', zh: '验证集准确率' },
        value: '72.08%',
      },
      { label: { en: 'Test accuracy', zh: '测试集准确率' }, value: '71.34%' },
    ],
    visual: 'vision',
  },
  {
    slug: 'miku-mod',
    category: 'side',
    title: {
      en: 'Hatsune Miku: Song of the Sea Breeze',
      zh: '初音未来：海风之歌',
    },
    subtitle: {
      en: 'A Europa Universalis IV mod',
      zh: 'Europa Universalis IV MOD',
    },
    description: {
      en: 'A game mod combining event systems, mission trees, scripting, and localization, with attention to version compatibility and community feedback.',
      zh: '结合事件系统、任务树、游戏脚本与本地化的游戏模组实践，同时关注版本兼容和社区反馈。',
    },
    status: { en: 'Side project', zh: '个人兴趣项目' },
    tags: ['Game Scripting', 'Localization', 'Compatibility', 'EU IV'],
    methods: {
      en: [
        'Work with event systems, mission trees, and game scripts in Europa Universalis IV.',
        'Develop localization alongside game content.',
        'Consider version compatibility and incorporate community feedback into the maintenance process.',
      ],
      zh: [
        '围绕 Europa Universalis IV 的事件系统、任务树和游戏脚本进行开发。',
        '结合游戏内容开展本地化工作。',
        '在维护过程中关注版本兼容，并结合社区反馈调整内容。',
      ],
    },
    results: {
      en: [
        'The project provides practical experience in content scripting, localization, compatibility maintenance, and responding to community feedback.',
      ],
      zh: [
        '该项目积累了内容脚本、本地化、兼容性维护及处理社区反馈的实践经验。',
      ],
    },
    limitations: {
      en: [
        'No release date, download count, community size, or public project link has been supplied.',
      ],
      zh: ['尚未提供发布日期、下载量、社区规模或公开项目链接。'],
    },
    evidence: {
      en: [
        'The scope covers event systems, mission trees, scripts, localization, version compatibility, and community feedback.',
      ],
      zh: ['项目范围包括事件系统、任务树、脚本、本地化、版本兼容与社区反馈。'],
    },
    visual: 'mod',
  },
]
