# cleanorapi.com

基于 React Router Framework Mode + Cloudflare Workers 的临时邮箱服务。

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/devttl/smail)

- 线上域名：`https://cleanorapi.com`
- Worker 名称：`smail`
- 默认语言：`en`（同时支持 10 种语言）

## 一键部署（Deploy to Cloudflare）

- 上方按钮可让其他开发者将本项目一键部署到他们自己的 Cloudflare 账号。
- 部署流程会基于仓库中的 `wrangler.jsonc` 自动创建并绑定所需 D1 数据库。
- 项目仓库需要保持公开（public）才能让他人正常使用该按钮。

## 项目简介

这是一个面向低风险场景的临时邮箱网站，核心目标是：

- 一键生成临时邮箱地址
- 即时查看收件箱
- 用于注册验证、OTP、一次性下载等短期流程
- 避免暴露长期个人邮箱

项目同时包含多语言 SEO 页面（Markdown）和多语言博客。

## 技术栈

- React 19 + React Router 7（Framework Mode，SSR）
- Cloudflare Workers（HTTP + Email Worker）
- Cloudflare D1（存储邮件元数据与 gzip 压缩的原始 MIME）
- Google AdSense（可选，支持公开内容页、首页、收件箱与邮件详情外围广告位）
- Signed Cookie Session（React Router 内置 Session）
- Tailwind CSS 4
- Markdoc（渲染 Markdown 页面与博客）

## 核心功能

- 首页临时邮箱收件箱
- 邮件预览弹窗（解析 HTML/Text）
- 多语言路由（`/:lang?`）
- SEO 路由：`/robots.txt`、`/sitemap.xml`、`/rss.xml`
- 多语言 Markdown 页面（about/faq/privacy/terms + 长尾 SEO 落地页）
- 多语言博客列表、分页、文章页

## 数据流（真实实现）

1. 邮件进入 Worker 的 `email` 事件（`workers/app.ts`）
2. 解析原始邮件后：
   - 元数据写入 D1 `emails` 表（`id/to_address/from/subject/time`）
   - 原始 MIME 经 gzip 压缩后写入同一行的 `raw_blob`
   - 压缩结果超过 D1 安全上限时拒收，避免产生不完整记录
3. 首页按当前会话中的地址读取 D1 列表
4. 打开邮件详情时，通过 `/api/email/:id`：
   - 校验该邮件地址属于当前会话
   - 校验地址是否超过 24h
   - 从 D1 读取并解压原始邮件，解析后返回

说明：Cookie Session 将地址访问限制为 24 小时；Cron 每 30 分钟物理删除 D1 中超过 24 小时的邮件。

## 目录结构

```text
app/
  routes/              # 路由模块（home、md、blog、api、sitemap、robots 等）
  md/                  # 多语言 SEO Markdown 页面
  blog/                # 多语言博客内容与元数据
  i18n/                # 语言配置与文案
  .server/session.ts   # Signed Cookie Session
  utils/               # 公共工具（meta、theme、retention 等）
workers/
  app.ts               # Cloudflare Worker 入口（fetch + email）
migrations/
  *.sql                # D1 迁移
wrangler.jsonc         # Cloudflare 绑定配置
```

## 本地开发

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发

先创建本地 secret：

```bash
cp .env.example .env
```

```bash
pnpm run dev
```

默认访问：`http://localhost:5173`

### 3. 类型检查

```bash
pnpm run typecheck
```

### 4. 生产构建与预览

```bash
pnpm run build
pnpm run preview
```

## 常用命令

- `pnpm run dev`：本地开发
- `pnpm run build`：生产构建
- `pnpm run preview`：本地预览构建产物
- `pnpm run typecheck`：Cloudflare 类型生成 + 路由类型生成 + TS 检查
- `pnpm run deploy`：构建后部署到 Cloudflare Workers
- `pnpm run migrate`：对远端 D1（`smail`）执行迁移

## Cloudflare 资源绑定

`wrangler.jsonc` 当前使用以下绑定：

- `D1`：邮件元数据与原始 MIME（数据库名 `smail`）
- `triggers.crons`：`*/30 * * * *`（每 30 分钟清理超过 24 小时的邮件）

此外还需要配置一个 Worker Secret：

- `SESSION_SECRETS`：Cookie Session 的签名密钥。支持逗号分隔多个值用于轮换，最左侧为当前生效密钥。
- `MAIL_DOMAINS`：允许生成和接收的邮箱域名，使用逗号分隔。生产环境在 Cloudflare Worker 的 Variables 中配置；本地可在 `.env` 中覆盖，例如 `cleanorapi.com,bestinter.top,mail.test`。未配置时回退为 `cleanorapi.com`。

以下可选 AdSense 配置也在 Cloudflare Dashboard 的 Worker → Settings → Variables and Secrets 中以普通文本 Variable 配置：

- `ADSENSE_ENABLED`：设为 `true` 才允许显示广告。
- `ADSENSE_CMP_READY`：仅在 AdSense 后台已启用并发布 Google 认证 CMP 后设为 `true`；它是部署防误开开关，实际的逐用户同意状态由 Google CMP 管理。
- `ADSENSE_CLIENT`：发布商 ID，例如 `ca-pub-1234567890123456`。
- `ADSENSE_SLOT_ARTICLE`：博客文章广告位。
- `ADSENSE_SLOT_BLOG_LIST`：博客列表广告位。
- `ADSENSE_SLOT_CONTENT`：公开 Markdown 内容页广告位。
- `ADSENSE_SLOT_HOME`：首页邮箱功能区之后的广告位。
- `ADSENSE_SLOT_INBOX`：首页收件箱列表之后的广告位。
- `ADSENSE_SLOT_EMAIL_DETAIL`：邮件详情弹窗中、邮件正文 iframe 之后的广告位。

首页、收件箱、邮件详情、博客和公开内容页可加载各自的手动广告位；Privacy、Terms 和 API 不加载广告。`/inbox/:address` 会设置邮箱会话并重定向到首页，因此直达后会显示首页与收件箱广告。邮件详情广告位位于邮件正文 iframe 外部，邮件内容和邮箱地址不会传给广告组件。任一 Slot 留空即可单独关闭对应位置。配置发布商 ID 后，`/ads.txt` 会输出对应的授权记录；未配置时返回 404。

注意：收件箱和邮件详情以用户通信内容为核心，存在较高的 AdSense 政策审核与停用风险；将广告放在邮件 iframe 外部只能降低内容注入、隐私泄露和误触风险，不能消除该政策风险。上线前应根据 AdSense 最新政策评估，必要时将 `ADSENSE_SLOT_INBOX` 或 `ADSENSE_SLOT_EMAIL_DETAIL` 留空。

在 AdSense 后台还必须：

1. 在“隐私权和消息”中启用 Google 认证 CMP，并完成 EEA、英国和瑞士的同意设置。
2. 关闭 Auto ads，避免自动广告进入未设计的邮箱功能区域；本项目只支持上述手动广告位。

`wrangler.jsonc` 已启用 `keep_vars` 且不再提交 `vars` 值，因此 `pnpm run deploy` 会保留 Dashboard 中配置的普通 Worker Variables。`SESSION_SECRETS` 属于敏感配置，必须继续使用 Secret 类型；D1 属于资源绑定，不是普通 Variable。

本地开发可使用 `.env`，生产环境使用：

注意：`.env` 和 `.dev.vars` 二选一即可；如果存在 `.dev.vars`，Wrangler 本地开发时不会再加载 `.env`。

```bash
pnpm wrangler secret put SESSION_SECRETS
```

## 数据库迁移

当前迁移文件：

- `migrations/20260211_create_emails.sql`
- `migrations/20260212_email_indexes.sql`
- `migrations/20260812_store_raw_email_in_d1.sql`

首次部署或表结构变更后，执行：

```bash
pnpm run migrate
```

## 多语言与 SEO

- 支持语言：`en/zh/es/fr/de/ja/ko/ru/pt/ar`
- 默认语言为 `en`，默认语言不带前缀
- Markdown 页面与博客均支持多语言
- 自动生成 sitemap（包含首页、Markdown 页、博客列表/分页/文章）

## 部署说明

```bash
pnpm run deploy
```

发布前建议至少执行：

```bash
pnpm run typecheck
pnpm run build
```

## 重要边界

- 本项目面向临时收信与低风险验证场景。
- 不建议用于银行、工作、政务、法律与关键账号找回等高敏感场景。
