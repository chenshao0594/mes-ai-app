# MES-AI-APP 移动办公应用

<p align="center">
  <img width="160" src="./src/static/logo.svg" alt="MES-AI-APP Logo">
</p>

<div align="center">

![Node Version](https://img.shields.io/badge/node-%3E%3D18-green)
![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D7.30-green)
![Vue Version](https://img.shields.io/badge/vue-3.4-blue)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

基于 **unibest** 框架开发的企业级移动办公应用，支持 **H5**、**微信小程序**、**APP** 多端运行。采用 `uniapp` + `Vue3` + `TypeScript` + `Vite5` + `UnoCSS` + `wot-design-uni` 等现代前端技术栈。

---

## ✨ 功能特性

### 🔐 用户认证

- 用户名/密码登录
- 手机号验证码登录
- 第三方社交登录（微信等）
- 多租户支持

### 📋 工作流审批 (BPM)

- 待办任务列表
- 已办任务查询
- 抄送给我的流程
- 我发起的流程
- 流程审批/驳回操作

### 🖥️ 工作台

- 用户管理
- 角色管理
- 菜单管理

### 📱 其他功能

- 消息中心
- 通讯录
- 个人中心
- 系统设置

---

## 🛠️ 技术栈

| 技术              | 版本   | 说明                   |
| ----------------- | ------ | ---------------------- |
| Vue               | 3.4.21 | 渐进式 JavaScript 框架 |
| Vite              | 5.2.8  | 下一代前端构建工具     |
| TypeScript        | 5.9.3  | JavaScript 超集        |
| UnoCSS            | 0.58.9 | 原子化 CSS 引擎        |
| wot-design-uni    | 1.13.0 | UI 组件库              |
| z-paging          | 2.8.8  | 分页下拉刷新组件       |
| Pinia             | 2.0.36 | Vue 状态管理           |
| @dcloudio/uni-app | 4.87   | uniapp 核心 (Compiler) |

---

## 📁 项目结构

```
src/
├── components/        # 公共组件
│   └── fg-tabbar/     # 自定义底部导航栏
├── hooks/             # 组合式函数
│   ├── useRequest.ts  # 请求封装
│   └── useUpload.ts   # 文件上传
├── interceptors/      # 拦截器
│   ├── request.ts     # 请求拦截器（Token、租户）
│   └── route.ts       # 路由拦截器（登录保护）
├── layouts/           # 布局组件
│   ├── default.vue    # 默认布局
│   └── tabbar.vue     # TabBar 布局
├── pages/             # 页面目录
│   ├── login/         # 登录相关页面
│   ├── work/          # 工作台
│   ├── task/          # 审批任务
│   ├── message/       # 消息中心
│   ├── contacts/      # 通讯录
│   ├── colab/         # 协作
│   └── my/            # 个人中心
├── pages-sub/         # 分包页面
├── service/           # API 接口定义
├── store/             # Pinia 状态管理
│   ├── user.ts        # 用户状态
│   └── dict.ts        # 字典数据
├── static/            # 静态资源
├── style/             # 全局样式
├── types/             # TypeScript 类型定义
└── utils/             # 工具函数
    ├── auth.ts        # 认证相关
    ├── dict.ts        # 字典工具
    ├── http.ts        # HTTP 封装
    └── platform/      # 多平台适配
```

---

## ⚙️ 环境要求

- **Node.js** >= 18
- **pnpm** >= 7.30
- **VSCode**（推荐）或 WebStorm
- 微信开发者工具（小程序开发）
- HBuilderX（APP 开发）

---

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发运行

```bash
# H5 端
pnpm dev:h5

# 微信小程序
pnpm dev:mp-weixin

# APP 端
pnpm dev:app
```

### 3. 构建发布

```bash
# H5 端
pnpm build:h5

# 微信小程序
pnpm build:mp-weixin

# APP 端
pnpm build:app
```

---

## 📦 多平台支持

| 平台         | 开发命令             | 构建命令               | 说明                      |
| ------------ | -------------------- | ---------------------- | ------------------------- |
| H5           | `pnpm dev:h5`        | `pnpm build:h5`        | 浏览器运行，端口 9000     |
| 微信小程序   | `pnpm dev:mp-weixin` | `pnpm build:mp-weixin` | 需配合微信开发者工具      |
| APP          | `pnpm dev:app`       | `pnpm build:app`       | 需配合 HBuilderX          |
| 支付宝小程序 | `pnpm dev:mp-alipay` | `pnpm build:mp-alipay` | 需配合支付宝开发者工具    |
| 其他小程序   | `pnpm dev:mp-*`      | `pnpm build:mp-*`      | 参见 package.json scripts |

---

## 🔧 项目配置

### 环境变量

在 `env/` 目录下创建环境配置文件：

- `.env.development` - 开发环境
- `.env.production` - 生产环境

```env
# 应用标题
VITE_APP_TITLE=MES-AI-APP

# API 基础地址
VITE_SERVER_BASEURL=https://api.example.com

# 是否启用代理（H5 开发时）
VITE_APP_PROXY=true

# 微信小程序 AppID
VITE_WX_APPID=your_wx_appid

# 多租户开关
VITE_APP_TENANT_ENABLE=true
```

### 页面路由配置

本项目使用 **约定式路由**，在 Vue 文件中通过 `<route>` 块配置：

```vue
<route lang="json5">
{
  layout: 'tabbar', // 布局类型
  style: {
    navigationBarTitleText: '工作台'
  },
  needLogin: true // 是否需要登录
}
</route>
```

---

## 🔐 权限流程

1. 用户登录获取 `accessToken` 和 `refreshToken`
2. `accessToken` 存储在本地，请求时自动携带
3. 路由拦截器判断页面是否需要登录
4. 需要登录的页面会自动拉取用户信息和权限
5. 请求拦截器自动添加 Token 和租户信息

---

## 📐 开发规范

### 代码风格

- 使用 **ESLint** + **Prettier** 进行代码格式化
- 使用 **Stylelint** 规范 CSS/SCSS 样式
- 使用 **commitlint** 规范 Git 提交信息

### 提交规范

```bash
# 使用交互式提交
pnpm cz

# 提交格式
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具
```

---

## 📚 相关文档

- [unibest 文档](https://codercup2.github.io/unibest-docs/)
- [wot-design-uni 组件库](https://wot-design-uni.cn/)
- [z-paging 文档](https://z-paging.zxlee.cn/)
- [UnoCSS 文档](https://unocss.dev/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [uni-app 文档](https://uniapp.dcloud.net.cn/)

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

---

## 📄 License

[MIT](https://opensource.org/license/mit/)
