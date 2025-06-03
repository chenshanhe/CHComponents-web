# CH Components

🚀 基于 Vue 2.x + Element UI的桌面端组件库  
✨ 运用 JSON 配置快速完成表单搭建  
💪 简单易用、灵活可扩展  
🎨 提供丰富的组件和样式  
🔧 开箱即用的配置能力

## 📦 安装

> 本组件库依赖于 `vue` 和 `element-ui`，请确保项目中已安装这两个依赖。

如未安装，请先执行：

```bash
npm install vue@^2.6.14 element-ui@^2.15.14
# 或者
yarn add vue@^2.6.14 element-ui@^2.15.14
```

然后安装组件库：

```bash
npm install ch-components-web
# 或者
yarn add ch-components-web
```

## 🚀 快速开始

### 完整引入

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CHComponentsWeb from 'ch-components-web'

Vue.use(ElementUI)
Vue.use(CHComponentsWeb)
```

### 按需引入

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Select, Form } from 'ch-components-web'

Vue.use(ElementUI)
Vue.component(Select.name, Select)
Vue.component(Form.name, Form)
```

## 🛠️ 本地开发

克隆项目后，安装依赖并启动开发环境：

```bash
npm install
npm run dev
```

## 📖 文档开发与预览

本项目文档基于 VuePress 搭建，支持 Vue 示例实时预览。

```bash
npm run docs:dev
```

运行上述命令后，访问本地提示的地址即可查看组件文档和示例。

---

<p align="right" style="font-size: 12px; color: #888;">作者：chensh</p>
