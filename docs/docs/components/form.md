[[toc]]

# ChForm 表单组件

基于 Element UI 的 el-form 进行二次封装，支持通过 JSON 配置快速生成表单。支持 Element 原生表单项和自定义组件，极大提升表单开发效率。

## 组件特性
- 支持 JSON 配置一键生成表单
- 支持 Element 原生表单项和自定义组件混用
- 支持表单项动态显示/隐藏、校验、联动
- 支持生命周期 mixins、方法传入
- 兼容原生 el-form 的大部分属性和事件


## 基础用法
### 通过 JSON 配置快速生成表单

只需传入 `settings` 配置数组，即可自动渲染表单项。每个表单项支持 type、label、prop、itemOptions 等属性，详见下方 API。

::: demo
```vue
<template>
  <ch-form :settings="settings" ref="chForm" />
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          type: 'input',
          label: '姓名',
          prop: 'name',
          itemOptions: {
            placeholder: '请输入姓名',
            style: { width: '240px' }
          },
          required:true
        },
        {
          type: 'select',
          label: '性别',
          prop: 'gender',
          itemOptions: {
            placeholder: '请选择',
            style: { width: '240px' },
            options: [
              { value: 'male', label: '男' },
              { value: 'female', label: '女' }
            ]
          },
          rules:{ required: true, message: '请选择性别',trigger: 'blur' }
        },
        {
          type: 'button',
          prop: 'submitBtn',
          itemOptions: {
            label: '提交',
            type: 'primary',
            eventHandlers:{
              click: () => this.handleSubmit()
            }
          }
        }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.chForm.validateAndSubmit()
      .then(result => { 
        if (result) {
          // 提交逻辑
          this.$message.success('提交成功:' + JSON.stringify(result))
        }else{
          this.$message.error('提交有错误')
        }
      })
    }
  }
}
</script>
```
:::

## 结构与分层说明
### DOM 结构示意
```text
ch-form 组件结构 
└── el-form             // ChForm 负责的表单区域
    ├── el-form-item    // settings 配置对应的表单项
    │   └── component   // itemOptions 配置的具体控件
    └── el-form-item    
        └── component（可用 element 原生或自定义组件）   
```
- `el-form` - ChForm 负责的表单区域
- `el-form-item` - settings 配置生效区域
- `component` - itemOptions 配置生效区域

## ref 获取与操作
### 如何通过 ref 获取 ChForm/表单项/控件实例
:::demo 用户通过在引用时设置 ref 来进行获取
``` vue
<template>
  <!-- 设置组件ref为chForm -->
  <ch-form :settings="settings" ref="chForm" />
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          type: 'input',
          label: '姓名',
          prop: 'name',
          itemOptions: {
            placeholder: '请输入姓名',
            style: { width: '240px' }
          },
        },
        {
          type: 'button',
          prop: 'submitBtn',
          itemOptions: {
            label: '提交',
            type: 'primary',
            eventHandlers:{
              click: () => this.handleSubmit()
            }
          }
        }
      ]
    }
  },
  methods: {
    handleSubmit() {
      //通过$refs['chForm']获取对象
      this.$refs.chForm.validateAndSubmit()
      .then(result => { 
        if (result) {
          // 提交逻辑
          this.$message.success('提交成功:' + JSON.stringify(result))
        }else{
          this.$message.error('提交有错误')
        }
      })
    }
  }
}
</script>
```
:::
#### ChForm 可用方法
| 方法名 | 说明 | 参数 | 返回值 |
|--------------------|--------------------------------------|-------------------------------------|----------------|
| validate | 校验表单，返回 Promise | — | Promise\<Boolean\> |
| submit | 触发表单提交事件，返回表单数据对象 | — | formObj |
| validateAndSubmit | 校验表单并自动提交，返回 Promise | — | Promise<formObj\|false> |
| resetFields | 重置表单校验与数据（使用el-form的清空指令） | — | void |
| resetForm | 重置表单数据为初始值 | — | void |
| getFormRef | 获取 el-form 实例 | — | el-form 实例 |
| getComponentRef | 获取某个表单项组件实例 | refName | 组件实例 |

### el-form 的 ref 获取与方法
el-form 的 ref 由 ChForm 组件自动生成，包含 ChForm 组件的内置 id。
可使用 ChForm 的 `getFormRef` 获取。
#### el-form 可用方法
请参考
[element文档:el-form可用方法](https://element.eleme.cn/#/zh-CN/component/form#form-methods)
### component的`ref`设置与获取
component的`ref`由`settings`配置自动生成，包含Chform组件的内置id，优先使用`settings[index][ref]`配置进行生成，`ref`配置项不存在时，使用`settings[index][prop]`生成。
用户可以通过`Chform.getComponentRef(ref|prop)`获取component
#### component 可用方法
详见各组件文档

## 传入父组件的组件实例
在ChForm中使用父组件的方法
settings在父组件中调用时，可以通过 `() => this.XXX()`的方式调用父组件方法。

## 事件监听
ChForm提供两种事件监听方法:  
1.通过`settings[index][itemOptions][eventHandlers]`进行配置，被配置的方法会在事件发生时被调用
```javascript
  data(){
    return {
      settings:[
        {
          type: 'button',
          prop: 'submitBtn',
          itemOptions: {
            label: '提交',
            type: 'primary',
            eventHandlers:{
              click: () => this.handleSubmit()
            }
          }
        }
      ]
    }
  }
  ...
  methods:{
    handleSubmit(){
      console.log('button click!')
    }
  }
```
2.在ChFrom组件上注册事件监听
:::: tabs
::: tab Vue
  ```vue
  <template>
    <!-- 设置组件ref为chForm -->
    <ch-form :settings="settings" ref="chForm" 
    @submitBtn1_click="handleSubmit"/>
  </template>
  ```
:::
::: tab JavaScript
  ```js
  data(){
      return {
        settings:[
          {
            type: 'button',
            prop: 'submitBtn1',
            itemOptions: {
              label: '提交',
              type: 'primary',
            }
          }
        ]
      }
    }
    ...
    methods:{
      handleSubmit(){
        console.log('button click!')
      }
    }
  ```
:::
::::
## 结合TableMixins
:::: tabs
::: tab Vue
```vue
<!-- ref配置为queryForm -->
<ChForm
  :settings="querySettings"
  :model.sync="queryForm"
  size="mini"
  :inline="true"
  ref="queryForm"
  @submitBtn_click="query"
  @resetBtn_click="reset"
/>
```
:::
::: tab JavaScript
  ```js
    mixins: [TableMixins],
    data() {
      return {
        requestApi:XXX,
        querySettings:[
          {
            type: 'input',
            label: '名称',
            prop: 'name',
            itemOptions: {
              placeholder: '请输入',
              style: {
                width: '240px'
              }
            }
          },
          {
            type: 'select',
            label: '性别',
            prop: 'gender',
            itemOptions: {
              placeholder: '请输入',
              style: {
                width: '240px'
              },
              options: [
                { value: 'male', label: '男' },
                { value: 'female', label: '女' }
              ]
            }
          },
          {
            type: 'button',
            label: '',
            prop: 'submitBtn',
            itemOptions: {
              label: '搜索',
              type: 'primary',
              size: 'mini',
              leftIcon: 'el-icon-search',
            }
          }, {
            type: 'button',
            label: '',
            prop: 'resetBtn',
            itemOptions: {
              label: '重置',
              size: 'mini',
              leftIcon: 'el-icon-refresh',
            }
          }

        ]
      }
    }
  ```
:::
::::
## 最佳实践
### 文件结构
  ``` 
  userManager
  ├── index.vue     # 页面组件
  └── queryForm.js  # 查询表单配置
  ```
### 示例
:::: tabs
::: tab index.vue
```vue
<template>
  <div class="app-container">
    <ChForm
      :settings="querySettings"
      :model.sync="queryForm"
      size="mini"
      :inline="true"
      ref="queryForm"
      @submitBtn_click="query"
    />
    <!-- @resetBtn_click="reset" 将在queryFrom.js中演示另一种事件监听方法-->
  </div>
</template>

<script>
//引入TableMixins和ChForm，如全局引入可忽略
import { getList } from '@/api/users' 
import queryFromSettings from "./queryFrom";

export default {
  mixins: [TableMixins],//mixins中实现了query、reset方法，详见TableMixins文档
  components: {
    ChForm,//如全局引入可忽略
  },
  data() {
    return {
      requestApi: getList,
      querySettings: queryFromSettings(this),//传入父组件实例，可在后续使用
    };
  },
  methods: {
    //在onMounted调用时会输出_this，为component组件的实例，以此可以在组件mounted时控制component
    setStatusOptions(_this){
      _this.setOptions(
        [
          { value: '0', label: '在用' },
          { value: '1', label: '停用' }
        ]
      )
    }
  },
};
</script>
```
:::
::: tab queryForm.js
``` js
export default function queryFrom(that) {
  return [
    {
      type: 'input',
      label: '姓名',
      prop: 'name',
      itemOptions: {
        placeholder: '请输入',
        style: {
          width: '240px'
        }
      }
    },
    {
      type: 'select',
      label: '性别',
      prop: 'gender',
      itemOptions: {
        placeholder: '请输入',
        style: {
          width: '240px'
        },
        options: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' }
        ]
      }
    },
    {
      type: 'select',
      label: '状态',
      prop: 'status',
      itemOptions: {
        placeholder: '请输入',
        style: {
          width: '240px'
        },
        onMounted:that.setStatusOptions,//使用组件调用处的方法
      }
    },
    {
      type: 'input',
      label: '年龄',
      prop: 'age',
      defaultValue:18,
      itemOptions: {
        placeholder: '请输入',
        style: {
          width: '240px'
        }
      }
    },
    {
      type: 'button',
      label: '',
      prop: 'submitBtn',
      itemOptions: {
        label: '搜索',
        type: 'primary',
        size: 'mini',
        leftIcon: 'el-icon-search',
      }
    }, {
      type: 'button',
      label: '',
      prop: 'resetBtn',
      itemOptions: {
        label: '重置',
        size: 'mini',
        leftIcon: 'el-icon-refresh',
        eventHandlers: {
          click:that.reset //使用eventHandlers监听click方法
        }
      }
    }
  ]
}
```
:::
::::


## API

### ChForm 属性（Form表单本身的属性）
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| model.sync | 父组件表单对象 | Object | - | {} |
| settings | 表单项配置数组 | array | 见下表 | [] |
| inline | 行内表单模式 | boolean | true/false | false |
| labelPosition | 标签位置 | string | right/left/top | right |
| labelWidth | 标签宽度 | string | - | - |
| labelSuffix | 标签后缀 | string | - | - |
| hideRequiredAsterisk | 隐藏必填星号 | boolean | true/false | false |
| showMessage | 显示校验信息 | boolean | true/false | true |
| inlineMessage | 行内校验信息 | boolean | true/false | false |
| statusIcon | 显示校验图标 | boolean | true/false | false |
| validateOnRuleChange | 校验规则变化时自动校验 | boolean | true/false | true |
| size | 组件尺寸 | string | medium/small/mini | - |
| disabled | 禁用表单 | boolean | true/false | false |
| onBeforeCreate | 组件创建前钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onCreated | 组件创建后钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onBeforeMount | 组件挂载前钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onMounted | 组件挂载后钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onBeforeUpdate | 组件更新前钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onUpdated | 组件更新后钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onBeforeDestroy | 组件销毁前钩子，`_this` 指向组件实例 |Function | - | (_this)=>{} |
| onDestroyed | 组件销毁后钩子，`_this` 指向组件实例 |Function | - | (_this)=>{} |
| eventHandlers | 事件处理对象，键为事件名，值为对应的回调函数。可用于自定义组件事件监听，所有回调的 this 均指向当前组件实例。 | Object | - | {}

### settings 配置项
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| type | 表单项类型（input/select/button/component等） | string | - | - |
| label | 标签文本 | string | - | - |
| prop | 字段名 | string | - | - |
| itemOptions | 传递给表单项组件的属性 | object | - | {} |
| required | 是否必填 | boolean | true/false | false |
| rules | 校验规则 | array | - | - |
| vShow | 是否显示 | boolean | true/false | true |
| vIf | 是否渲染 | boolean | true/false | true |
| error | 手动设置错误信息 | string | - | - |
| ref | 组件ref名,不填写时优先按照prop生成 | string | - | 根据prop生成 |
### itemOptions 配置项
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| style | 组件样式 ｜ Object ｜ - ｜ {} |
| onBeforeCreate | 组件创建前钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onCreated | 组件创建后钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onBeforeMount | 组件挂载前钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onMounted | 组件挂载后钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onBeforeUpdate | 组件更新前钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onUpdated | 组件更新后钩子，`_this` 指向组件实例 | Function | - |(_this)=>{} |
| onBeforeDestroy | 组件销毁前钩子，`_this` 指向组件实例 |Function | - | (_this)=>{} |
| onDestroyed | 组件销毁后钩子，`_this` 指向组件实例 |Function | - | (_this)=>{} |
| eventHandlers | 事件处理对象，键为事件名，值为对应的回调函数。可用于自定义组件事件监听，所有回调的 this 均指向当前组件实例。 | Object | - | {}
| `[key]` | 其他配置，参考具体组件文档 | `Value` | - | - |

### 事件
| 事件名 | 说明 | 回调参数 |
|------|------|------|
| submit | 表单提交时触发 | formObj |
| [prop]_[eventName] | 某个表单项自定义事件 | eventBody |

---

如需更复杂的用法（如自定义组件、联动、生命周期等），请参考更多示例或源码文档。 