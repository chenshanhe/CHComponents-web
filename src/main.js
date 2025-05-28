import Vue from 'vue'
import App from './App.vue'
import CHComponentsWeb from './index.js'

Vue.config.productionTip = false

// 使用组件库
Vue.use(CHComponentsWeb)

// 创建Vue实例用于开发环境演示
new Vue({
  render: h => h(App),
}).$mount('#app') 