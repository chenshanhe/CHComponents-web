import Vue from 'vue'
import CHComponentsWeb from '../src/index'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(CHComponentsWeb)
} 