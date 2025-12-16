<div align="center">
  <h1>shadcn blog</h1>
  <p>基于 Next.js 15 + Payload CMS 的全栈博客，内置认证、评论、搜索、RSS 与邮件模版。</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/React-19-61dafb" alt="React 19" />
    <img src="https://img.shields.io/badge/Database-PostgreSQL-336791" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/CMS-Payload-blueviolet" alt="Payload CMS" />
  </p>
</div>

## 目录

- [目录](#目录)
- [项目简介](#项目简介)
- [主要特性](#主要特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [核心模块速览](#核心模块速览)
- [环境变量](#环境变量)
- [常用脚本](#常用脚本)
- [页面与接口](#页面与接口)
- [开发提示](#开发提示)

## 项目简介

- 前端采用 Next.js App Router，UI 基于 tailwind + shadcn，并用 fumadocs 的布局组件快速搭建导航、分页、搜索等。
- 内容源由 Payload CMS 提供（`payload.config.ts`），支持富文本、标签、封面图与发布状态。
- 认证使用 better-auth（Google/GitHub 登录），会话与评论数据通过 Drizzle ORM 写入 Postgres。
- 评论系统集成 `@fuma-comment`，同时生成 `/rss.xml` 订阅源和 `/api/search` 搜索索引。

## 主要特性

- 文章管理：Payload 后台（`/admin`）可创建草稿/已发布文章，支持封面、标签与定时发布时间。
- 博客体验：列表分页、标签聚合页、文章详情页富文本渲染、分享按钮、一键复制链接。
- 社交与互动：Google/GitHub 登录、基于 better-auth 的会话管理，Fuma Comment 评论组件存储在本地数据库。
- 增强功能：RSS 输出、站内搜索索引、自动 Open Graph/OG Banner、站点地图（`next-sitemap`）。
- 邮件模版：`emails/newsletter-welcome.tsx` 提供 React Email/Tailwind 的欢迎邮件示例，可通过 Resend 发送。
- 运维友好：`.env` 校验、`start-database.sh` 一键启动本地 Postgres、Drizzle/Payload 脚本统一管理数据库。

## 技术栈

<table>
  <tr>
    <th>领域</th>
    <th>选择</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>框架</td>
    <td>Next.js 15 (App Router)</td>
    <td>服务端组件、动态/静态混合渲染</td>
  </tr>
  <tr>
    <td>UI</td>
    <td>tailwindcss 4 + shadcn + fumadocs-ui</td>
    <td>快速搭建导航、分页、Section、主题切换</td>
  </tr>
  <tr>
    <td>内容</td>
    <td>Payload CMS</td>
    <td>Posts/Users/Media 集合，Lexical 富文本</td>
  </tr>
  <tr>
    <td>数据</td>
    <td>PostgreSQL + Drizzle ORM</td>
    <td>认证与评论表（前缀 <code>blog_*</code>）</td>
  </tr>
  <tr>
    <td>认证</td>
    <td>better-auth + OAuth (Google/GitHub)</td>
    <td>社交登录、会话、额外角色字段</td>
  </tr>
  <tr>
    <td>邮件</td>
    <td>Resend + React Email</td>
    <td>欢迎邮件模版、Tailwind 样式</td>
  </tr>
</table>

## 快速开始

1) 安装依赖与 Node  
   - 推荐 Node 20+，包管理器使用 `pnpm`（已锁定 `pnpm-lock.yaml`）。
2) 配置环境变量  
   - 复制 `.env.example` 为 `.env`，至少填写 `DATABASE_URL`、`PAYLOAD_SECRET`、`BETTER_AUTH_SECRET`，如需社交登录再补齐 OAuth。
3) 启动本地数据库（Postgres）  
   - `./start-database.sh`（依赖 Docker/Podman）或使用自带的 Postgres 实例。
4) 安装依赖并生成数据库结构  
   - `pnpm install`  
   - `pnpm db:generate && pnpm db:migrate`（Drizzle 认证/评论表）  
   - `pnpm payload:migrate`（Payload CMS 表）
5) 运行开发服务  
   - `pnpm dev`（默认监听 3000，Payload Admin `/admin`，博客 `/`）。
6) 可选：生成 Payload Types 与邮件预览  
   - `pnpm payload:generate`  
   - `pnpm email:dev -p 3001` 查看邮件模版。

> 开发模式下 Payload 会自动填充 `admin@example.com` / `admin123` 登录框，无需手动创建账户。

## 核心模块速览

- 内容模型：`payload.config.ts` 定义 Posts/Users/Media，文章支持封面上传、标签数组、发布时间与状态。
- 数据获取：`src/lib/payload-posts.ts` 统一封装文章查询、标签统计、分页与 slug 获取，供页面调用。
- 页面与布局：`src/app/(main)` 为站点主入口，`_components` 目录包含 Hero、CTA、Post 列表等 UI。
- 认证与评论：`src/server/auth`（better-auth + Drizzle），`src/server/comments` 将评论存入 `blog_comments` 表。
- 搜索与订阅：`src/app/(main)/api/search/route.ts` 动态生成索引；`src/app/(main)/rss.xml/route.ts` 输出 Atom feed。
- 邮件：`emails/newsletter-welcome.tsx` React Email 模版，可传入最新文章数组渲染卡片。

项目结构（节选）：

```text
src/
├── app/
│   ├── (main)/(home)/page.tsx           # 首页：Hero、最近文章、CTA
│   ├── (main)/(home)/posts/[slug]/page.tsx  # 文章详情 + 评论 + 分享
│   ├── (main)/(home)/posts/page.tsx     # 分页文章列表
│   ├── (main)/(home)/tags/page.tsx      # 标签聚合
│   ├── (main)/api/search/route.ts       # 站内搜索索引
│   ├── (main)/rss.xml/route.ts          # Atom/RSS 输出
│   └── (payload)/admin/...              # Payload CMS 后台
├── lib/                                 # 数据与工具（payload-posts、metadata、auth-client）
├── server/                              # better-auth + Drizzle schema + comment storage
└── emails/                              # React Email 模版
```

## 环境变量

<details>
<summary>必填与可选</summary>

| 变量 | 说明 |
| --- | --- |
| `DATABASE_URL` | Postgres 连接串，例如 `postgresql://user:pass@localhost:5432/blog` |
| `PAYLOAD_SECRET` | Payload CMS 用于 JWT 加密的密钥 |
| `BETTER_AUTH_SECRET` | better-auth session 密钥 |
| `BETTER_AUTH_URL` | 认证回调地址（本地可设 `http://localhost:3000`） |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | 启用 Google 登录时必填 |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | 启用 GitHub 登录时必填 |
| `RESEND_API_KEY` / `RESEND_AUDIENCE_ID` / `EMAIL_FROM` | 发送邮件时必填 |
| `NEXT_PUBLIC_SERVER_URL` | 生成链接、OG、RSS 的基础地址 |
| `NEXT_PUBLIC_UMAMI_URL` / `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | 可选，埋点统计 |

</details>

## 常用脚本

- `pnpm dev`：启动 Next.js 开发服务器（含 Payload routes）。
- `pnpm build` / `pnpm preview`：构建与预览生产版本。
- `pnpm db:generate` / `pnpm db:migrate`：生成并执行 Drizzle 迁移（认证/评论表）。
- `pnpm payload:migrate`：同步 Payload CMS 数据表。
- `pnpm lint` / `pnpm format`：质量与格式检查（biome）。
- `pnpm email:dev`：本地预览 React Email 模版。

## 页面与接口

- `/`：首页，展示 Hero、最新文章、CTA。
- `/posts`：文章分页列表；`/posts/[slug]`：详情页、富文本、评论、分享。
- `/tags`：标签云与计数。
- `/login`：Google/GitHub 登录入口。
- `/admin`：Payload CMS 后台。
- `/api/search`：搜索索引接口（fumadocs search）。
- `/rss.xml`：Atom/RSS 订阅。

## 开发提示

- 本地优先运行 `./start-database.sh` 启动 Postgres；若端口占用脚本会提示。
- 认证与评论表前缀为 `blog_`，确保 `drizzle.config.ts` 里的 `tablesFilter` 与迁移脚本保持一致。
- Payload 在开发环境会预填 `admin@example.com` / `admin123`，方便快速登录后台。
- 如果只想浏览前端而不接入真实数据，可设置 `SKIP_ENV_VALIDATION=1` 并禁用需要外部服务的功能，但推荐补齐变量以覆盖所有页面。
