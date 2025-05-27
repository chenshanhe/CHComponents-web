# CH Components

基于 Vue 2.x + Element UI的桌面端组件库

## 📦 安装

```bash
npm install ch-components-web
```

或者使用 yarn:

```bash
yarn add ch-components-web
```

## 🚀 快速开始

### 完整引入

```js
import Vue from 'vue'
import CHComponents from 'ch-components-web'

Vue.use(CHComponents)
```

### 按需引入

```js
import Vue from 'vue'
import { Select, Form } from 'ch-components-web'

Vue.component(Select.name, Select)
Vue.component(Form.name, Form)
```

## 📚 组件文档

### CHSelect 选择器

基于 Element UI Select 的增强选择器组件。

```vue
<template>
  <ch-select 
    v-model="value" 
    :options="options"
    placeholder="请选择"
  />
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' }
      ]
    }
  }
}
</script>
```

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| value / v-model | 绑定值 | string/number | — | — |
| options | 选项数据 | Array | — | [] |
| placeholder | 占位符 | string | — | '请选择' |

### CHForm 表单

基于 Element UI Form 的增强表单组件。

```vue
<template>
  <ch-form 
    :model="formData"
    :rules="rules"
    ref="form"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formData.username" />
    </el-form-item>
  </ch-form>
</template>
```

#### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| model | 表单数据对象 | object | — | — |
| rules | 表单验证规则 | object | — | — |

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build:lib

# 构建演示页面
npm run build
```

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请提交 [Issue](https://github.com/yourusername/ch-components-web/issues)。 