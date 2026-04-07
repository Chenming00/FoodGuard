# 冰箱食物保卫者 - 智能菜单生成系统

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.21-black?style=flat&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="License">
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> • 
  <a href="#技术栈">技术栈</a> • 
  <a href="#快速开始">快速开始</a> • 
  <a href="#项目结构">项目结构</a> • 
  <a href="#API接口">API接口</a> • 
  <a href="#部署">部署</a>
</p>

## 📖 项目简介

冰箱食物保卫者是一个基于人工智能技术的智能菜单生成系统，旨在帮助用户充分利用冰箱中的剩余食材，生成健康营养的每日菜单。通过管理您的冰箱食材，系统可以智能推荐使用这些食材的菜谱，并提供详细的营养分析。

### 核心功能

- 📦 **食材管理** - 添加和管理您的冰箱食材，实时监控保质期
- 🍳 **智能菜单生成** - 基于现有食材，AI 智能生成健康菜单
- 📊 **营养分析** - 分析每道菜的热量、蛋白质、碳水、脂肪
- ⚠️ **健康指标** - 提供嘌呤和升糖指数（GI）分析
- 📱 **响应式设计** - 完美适配桌面端和移动端

## 🎯 功能特性

### 1. 食材管理
- 手动添加食材（名称、数量、单位、保质期）
- 食材分类管理（蔬菜、水果、肉类、海鲜、蛋奶、豆制品、主食、调料）
- 食材保质期监控
- 过期预警提醒

### 2. 智能菜单生成
- 基于现有食材自动生成菜单
- 包含早餐、午餐、晚餐
- 智能匹配可用菜谱
- 剩余食材建议

### 3. 营养分析
- 热量（kcal）
- 蛋白质（g）
- 碳水化合物（g）
- 脂肪（g）
- 嘌呤等级（低/中/高）
- 升糖指数（低/中/高）

### 4. 菜谱数据库
- 内置 15+ 种常见家常菜
- 每道菜包含详细制作步骤
- 支持食材替换建议

## 🛠️ 技术栈

### 前端技术
- **Next.js 14.2.21** - React 框架，支持服务端渲染和静态生成
- **React 18.3.1** - 前端 UI 框架
- **TypeScript 5.0** - 类型安全的 JavaScript 超集
- **Tailwind CSS 4** - 原子化 CSS 框架
- **Lucide React** - 现代化的图标库

### 后端技术
- **Next.js API Routes** - 服务端 API 路由
- **内存存储** - 本地数据管理（可扩展为数据库）

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

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   # 或
   bun dev
   ```

4. **访问应用**
   
   打开浏览器，访问 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
FoodGuard/
├── app/                      # Next.js App Router 目录
│   ├── api/                  # API 路由
│   │   ├── ingredients/      # 食材管理 API
│   │   │   └── list/route.ts
│   │   └── menu/             # 菜单生成 API
│   │       └── generate/route.ts
│   ├── ingredients/          # 食材管理页面
│   │   └── page.tsx
│   ├── menu/                 # 菜单页面
│   │   └── page.tsx
│   ├── layout.tsx            # 全局布局
│   ├── page.tsx              # 首页
│   └── globals.css           # 全局样式
├── lib/                      # 库文件
│   ├── types.ts              # TypeScript 类型定义
│   └── menuDatabase.ts       # 菜谱数据库
├── public/                   # 静态资源
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .env.local                # 环境变量配置（可选）
├── .gitignore                # Git 忽略配置
├── next.config.mjs           # Next.js 配置
├── package.json              # 项目依赖
├── tsconfig.json             # TypeScript 配置
└── README.md                 # 项目说明文档
```

## 🔌 API 接口

### 1. 食材管理 API (`/api/ingredients/list`)

#### 获取所有食材
**请求方式**: `GET`

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "西红柿",
      "quantity": 3,
      "unit": "个",
      "expiryDate": "2026-04-15",
      "category": "蔬菜",
      "createdAt": "2026-04-07T10:00:00.000Z"
    }
  ]
}
```

#### 添加食材
**请求方式**: `POST`

**请求参数**:
```json
{
  "name": "西红柿",
  "quantity": 3,
  "unit": "个",
  "expiryDate": "2026-04-15",
  "category": "蔬菜",
  "notes": "新鲜"
}
```

#### 删除食材
**请求方式**: `DELETE`

**请求参数**:
```json
{
  "id": "1"
}
```

### 2. 菜单生成 API (`/api/menu/generate`)

#### 生成菜单
**请求方式**: `POST`

**请求参数**:
```json
{
  "ingredients": ["西红柿", "鸡蛋", "西兰花", "豆腐"]
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "date": "2026-04-07",
    "meals": [
      {
        "type": "breakfast",
        "name": "西红柿炒鸡蛋",
        "ingredients": ["西红柿", "鸡蛋", "葱", "盐", "油"],
        "nutrition": {
          "calories": 220,
          "protein": 12,
          "carbs": 10,
          "fat": 15,
          "purine": "低",
          "gi": "低"
        },
        "instructions": "制作步骤..."
      }
    ],
    "ingredientsUsed": ["西红柿", "鸡蛋", "葱"],
    "suggestions": {
      "remainingIngredients": ["西兰花", "豆腐"],
      "recipesCount": 5
    }
  }
}
```

## 📊 菜谱数据库

项目内置了 15+ 种常见家常菜，涵盖以下类别：

| 食物类别 | 代表菜谱 |
|---------|---------|
| 家常菜 | 西红柿炒鸡蛋、清炒西兰花、青椒炒肉丝 |
| 汤类 | 番茄豆腐汤、蒸鸡蛋羹、紫菜蛋花汤 |
| 凉菜 | 凉拌黄瓜 |
| 主菜 | 土豆炖牛肉 |
| 海鲜 | 蒜蓉粉丝蒸扇贝 |
| 沙拉 | 鸡肉蔬菜沙拉 |

## 🎨 页面说明

### 首页 (`/`)
- 项目介绍和功能展示
- 功能卡片介绍（食材管理、智能菜单、健康分析）
- 快速入口到食材管理和菜单页面
- 健康小贴士（嘌呤知识、升糖指数介绍）

### 食材管理页面 (`/ingredients`)
- 添加食材（名称、数量、单位、保质期、分类）
- 食材列表展示
- 食材过期提醒
- 统计数据（总数、新鲜、即将过期）

### 菜单页面 (`/menu`)
- 生成今日菜单
- 菜单概览（营养统计）
- 菜餐详情（食材、营养、制作步骤）
- 剩余食材建议

## 📊 健康指标说明

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

## 🛠️ 开发说明

### 添加新菜谱
在 `lib/menuDatabase.ts` 文件中添加新的菜谱对象：

```typescript
{
  id: '16',
  name: '新菜谱名称',
  category: '家常菜',
  ingredients: [
    { name: '食材1', quantity: '数量' },
    { name: '食材2', quantity: '数量' }
  ],
  instructions: '制作步骤',
  nutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    purine: '低',
    gi: '低'
  },
  prepTime: 30,
  servings: 2
}
```

### 添加新食材分类
在 `app/ingredients/page.tsx` 文件中添加新的分类：

```typescript
{ value: '新分类', label: '新分类', color: 'bg-xxx-100 text-xxx-800' },
```

## 🚢 部署

### 部署到 Vercel（推荐）

1. 将项目推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. 点击部署

### 本地构建和部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
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
- ✅ 实现基本的食材管理功能
- ✅ 实现智能菜单生成
- ✅ 内置 15+ 种常见菜谱
- ✅ 添加营养分析功能
- ✅ 完成响应式 UI 设计

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - 优秀的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- [Lucide Icons](https://lucide.dev/) - 精美的图标库

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [https://github.com/Chenming00/FoodGuard/issues](https://github.com/Chenming00/FoodGuard/issues)

---

<p align="center">
  Made with ❤️ by Chenming00
</p>