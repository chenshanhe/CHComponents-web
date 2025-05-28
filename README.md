# CH Components

基于 Vue 2.x + Element UI的桌面端组件库

## 📦 安装

首先安装必要的依赖：

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

### CommonJS 环境

```js
const Vue = require('vue')
const ElementUI = require('element-ui')
const CHComponentsWeb = require('ch-components-web')


Vue.use(ElementUI)
Vue.use(CHComponentsWeb)
```

## 🛠️ 开发

## 📖 文档开发与预览

本项目文档基于 VuePress 搭建，支持 Vue 示例实时预览。

```bash
npm run docs:dev
```

运行上述命令后，访问本地提示的地址即可查看组件文档和示例。