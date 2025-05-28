module.exports = {
  title: 'CHComponents',
  description: 'CHComponents 组件库文档',
  base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '更新日志', link: '/CHANGELOG.html' },
      { text: '组件', link: '/docs/components/' },
      { text: 'github', link: 'https://github.com/chenshanhe/CHComponents-web' },
      { text: 'npm', link: 'https://www.npmjs.com/package/ch-components-web' },
      {
        text: '更多资源', items: [
          { text: '移动端组件', link: 'https://github.com/chenshanhe/CHComponents-mobile' },
          { text: '工具类', link: 'https://github.com/chenshanhe/CHComponents-utils' }
        ]
      }
    ],
    sidebar: {
      '/docs/components/': [
        {
          title: '组件',
          collapsable: false,
          children: [
            ['/docs/components/', '组件列表'],
            {
              title: '基础组件',
              collapsable: true,
              children: [
                {
                  title: 'Select 选择器',
                  path: '/docs/components/select',
                  collapsable: false
                },
                {
                  title: 'Form 表单',
                  path: '/docs/components/form',
                  collapsable: false
                }
              ]
            }
            // 其他组件将自动添加
          ]
        }
      ]
    }
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: './docs'
      }
    ],
    'demo-container'
  ],
  markdown: {
    lineNumbers: true,
  }
} 