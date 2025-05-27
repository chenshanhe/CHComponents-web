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


### 按需加载（使用 babel-plugin-import）

1. 安装插件：
```bash
npm install babel-plugin-import -D
```

2. 配置 babel.config.js：
```js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'ch-components-web',
        libraryDirectory: 'src/components',
        style: false
      }
    ]
  ]
}
```

3. 使用组件：
```js
import Vue from 'vue'
import { Select, Form } from 'ch-components-web'

Vue.use(Select)
Vue.use(Form)
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建演示页面
npm run build
```

## 📦 发布

```bash
# 发布到 npm
npm publish
```

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请提交 [Issue](https://github.com/chenshanhe/CHComponents-web/issues)。 