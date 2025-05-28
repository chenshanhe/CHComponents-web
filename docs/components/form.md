# Form 表单

基于 Element UI 的 Form 组件进行封装，提供了更便捷的表单配置方式。

## 基础用法

通过 `settings` 属性配置表单项。

```vue
<template>
  <ch-form
    :settings="settings"
    @submit="onSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          type: 'input',
          label: '用户名',
          prop: 'username',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        },
        {
          type: 'select',
          label: '性别',
          prop: 'gender',
          options: [
            { value: 'male', label: '男' },
            { value: 'female', label: '女' }
          ]
        }
      ]
    }
  },
  methods: {
    onSubmit(formData) {
      console.log('表单数据：', formData)
    }
  }
}
</script>
```

## 表单验证

支持表单验证功能。

```vue
<template>
  <ch-form
    :settings="settings"
    @submit="onSubmit"
    @submitError="onSubmitError"
  />
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          type: 'input',
          label: '用户名',
          prop: 'username',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        },
        {
          type: 'input',
          label: '密码',
          prop: 'password',
          rules: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/, message: '密码必须包含大小写字母和数字，长度8-20位', trigger: 'blur' }
          ]
        }
      ]
    }
  },
  methods: {
    onSubmit(formData) {
      console.log('验证通过，表单数据：', formData)
    },
    onSubmitError(error) {
      console.log('验证失败：', error)
    }
  }
}
</script>
```

## 动态表单

支持动态显示/隐藏表单项。

```vue
<template>
  <ch-form
    :settings="settings"
    @submit="onSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          type: 'select',
          label: '类型',
          prop: 'type',
          options: [
            { value: '1', label: '类型1' },
            { value: '2', label: '类型2' }
          ]
        },
        {
          type: 'input',
          label: '类型1特有字段',
          prop: 'type1Field',
          vShow: () => this.formObj.type === '1'
        },
        {
          type: 'input',
          label: '类型2特有字段',
          prop: 'type2Field',
          vShow: () => this.formObj.type === '2'
        }
      ]
    }
  },
  methods: {
    onSubmit(formData) {
      console.log('表单数据：', formData)
    }
  }
}
</script>
```

## API

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| settings | 表单项配置数组 | array | - | [] |
| inline | 行内表单模式 | boolean | - | false |
| labelPosition | 表单域标签的位置 | string | right / left / top | right |
| labelWidth | 表单域标签的宽度 | string | - | auto |
| labelSuffix | 表单域标签的后缀 | string | - | - |
| hideRequiredAsterisk | 是否显示必填字段的标签旁边的红色星号 | boolean | - | false |
| showMessage | 是否显示校验错误信息 | boolean | - | true |
| inlineMessage | 是否以行内形式展示校验信息 | boolean | - | false |
| statusIcon | 是否在输入框中显示校验结果反馈图标 | boolean | - | false |
| validateOnRuleChange | 是否在 rules 属性改变后立即触发一次验证 | boolean | - | true |
| size | 用于控制该表单内组件的尺寸 | string | medium / small / mini | - |
| disabled | 是否禁用该表单内的所有组件 | boolean | - | false |

### settings 配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 表单项类型 | string | input / select / ... | - |
| label | 标签文本 | string | - | - |
| prop | 表单域 model 字段 | string | - | - |
| rules | 表单验证规则 | array | - | - |
| labelWidth | 标签宽度 | string | - | - |
| required | 是否必填 | boolean | - | false |
| error | 表单域验证错误信息 | string | - | - |
| showMessage | 是否显示校验错误信息 | boolean | - | true |
| inlineMessage | 是否以行内形式展示校验信息 | boolean | - | false |
| size | 输入框尺寸 | string | medium / small / mini | - |
| vShow | 是否显示表单项 | boolean / function | - | true |
| defaultValue | 默认值 | any | - | - |
| itemOptions | 表单项组件的其他属性 | object | - | - |

### 方法

| 方法名 | 说明 | 参数 |
|------|------|------|
| getFormRef | 获取表单实例 | - |
| resetForm | 重置表单 | - |
| getRef | 获取表单项组件实例 | (refName: string) |
| action | 调用表单项组件的方法 | (refName: string, actionName: string, ...args) |

### 事件

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| submit | 表单提交时触发 | (formData: object) |
| submitError | 表单验证失败时触发 | (error: object) | 