# FridgeChef AI - 冰箱里的智能厨师

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.21-black?style=flat&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Deploy-Vercel-blue?style=flat" alt="Deploy">
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> • 
  <a href="#技术栈">技术栈</a> • 
  <a href="#快速开始">快速开始</a> • 
  <a href="#部署">部署</a>
</p>

## 📖 项目简介

FridgeChef AI 是一个基于人工智能技术的智能菜单生成系统，用户只需输入冰箱里的食材，AI 就会为您推荐适合的菜谱，并标出缺少的食材。

### 核心功能

- 🍳 **智能菜单生成** - 输入食材，AI 生成 3-5 道菜
- 📋 **食材清单** - 标出使用的食材和缺少的食材
- 📝 **详细步骤** - 每道菜提供 3-5 步简单做法
- 🏠 **家庭制作** - 适合家庭制作的菜谱推荐
- 🎨 **现代 UI** - 响应式设计，完美适配桌面端和移动端

## 🎯 功能特性

### 1. 智能菜单生成
- 输入食材（支持中英文逗号分隔）
- AI 自动推荐 3-5 道菜
- 标出使用的食材（绿色）
- 标出缺少的食材（红色）

### 2. 详细菜谱信息
- 菜名
- 使用的食材列表
- 缺少的食材列表
- 制作步骤（带序号）

### 3. 用户体验
- Loading 状态提示
- 错误处理和提示
- 响应式设计

## 🛠️ 技术栈

### 前端技术
- **Next.js 14.2.21** - React 框架，支持服务端渲染
- **React 18.3.1** - 前端 UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS 框架
- **Lucide React** - 图标库

### 后端技术
- **Next.js API Routes** - 服务端 API 路由
- **OpenAI API** - AI 模型调用（qwen3.5-plus）

## 🚀 快速开始

### 环境要求

- Node.js 18+ 版本
- npm、yarn、pnpm 或 bun 包管理器
- OpenAI API Key（可选，不填使用模拟数据）

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

3. **配置环境变量** (`.env.local`)
   ```bash
   # OpenAI API 配置（可选）
   OPENAI_API_KEY=your_api_key
   OPENAI_BASE_URL=https://api.openai.com/v1
   MODEL_NAME=qwen3.5-plus
   ```

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
FridgeChef AI/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API 路由
│   ├── page.tsx                   # 首页
│   ├── layout.tsx                 # 布局
│   └── globals.css                # 样式
├── .env.local                     # 环境变量
├── .gitignore                     # Git 忽略配置
├── next.config.mjs                # Next.js 配置
├── package.json                   # 项目依赖
├── tsconfig.json                  # TypeScript 配置
└── README.md                      # 项目说明文档
```

## 🔌 API 接口

### 生成菜单 API (`/api/generate`)

#### 请求方式
`POST /api/generate`

#### 请求参数
```json
{
  "ingredients": ["鸡蛋", "西红柿", "豆腐"]
}
```

#### 响应示例
```json
{
  "success": true,
  "recipes": [
    {
      "name": "西红柿炒鸡蛋",
      "ingredients_used": ["鸡蛋", "西红柿", "葱"],
      "missing_ingredients": ["油", "盐"],
      "steps": [
        "鸡蛋打散，西红柿切块，葱切末",
        "热锅倒油，倒入蛋液炒至凝固盛出",
        "锅中留油，爆香葱末，加入西红柿翻炒至软烂",
        "加入炒好的鸡蛋，调盐，翻炒均匀即可"
      ]
    }
  ]
}
```

## 🎨 使用示例

### 输入示例
```
鸡蛋, 西红柿, 豆腐, 青椒
```

### 输出示例
```
1. 西红柿炒鸡蛋
   - 使用：鸡蛋, 西红柿, 葱
   - 缺少：油, 盐
   - 步骤：
     1. 鸡蛋打散，西红柿切块，葱切末
     2. 热锅倒油，倒入蛋液炒至凝固盛出
     3. 锅中留油，爆香葱末，加入西红柿翻炒至软烂
     4. 加入炒好的鸡蛋，调盐，翻炒均匀即可

2. 番茄豆腐汤
   - 使用：西红柿, 豆腐, 葱
   - 缺少：盐, 香油
   - 步骤：
     1. 西红柿切块，豆腐切块，葱切末
     2. 锅中加少许油，爆香葱末，加入西红柿翻炒出汁
     3. 加入适量清水，煮开后加入豆腐块
     4. 煮2分钟，调盐和香油即可
```

## 🚢 部署

### 部署到 Vercel（推荐）

1. 将项目推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. 添加环境变量：
   - `OPENAI_API_KEY` - OpenAI API 密钥
   - `OPENAI_BASE_URL` - API 地址（可选）
   - `MODEL_NAME` - 模型名称（可选，默认 qwen3.5-plus）
5. 点击部署

### 本地构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📝 环境变量

| 变量名 | 说明 | 是否必需 | 默认值 |
|--------|------|----------|--------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | 否 | - |
| `OPENAI_BASE_URL` | API 地址 | 否 | https://api.openai.com/v1 |
| `MODEL_NAME` | 模型名称 | 否 | qwen3.5-plus |

> **注意**：如果不配置 `OPENAI_API_KEY`，系统将使用模拟数据运行。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - 优秀的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Lucide Icons](https://lucide.dev/) - 精美的图标库
- [OpenAI](https://openai.com/) - AI 模型

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [https://github.com/Chenming00/FoodGuard/issues](https://github.com/Chenming00/FoodGuard/issues)

---

<p align="center">
  Made with ❤️ by Chenming00
</p>