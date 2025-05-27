import Vue from 'vue'
import App from './App.vue'
import CHComponents from './index.js'

Vue.config.productionTip = false

// 使用组件库
Vue.use(CHComponents)

new Vue({
  render: h => h(App),
}).$mount('#app') 