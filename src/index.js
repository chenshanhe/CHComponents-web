import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'

// 导入组件
import Form from './components/Form'
import Select from './components/Select'

// 组件列表
const components = [
  Select,
  Form
]

// 定义 install 方法
const install = function(Vue) {
  if (install.installed) return
  
  // 安装 Element UI
  Vue.use(ElementUI)
  
  // 注册自定义组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Select,
  Form
} 