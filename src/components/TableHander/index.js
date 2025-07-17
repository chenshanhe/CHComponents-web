import TableHandler from './TabelHander.js'
import TableMixins from './TableMixins.js'

// 导出主要的类和 mixins
export { TableHandler, TableMixins }

// 默认导出 TableHandler 类
export default TableHandler

// 为 Vue 组件注册提供支持
TableHandler.install = function(Vue) {
  // 将 TableHandler 挂载到 Vue 原型上，方便全局使用
  Vue.prototype.$TableHandler = TableHandler
  // 将 TableMixins 挂载到 Vue 原型上
  Vue.prototype.$TableMixins = TableMixins
} 