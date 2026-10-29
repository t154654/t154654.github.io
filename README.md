# Academic Portfolio

面向科研实习、导师联系和研究生申请的中英双语学术主页。使用 React、TypeScript、Vite、Tailwind CSS 和 Lucide，无后端、数据库或外部 API。英文为默认语言，包含自然中文版本。

项目与文章详情会在构建时预渲染为独立 HTML，兼容 GitHub Pages 和 Vercel。静态 HTML 自带页面内容及 SEO 元数据，无需依赖搜索引擎执行 JavaScript。

## 本地运行

使用 **Node.js 24 LTS**（也支持 22.13 及以上的 22.x 版本）和 npm：

```sh
npm install
npm run dev
```

打开终端输出的本地地址。开发服务仅绑定本机。以下命令用于检查与生产预览：

```sh
npm run check       # TypeScript 严格检查、ESLint、基础测试
npm run build       # 客户端构建、服务端渲染包、所有页面静态预渲染
npm run verify:build # 检查已构建的静态页面；必须先运行 build
npm run preview     # 预览 dist/ 生产产物
```

可选运行 `npm run format`，使用 Prettier 统一代码、配置和文档格式。

已有 `package-lock.json` 时，持续集成或重新安装优先使用 `npm ci`。构建结果位于 `dist/`，中间服务端渲染产物位于 `work/ssr/`，均不纳入 Git。

当前构建生成 **15 个预渲染页面**（根首页及 14 个语言页面），另有 `404.html`。`npm run verify:build` 检查静态正文、页面语言、单一主标题、元数据、站内链接、实验指标说明和公开资源；它会按相同环境配置检查部署子路径。验证前须先完成构建，并保持 `VITE_BASE_PATH`、`SITE_URL` 与构建时一致。

## 页面与功能

- 首页：Hero、About、Research、Projects、Skills、Writing、Contact。
- 项目页：项目方法、实验结果、可说明的证据及当前限制；Side Projects 单独分类。
- 写作页：Markdown 与 GFM 表格、代码、链接；内容不执行 HTML 或任意脚本。
- 完整中英切换、语言偏好保存、浅色与深色模式、移动导航。
- 语义化结构、键盘焦点、跳转正文入口以及减少动态效果偏好支持。
- 每个语言/详情页的独立标题、描述和 Open Graph 信息；配置正式网址后生成 canonical、语言替代链接与 sitemap。

主页路径为 `/en/`、`/zh/`，详情为 `/<lang>/projects/<slug>/`、`/<lang>/writing/<slug>/`。根路径默认显示英文，浏览器可恢复先前保存的语言偏好。详情页可直接访问和刷新，无需 SPA catch-all 重写。

## 编辑个人资料

编辑 `src/data/profile.ts`。姓名、学校、地点、邮箱、GitHub 和简历等未知信息使用 `null`，页面会隐藏相应字段和入口。不要填写 `Your Name`、示例邮箱或无效 `#` 链接。姓名尚未配置时，页面使用通用学术作品集标题。

- 双语字段统一使用 `{ en: '...', zh: '...' }`，添加资料时同时维护两种语言。
- GitHub 填完整 HTTPS 地址；邮箱填真实地址。
- 简历可放入 `public/cv.pdf`，再将 `cv` 配置为 `` `${import.meta.env.BASE_URL}cv.pdf` ``；也可以使用真实的 HTTPS 文件地址。这样可适配 GitHub Pages 仓库子目录。
- 语言和主题偏好保存在当前浏览器的 localStorage。存储不可用时仍可使用网站。

## 编辑项目

项目集中在 `src/data/projects.ts`；类型定义位于 `src/data/types.ts`。修改或添加项目时，沿用已有对象结构，并提供唯一的 `slug`、中英标题与说明、技术标签、方法、结果、限制和证据说明。`category` 支持 `research`、`learning`、`side`；`visual` 支持 `equation`、`agent`、`vision`、`mod`。构建自动生成对应中英文详情页。

`evidence` 是对可验证工作的描述，并不表示已经上传实验文件。只有确认可以公开后，才添加真实的 `github` / `url`。未配置链接时不显示对应入口。

当前内容保留以下事实边界：

- **RESTART / LLM-SRBench**：进行中的研究探索，包含公式搜索、候选生成、MCTS 相关探索、motif 结构证据、实验验证与可复现性工作；不声称论文发表、SOTA 或已验证的创新结论。
- **Sentry / AppWorld**：已配置数据与 baseline 环境，开展 Together API 适配和复现实验。**147/147 表示数据任务完整性验证，不是 Agent 成功解决任务数。**
- **CIFAR-10**：最佳 CNN **验证准确率 72.08%**，**测试准确率 71.34%**，分别标注。
- **初音未来：海风之歌**：Europa Universalis IV MOD，放在 Side Projects，与科研项目分开。

没有提供论文、奖项、项目日期或公开仓库地址，因此没有编造这些资料。

## 添加 Markdown 文章

1. 在 `src/content/` 新建一对文件，例如 `experiment-notes.en.md` 和 `experiment-notes.zh.md`。
2. 在 `src/data/writing.ts` 中使用 Vite `?raw` 导入两个文件，并向 `articles` 添加一个唯一 slug 的条目。
3. 同时提供标题、简介、标签及双语正文。沿用现有条目写法；文章列表和两种语言的静态详情页会自动生成。
4. 运行 `npm run check`、`npm run build`、`npm run verify:build`，检查正文、表格、链接和手机布局。

正文示例（标题由文章索引生成，正文从段落或二级标题开始）：

```md
Explain the question, method, evidence and limitations.

## Method

- Record the configuration.
- Distinguish validation from test results.
```

当前文章为方法说明性质的笔记，不代表已发表研究或未提供的实验结果。Markdown 不支持执行 JSX；如需新组件，应在应用代码中明确实现。

## 配置正式网址与 SEO

复制 `.env.example` 为 `.env.local`，设置公开构建配置；也可以直接在持续集成或部署平台设置同名环境变量。`VITE_BASE_PATH` 是以 `/` 开头和结尾的部署路径；`SITE_URL` 是正式部署根 URL，GitHub 项目 Pages 需要包含仓库路径。系统环境变量优先于本地文件。

| 部署方式              | VITE_BASE_PATH | SITE_URL                         |
| --------------------- | -------------- | -------------------------------- |
| Vercel / 自定义域名   | `/`            | 实际站点的 HTTPS 根 URL          |
| GitHub 用户或组织主页 | `/`            | 实际 Pages HTTPS 根 URL          |
| GitHub 项目 Pages     | `/仓库名/`     | 实际 Pages HTTPS URL，包含仓库名 |

未配置 `SITE_URL` 时，页面加入 `noindex, nofollow`，`robots.txt` 设置 `Disallow: /`，`sitemap.xml` 保留空的 URL 集合，避免生成虚构域名。设置真实网址后重新构建，当前 sitemap 包含 **14 个中英文页面 URL**，根首页不重复列入。检查 `dist/robots.txt`、`dist/sitemap.xml` 及页面源码中的 canonical / Open Graph 信息；也可运行 `npm run verify:build` 核对构建结果。SEO 只能提供抓取基础，不保证收录或搜索排名。

环境变量为构建时配置，修改后需要重新构建。任何 `VITE_` 变量都可能进入浏览器，**不得放置 Together/OpenAI 等 API 密钥**。

## 部署到 GitHub Pages

提供的 `.github/workflows/pages.yml` **仅支持手动触发**，不会在 push 时自动发布。

1. 先检查待上传内容，只将可以公开的网页代码与资产推送到你选定的仓库。研究源码、实验日志、数据及密钥不属于本网站的必需内容。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 进入 **Actions → Deploy to GitHub Pages → Run workflow**。工作流安装锁定依赖、执行检查、从 Pages 配置读取真实 URL 与子路径、构建并发布 `dist/`。
4. 以工作流成功结果和实际访问验证部署：检查中英首页、项目和文章深链刷新、静态资源、主题与语言切换。

本项目没有执行远程发布；工作流文件本身不代表已经部署。首次运行可能需要在仓库设置中启用 Pages 并允许工作流使用 `github-pages` 环境。

## 部署到 Vercel

1. 在 Vercel 导入你审核后的代码仓库。
2. 本仓库的 `vercel.json` 指定 Vite、`npm ci`、`npm run build` 和 `dist` 输出目录。
3. 配置 `VITE_BASE_PATH=/`，将 `SITE_URL` 设置为实际生产域名根 URL。确认域名后重新构建；预览环境可将 `SITE_URL` 留空以禁止索引。
4. 部署后直接访问并刷新一个项目详情与一篇文章，检查中文内容、favicon 与 SEO 信息。

预渲染已生成各路由的 HTML，Vercel 配置启用结尾斜杠；访问时使用 `/<lang>/projects/<slug>/` 等路径。无需把所有路径重写到首页。切勿设置会掩盖真实 404 的全路径重写规则。

## 项目结构

```text
.
├── .github/workflows/pages.yml  # 手动 GitHub Pages 发布
├── public/
│   ├── favicon.svg             # 站点图标
│   ├── og-image.svg            # 分享图矢量源
│   └── og-image.png            # Open Graph 分享图
├── scripts/
│   ├── prerender.mjs           # 静态渲染与 SEO 产物生成
│   └── verify-build.mjs        # 静态页面、链接、元数据及证据检查
├── src/
│   ├── components/             # 导航、页脚、卡片、研究示意图
│   ├── content/                # 成对的中英文 Markdown 文章
│   ├── data/
│   │   ├── profile.ts          # 个人资料及未知字段
│   │   ├── projects.ts         # 项目事实与双语内容
│   │   ├── types.ts            # 数据类型
│   │   ├── ui.ts               # 双语界面文案及技能分组
│   │   └── writing.ts          # 文章索引及正文导入
│   ├── lib/site.ts             # 站内路径、语言路由及偏好存储
│   ├── pages/                  # 首页、项目和文章详情、404
│   ├── test/                   # 基础交互、路由及内容边界测试
│   ├── App.tsx                # 页面路由与公共布局
│   ├── entry-server.tsx       # 构建时服务端渲染入口
│   ├── main.tsx               # 浏览器入口
│   └── styles.css             # Tailwind 入口和站点样式
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
├── tsconfig.json
├── vercel.json
├── vite.config.ts
└── vitest.config.ts
```

`work/` 用于中间文件，`outputs/` 用于交付材料；它们与 `node_modules/`、`dist/`、本地环境文件一起在 `.gitignore` 中排除。

## Git 初始化

若当前目录还没有 Git 仓库，可以在审核所有待提交内容后执行：

```sh
git init
git add .
git status --short
git commit -m "feat: build bilingual academic portfolio"
```

提交前确认 Git 身份已经在本机配置。项目不创建远程仓库、不添加远程地址，也不自动推送。将来公开仓库前，请再次检查内容与可公开范围。

## English quick start

Run `npm install`, then `npm run dev` with Node.js 24 LTS (or Node.js 22.x, version 22.13 or later). Before publishing, run `npm run check`, `npm run build`, then `npm run verify:build` with matching environment configuration. The current build contains 15 prerendered pages plus a 404 page. Edit bilingual profile data in `src/data/profile.ts`, project data in `src/data/projects.ts`, and Markdown articles in `src/content/` with entries in `src/data/writing.ts`. Unknown personal fields are `null` and hidden in the UI.

Set `VITE_BASE_PATH` for your deployment path and `SITE_URL` to the real deployed root URL before an indexable production build. Without `SITE_URL`, the build adds noindex metadata and a disallow rule, and writes an empty sitemap. With it configured, the current sitemap contains 14 localized page URLs. GitHub Pages publishing is manual via the included Actions workflow; Vercel uses the included configuration. No deployment or upload is performed by local development or build commands.
