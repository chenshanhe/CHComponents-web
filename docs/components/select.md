# Select 选择器

基于 Element UI 的 Select 组件进行封装，提供了更便捷的数据配置方式。

## 基础用法

适用广泛的基础单选。

::: demo
```vue
<template>
  <div>
    <ch-select
      v-model="value"
      :options="options"
      placeholder="请选择"
    />
    <div style="margin-top: 20px">
      当前选中值：{{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' }
      ]
    }
  }
}
</script>
```
:::

## 多选

适用性较广的基础多选，用 Tag 展示已选项。

::: demo
```vue
<template>
  <div>
    <ch-select
      v-model="value"
      :options="options"
      multiple
      placeholder="请选择"
    />
    <div style="margin-top: 20px">
      当前选中值：{{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' }
      ]
    }
  }
}
</script>
```
:::

## 可搜索

可以利用搜索功能快速查找选项。

::: demo
```vue
<template>
  <div>
    <ch-select
      v-model="value"
      :options="options"
      filterable
      placeholder="请输入关键词搜索"
    />
    <div style="margin-top: 20px">
      当前选中值：{{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' }
      ]
    }
  }
}
</script>
```
:::

## 自定义数据字段

可以通过 `props` 属性自定义数据字段的映射关系。

::: demo
```vue
<template>
  <div>
    <ch-select
      v-model="value"
      :options="options"
      :props="{
        value: 'id',
        label: 'name',
        key: 'id'
      }"
      placeholder="请选择"
    />
    <div style="margin-top: 20px">
      当前选中值：{{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { id: '1', name: '选项1' },
        { id: '2', name: '选项2' },
        { id: '3', name: '选项3' }
      ]
    }
  }
}
</script>
```
:::

## 远程搜索

从服务器搜索数据，输入关键字进行查找。

::: demo
```vue
<template>
  <div>
    <ch-select
      v-model="value"
      :options="options"
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      placeholder="请输入关键词搜索"
    />
    <div style="margin-top: 20px">
      当前选中值：{{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [],
      loading: false
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        // 模拟远程请求
        setTimeout(() => {
          this.loading = false
          this.options = [
            { value: query + '1', label: query + '选项1' },
            { value: query + '2', label: query + '选项2' }
          ]
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>
```
:::

## API

### 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| options | 选项数组 | array | - | [] |
| props | 配置选项，具体见下表 | object | - | { value: 'value', label: 'label', key: 'value' } |
| multiple | 是否多选 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| valueKey | 作为 value 唯一标识的键名 | string | - | value |
| size | 输入框尺寸 | string | medium / small / mini | - |
| clearable | 是否可以清空选项 | boolean | - | false |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | - | false |
| multipleLimit | 多选时用户最多可选择的项目数，为 0 则不限制 | number | - | 0 |
| name | select input 的 name 属性 | string | - | - |
| placeholder | 占位符 | string | - | 请选择 |
| filterable | 是否可搜索 | boolean | - | false |
| allowCreate | 是否允许用户创建新条目 | boolean | - | false |
| filterMethod | 自定义搜索方法 | function | - | - |
| remoteMethod | 远程搜索方法 | function | - | - |
| loading | 是否正在从远程获取数据 | boolean | - | false |
| loadingText | 远程加载时显示的文字 | string | - | 加载中 |
| noMatchText | 搜索条件无匹配时显示的文字 | string | - | 无匹配数据 |
| noDataText | 选项为空时显示的文字 | string | - | 无数据 |
| popperClass | 下拉菜单的类名 | string | - | - |
| reserveKeyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | - | false |
| defaultFirstOption | 在输入框按下回车时，是否默认选中第一个选项 | boolean | - | false |
| popperAppendToBody | 是否将弹出框插入至 body 元素 | boolean | - | true |
| automaticDropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | boolean | - | false |

### props 配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 指定选项的值为选项对象的某个属性值 | string | - | value |
| label | 指定选项标签为选项对象的某个属性值 | string | - | label |
| key | 指定选项的 key 为选项对象的某个属性值 | string | - | value |

### 方法

| 方法名 | 说明 | 参数 |
|------|------|------|
| setOptions | 设置选项数据 | (options: Array) |
| setProps | 设置选项配置 | (props: Object) |

### 事件

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | - | 