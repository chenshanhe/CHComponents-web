# 指南

欢迎使用 CH Components Web！

CH Components Web 是一个基于 Vue 2.x 和 Element UI 的桌面端组件库，提供了丰富的组件和功能，帮助开发者快速构建企业级应用。

## 特性

- 🚀 **开箱即用**：基于 Element UI，提供丰富的组件和功能
- 🎨 **设计统一**：遵循统一的设计规范，提供一致的用户体验
- 📦 **按需引入**：支持按需引入，减小打包体积，提升应用性能
- 🔧 **高度可定制**：提供丰富的配置选项，满足不同业务需求
- 📱 **响应式设计**：支持多种屏幕尺寸，适配桌面端和移动端
- 🛠️ **易于维护**：代码结构清晰，文档完善，便于维护和扩展

## 环境要求

- Node.js >= 14.18.0
- Vue >= 2.6.14
- Element UI >= 2.15.14

## 快速开始

### 1. 安装

```bash
npm install ch-components-web
```

### 2. 引入

#### 完整引入

```js
import Vue from 'vue'
import CHComponentsWeb from 'ch-components-web'
import 'ch-components-web/lib/ch-components-web.css'

Vue.use(CHComponentsWeb)
```

#### 按需引入

```js
import Vue from 'vue'
import { Form, Select, DatePicker } from 'ch-components-web'

Vue.component('CHForm', Form)
Vue.component('CHSelect', Select)
Vue.component('CHDatePicker', DatePicker)
```

### 3. 使用

```vue
<template>
  <div>
    <ch-form :model="form" :rules="rules">
      <ch-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </ch-form-item>
      <ch-form-item label="日期" prop="date">
        <ch-date-picker v-model="form.date" />
      </ch-form-item>
    </ch-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        date: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
```

## 下一步

- 查看 [安装指南](/guide/installation.md) 了解详细的安装步骤
- 查看 [使用指南](/guide/usage.md) 了解如何使用组件
- 查看 [组件文档](/components/) 了解所有可用的组件 