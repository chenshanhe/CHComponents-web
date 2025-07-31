import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'CHComponents',
  description: 'CHComponents 组件库文档',
  theme: defaultTheme({
    // 导航栏
    navbar: [
      { text: '首页', link: '/' },
      { text: '更新日志', link: '/CHANGELOG.html' },
      { text: '组件', link: '/docs/components/' },
      { text: '表格辅助', link: '/docs/tableHandler/' },
      { text: 'GitHub', link: 'https://github.com/chenshanhe/CHComponents-web' },
      { text: 'npm', link: 'https://www.npmjs.com/package/ch-components-web' },
      {
        text: '更多资源',
        children: [
          { text: '移动端组件', link: 'https://github.com/chenshanhe/CHComponents-mobile' },
          { text: '工具类', link: 'https://github.com/chenshanhe/CHComponents-utils' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/docs/components/': [
        {
          text: '组件',
          children: [
            '/docs/components/',
            {
              text: '基础组件',
              children: [
                '/docs/components/select',
                '/docs/components/form',
              ]
            }
          ]
        }
      ],
      '/docs/tableHandler/': [
        {
          text: '表格辅助',
          children: [
            '/docs/tableHandler/',
            '/docs/tableHandler/Introduction',
            '/docs/tableHandler/QuicklyUse',
            '/docs/tableHandler/API',
            '/docs/tableHandler/BestUse'
          ]
        }
      ]
    },

    // 仓库信息
    repo: 'chenshanhe/CHComponents-web',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'main',
    editLink: true,
    editLinkText: '编辑此页',
    lastUpdated: true,
    contributors: true,
  }),

  plugins: [
    // 搜索插件
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
      },
    }),
  ],

  // Markdown 配置
  markdown: {
    toc: {
      level: [2, 3]
    }
  },

  // 头部
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],

  // Vite 配置
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@': '/Users/chensh/DEV/CHComponents/CHComponents-web/src'
        }
      }
    }
  }),
}) 