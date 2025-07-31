module.exports = {
  // 只保留开发和演示页面相关配置
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'lodash': 'lodash',
      'dayjs': 'dayjs'
    }
  }
} 