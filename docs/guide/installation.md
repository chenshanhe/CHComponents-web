# 安装

## 环境要求

在安装 CH Components Web 之前，请确保你的开发环境满足以下要求：

- **Node.js**: >= 14.18.0
- **Vue**: >= 2.6.14
- **Element UI**: >= 2.15.14

## 安装方式

### 使用 npm 安装

```bash
npm install ch-components-web
```

### 使用 yarn 安装

```bash
yarn add ch-components-web
```

### 使用 pnpm 安装

```bash
pnpm add ch-components-web
```

## 引入方式

### 完整引入

完整引入会将所有组件注册到全局，适合快速开发：

```js
import Vue from 'vue'
import CHComponentsWeb from 'ch-components-web'
import 'ch-components-web/lib/ch-components-web.css'

Vue.use(CHComponentsWeb)
```

### 按需引入

按需引入可以减小打包体积，推荐在生产环境中使用：

```js
import Vue from 'vue'
import { Form, Select, DatePicker, DateTimePicker, TreeSelect } from 'ch-components-web'

// 注册组件
Vue.component('CHForm', Form)
Vue.component('CHSelect', Select)
Vue.component('CHDatePicker', DatePicker)
Vue.component('CHDateTimePicker', DateTimePicker)
Vue.component('CHTreeSelect', TreeSelect)
```

### 自动按需引入

如果你使用 babel-plugin-component，可以实现自动按需引入：

```bash
npm install babel-plugin-component -D
```

然后在 `.babelrc` 或 `babel.config.js` 中添加：

```js
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "ch-components-web",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

## 样式引入

### 引入样式文件

```js
import 'ch-components-web/lib/ch-components-web.css'
```

### 按需引入样式

```js
import 'ch-components-web/lib/theme-chalk/form.css'
import 'ch-components-web/lib/theme-chalk/select.css'
import 'ch-components-web/lib/theme-chalk/date-picker.css'
```

## 配置

### Vue CLI 配置

如果你使用 Vue CLI，可以在 `vue.config.js` 中添加配置：

```js
module.exports = {
  transpileDependencies: ['ch-components-web']
}
```

### Webpack 配置

如果你使用 Webpack，可以添加以下配置：

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

## 验证安装

安装完成后，你可以在项目中测试组件是否正常工作：

```vue
<template>
  <div>
    <ch-button type="primary">测试按钮</ch-button>
  </div>
</template>

<script>
export default {
  name: 'TestComponent'
}
</script>
```

如果按钮正常显示，说明安装成功。

## 常见问题

### 1. 样式不生效

确保已经正确引入了样式文件：

```js
import 'ch-components-web/lib/ch-components-web.css'
```

### 2. 组件未注册

检查是否正确注册了组件：

```js
Vue.use(CHComponentsWeb)
// 或者
Vue.component('CHButton', Button)
```

### 3. 版本冲突

如果遇到版本冲突，可以尝试：

```bash
npm install ch-components-web --force
```

或者检查 package.json 中的依赖版本是否兼容。 