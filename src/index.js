import Form from './components/Form'
import Select from './components/Select'
import TableHander from './components/TableHander'
import TableMixins from './components/TableHander/TableMixins'
import { TableGlobalConfig } from './components/TableHander/TableGlobalConfig'

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
  
  // 注册 TableHander
  Vue.use(TableHander)
}

// 支持全量引入
export default { install, Form, Select, TableHander, TableMixins, TableGlobalConfig }
// 支持按需引入
export { Form, Select, TableHander, TableMixins, TableGlobalConfig } 