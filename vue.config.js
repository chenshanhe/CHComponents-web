const path = require('path')

module.exports = {
  // 修改 pages 入口
  pages: {
    index: {
      entry: 'src/main.js', // 开发环境入口
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    // 库模式不打包公共依赖
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT'
    })
  },
  css: {
    extract: false // 不提取 CSS 到单独文件
  }
} 