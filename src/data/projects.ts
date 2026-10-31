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
    question: {
      en: 'How can language-model candidate generation and structured search support equation discovery, while keeping the path from a proposed expression to its evaluation open to inspection?',
      zh: '语言模型生成候选公式与结构化搜索如何支持科学公式发现，并让候选表达式从提出到评估的过程能够被检查？',
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
    nextSteps: {
      en: [
        'Future work: define comparable search budgets and evaluation criteria before comparing candidate-generation and MCTS-related search variants.',
        'Future work: connect candidate equations, motif observations, evaluation records, and search decisions in a consistent experiment record.',
        'Future work: repeat selected configurations and inspect failed or unstable runs before drawing conclusions about a search strategy.',
      ],
      zh: [
        '后续计划：先明确可比较的搜索预算与评估标准，再对候选生成方式和 MCTS 相关搜索方案进行对照验证。',
        '后续计划：以统一实验记录连接候选公式、motif 观察、评估结果与搜索决策，使结构证据能够追溯到具体运行。',
        '后续计划：重复运行选定配置，检查失败或不稳定的运行，再判断搜索策略的效果与局限。',
      ],
    },
    relatedArticles: ['reproducible-search', 'evaluation-boundaries'],
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
    question: {
      en: 'What is needed to reproduce a tool-using agent baseline in AppWorld, and how should data readiness, API compatibility, and actual task outcomes be evaluated separately?',
      zh: '在 AppWorld 中复现工具调用智能体基线需要哪些条件？如何分别验证数据就绪、API 兼容性与真实任务完成情况？',
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
    nextSteps: {
      en: [
        'Future work: complete end-to-end checks of Together API requests, responses, and tool interactions before interpreting agent evaluation runs.',
        'Future work: record task identifiers, model settings, execution traces, and task outcomes, with environment and API failures explicitly labeled.',
        'Future work: evaluate the baseline on an explicitly defined task set with a stated success criterion, and report agent outcomes independently of the 147/147 data integrity check.',
      ],
      zh: [
        '后续计划：完成 Together API 请求、响应与工具交互的端到端检查，再解释智能体评估运行的结果。',
        '后续计划：记录任务标识、模型设置、执行轨迹和任务结果，并明确标注环境故障与 API 故障。',
        '后续计划：在明确定义的任务集合与成功判定标准下评估基线，将智能体任务结果与 147/147 数据完整性检查分别报告。',
      ],
    },
    relatedArticles: ['evaluation-boundaries', 'reproducible-search'],
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
    question: {
      en: 'How should the effects of model architecture, optimization, normalization, and regularization be compared without confusing validation-based model selection with test evaluation?',
      zh: '如何比较模型结构、优化方法、归一化和正则化的影响，同时明确区分基于验证集的模型选择与测试集评估？',
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
    nextSteps: {
      en: [
        'Future work: consolidate the configuration and metric records for each ablation, including the data split, training settings, and the factor changed in each comparison.',
        'Future work: repeat selected comparisons under documented conditions to assess run-to-run variation before attributing a difference to a particular method.',
        'Future work: document model selection using validation results and the subsequent test evaluation separately; add per-ablation figures only when their records can be checked.',
      ],
      zh: [
        '后续计划：整理各项消融的配置与指标记录，包括数据划分、训练设置，以及每项比较实际改变的因素。',
        '后续计划：在记录清楚的条件下重复选定对照，评估多次运行的波动，再判断差异是否来自特定方法。',
        '后续计划：分别说明依据验证集进行的模型选择与之后的测试评估，仅在记录可检查时补充各项消融的具体数值。',
      ],
    },
    relatedArticles: ['cnn-ablation-notes', 'evaluation-boundaries'],
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
    question: {
      en: 'How can events, mission trees, and localized content work as a coherent game system while remaining maintainable across game versions and community feedback?',
      zh: '如何让事件、任务树与本地化内容组成连贯的游戏系统，并在游戏版本变动和社区反馈中保持可维护性？',
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
    nextSteps: {
      en: [
        'Future work: document intended event triggers and mission dependencies, then check representative paths for conflicting or unreachable conditions.',
        'Future work: establish a compatibility checklist for supported game versions and review localization keys and displayed text alongside script changes.',
        'Future work: turn reproducible community reports into documented regression checks before considering an issue resolved.',
      ],
      zh: [
        '后续计划：整理预期事件触发条件与任务依赖，再检查代表性流程中是否存在冲突或无法到达的条件。',
        '后续计划：为计划支持的游戏版本建立兼容性清单，并在脚本变更时同步检查本地化键与显示文本。',
        '后续计划：将能够复现的社区反馈转化为有记录的回归检查，再确认问题是否已解决。',
      ],
    },
    relatedArticles: [],
    visual: 'mod',
  },
]
