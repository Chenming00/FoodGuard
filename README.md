# FoodGuard - 智能食物健康扫描系统

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.2-black?style=flat&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.2.4-blue?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="License">
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> • 
  <a href="#技术栈">技术栈</a> • 
  <a href="#快速开始">快速开始</a> • 
  <a href="#项目结构">项目结构</a> • 
  <a href="#API接口">API接口</a> • 
  <a href="#环境变量">环境变量</a> • 
  <a href="#部署">部署</a>
</p>

## 📖 项目简介

FoodGuard 是一个基于人工智能技术的智能食物健康扫描系统，旨在帮助用户快速识别食物并分析其健康指标。通过上传食物图片，系统可以自动识别食物种类，并提供嘌呤含量和升糖指数（GI）的分析，为痛风、高尿酸血症和糖尿病患者提供健康饮食建议。

### 核心功能

- 📸 **智能图像识别** - 使用 AI 技术精准识别食物种类
- 📊 **健康指标分析** - 分析食物的嘌呤含量和升糖指数（GI）
- ⚠️ **健康风险提示** - 提供针对特定健康问题的风险警告
- 🔄 **健康替代建议** - 根据用户需求推荐更健康的替代食物
- 📱 **响应式设计** - 完美适配桌面端和移动端

## 🎯 功能特性

### 1. 智能食物识别
- 基于阿里云通义千问（Qwen）大模型的图像识别能力
- 支持多种食物种类的自动识别
- 高准确率的食物分类识别

### 2. 嘌呤含量分析
- **低嘌呤**（< 50mg/100g）：适合痛风和高尿酸血症患者
- **中嘌呤**（50-150mg/100g）：建议适量食用
- **高嘌呤**（> 150mg/100g）：痛风患者应避免食用

### 3. 升糖指数（GI）分析
- **低GI**（< 55）：血糖平稳上升，适合糖尿病患者
- **中GI**（55-70）：建议控制摄入量
- **高GI**（> 70）：血糖快速上升，糖尿病患者应避免

### 4. 健康建议系统
- 针对不同健康问题提供个性化建议
- 推荐健康的替代食物
- 提供饮食注意事项

## 🛠️ 技术栈

### 前端技术
- **Next.js 16.2.2** - React 框架，支持服务端渲染和静态生成
- **React 19.2.4** - 前端 UI 框架
- **TypeScript 5.0** - 类型安全的 JavaScript 超集
- **Tailwind CSS 4** - 原子化 CSS 框架
- **Lucide React** - 现代化的图标库

### 后端技术
- **Next.js API Routes** - 服务端 API 路由
- **Supabase**（可选）- 后端数据库服务

### AI 服务
- **阿里云通义千问（Qwen）** - 大语言模型，用于图像识别和分析

## 🚀 快速开始

### 环境要求

- Node.js 18+ 版本
- npm、yarn、pnpm 或 bun 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/Chenming00/FoodGuard.git
   cd FoodGuard
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   # 或
   bun install
   ```

3. **配置环境变量**
   
   复制 `.env.local.example` 到 `.env.local`（如果存在），或直接创建 `.env.local` 文件：
   ```bash
   cp .env.local.example .env.local
   ```
   
   编辑 `.env.local` 文件，配置必要的环境变量（详见 [环境变量](#环境变量)）。

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   # 或
   bun dev
   ```

5. **访问应用**
   
   打开浏览器，访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
FoodGuard/
├── app/                      # Next.js App Router 目录
│   ├── api/                  # API 路由
│   │   ├── analyze/          # 食物分析 API
│   │   │   └── route.ts
│   │   ├── recommend/        # 食物推荐 API
│   │   │   └── route.ts
│   │   └── recognize/        # 食物识别 API
│   │       └── route.ts
│   ├── result/               # 结果展示页面
│   │   └── page.tsx
│   ├── scan/                 # 扫描页面
│   │   └── page.tsx
│   ├── layout.tsx            # 全局布局
│   ├── page.tsx              # 首页
│   └── globals.css           # 全局样式
├── components/               # React 组件
├── lib/                      # 库文件
│   ├── foodDatabase.ts       # 食物数据库
│   ├── supabase.ts           # Supabase 客户端
│   └── types.ts              # TypeScript 类型定义
├── public/                   # 静态资源
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .env.local                # 环境变量配置（需创建）
├── .gitignore                # Git 忽略配置
├── eslint.config.mjs         # ESLint 配置
├── next.config.ts            # Next.js 配置
├── package.json              # 项目依赖
├── postcss.config.mjs        # PostCSS 配置
├── tsconfig.json             # TypeScript 配置
└── README.md                 # 项目说明文档
```

## 🔌 API 接口

### 1. 食物识别 API (`/api/recognize`)

识别上传的食物图片并返回健康分析结果。

**请求方式**: `POST`

**请求参数**:
```json
{
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**响应示例**:
```json
{
  "success": true,
  "foodName": "西兰花",
  "嘌呤": "低",
  "gi": "低",
  "risk": "无特殊风险",
  "alternatives": ["菠菜", "油菜", "白菜"]
}
```

### 2. 食物分析 API (`/api/analyze`)

根据食物名称获取健康分析结果。

**请求方式**: `GET`

**请求参数**:
- `food`: 食物名称（查询参数）

**响应示例**:
```json
{
  "foodName": "西兰花",
  "嘌呤": "低",
  "嘌呤Description": "嘌呤含量较低，适合痛风和高尿酸血症患者食用",
  "gi": "低",
  "giDescription": "升糖指数较低，血糖平稳上升，适合糖尿病患者",
  "risk": "无特殊风险",
  "alternatives": ["菠菜", "油菜", "白菜"]
}
```

### 3. 食物推荐 API (`/api/recommend`)

根据用户需求推荐替代食物。

**请求方式**: `POST`

**请求参数**:
```json
{
  "foodName": "白米饭",
  "type": "low-gi"
}
```

**请求参数说明**:
- `foodName`: 当前食物名称
- `type`: 推荐类型，可选值：
  - `low-purine`: 低嘌呤替代
  - `low-gi`: 低升糖指数替代

**响应示例**:
```json
{
  "foodName": "白米饭",
  "type": "low-gi",
  "alternatives": ["糙米", "燕麦", "全麦面包"],
  "suggestions": "您当前食用的食物升糖指数较高，建议选择以下低 GI 食物替代，有助于控制血糖"
}
```

## ⚙️ 环境变量

项目需要配置以下环境变量（在 `.env.local` 文件中）：

### 必需配置

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `OPENAI_API_KEY` | 阿里云通义千问 API Key | `sk-xxxxxxxxxxxxxx` |
| `OPENAI_BASE_URL` | 阿里云通义千问 API 地址 | `https://coding.dashscope.aliyuncs.com/v1` |

### 可选配置（Supabase 集成）

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | `eyJhbGciOiJIUzI1NiIs...` |
| `SUPABASE_SERVICE_KEY` | Supabase 服务密钥 | `eyJhbGciOiJIUzI1NiIs...` |

### 环境变量示例

```bash
# Qwen API 配置
OPENAI_API_KEY=sk-sp-ff32a349bc874aa98040815d852d801c
OPENAI_BASE_URL=https://coding.dashscope.aliyuncs.com/v1

# Supabase 配置（可选）
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## 📊 食物数据库

项目内置了包含 20+ 种常见食物的健康数据库，涵盖以下类别：

| 食物类别 | 代表食物 |
|---------|---------|
| 动物内脏 | 肝、肾、胰 |
| 海鲜 | 沙丁鱼、龙虾、扇贝 |
| 主食 | 白米饭、白面包 |
| 蔬菜 | 西兰花、菠菜、蘑菇 |
| 水果 | 苹果、香蕉 |
| 饮品 | 啤酒 |
| 蛋奶 | 鸡蛋、牛奶 |
| 甜食 | 蜂蜜、蛋糕 |
| 肉类 | 牛肉、羊肉、猪肉 |

## 🎨 页面说明

### 首页 (`/`)
- 项目介绍和功能展示
- 功能卡片介绍（智能识别、健康分析、健康建议）
- 快速入口到扫描页面
- 健康小贴士（嘌呤知识、升糖指数介绍）

### 扫描页面 (`/scan`)
- 图片上传（支持拖拽和点击上传）
- 图片预览
- AI 识别过程
- 识别结果展示

### 结果页面 (`/result`)
- 食物健康分析结果展示
- 嘌呤等级显示（带颜色标识）
- 升糖指数（GI）显示
- 健康风险提示
- 推荐替代食物列表

## 🛡️ 健康指标说明

### 嘌呤（Purine）

嘌呤是人体代谢的产物，高嘌呤食物可能导致尿酸升高，引发痛风。

| 嘌呤等级 | 含量范围 | 适用人群 | 食用建议 |
|---------|---------|---------|---------|
| 低 | < 50mg/100g | 所有人 | 可自由食用 |
| 中 | 50-150mg/100g | 痛风患者 | 建议适量食用 |
| 高 | > 150mg/100g | 痛风患者 | 应避免食用 |

### 升糖指数（GI）

升糖指数表示食物引起血糖上升的速度。

| GI 等级 | 范围 | 适用人群 | 食用建议 |
|---------|------|---------|---------|
| 低 | < 55 | 糖尿病患者 | 可自由食用 |
| 中 | 55-70 | 所有人 | 建议适量食用 |
| 高 | > 70 | 糖尿病患者 | 应避免食用 |

## 🚢 部署

### 部署到 Vercel（推荐）

1. 将项目推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. 在环境变量中添加所需的配置
5. 点击部署

### 本地构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### Docker 部署

```bash
# 构建镜像
docker build -t foodguard .

# 运行容器
docker run -p 3000:3000 -e OPENAI_API_KEY=your_key foodguard
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发日志

### v0.1.0 (2026-04-07)
- ✅ 实现基本的食物识别功能
- ✅ 集成阿里云通义千问 AI 服务
- ✅ 实现嘌呤和升糖指数分析
- ✅ 添加健康建议系统
- ✅ 完成响应式 UI 设计

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - 优秀的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [阿里云通义千问](https://dashscope.aliyun.com/) - 强大的 AI 服务
- [Supabase](https://supabase.com/) - 开源的 Firebase 替代品
- [Lucide Icons](https://lucide.dev/) - 精美的图标库

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [https://github.com/Chenming00/FoodGuard/issues](https://github.com/Chenming00/FoodGuard/issues)
- Email: [chenming00@example.com](mailto:chenming00@example.com)

---

<p align="center">
  Made with ❤️ by Chenming00
</p>