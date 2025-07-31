# CH Components Web

🚀 **基于 Vue 2.x + Element UI 的桌面端组件库**  
✨ **运用 JSON 配置快速完成表单搭建**  
💪 **简单易用、灵活可扩展**  
🎨 **提供丰富的组件和样式**  
🔧 **开箱即用的配置能力**

[![npm version](https://img.shields.io/npm/v/ch-components-web.svg)](https://www.npmjs.com/package/ch-components-web)
[![npm downloads](https://img.shields.io/npm/dm/ch-components-web.svg)](https://www.npmjs.com/package/ch-components-web)
[![license](https://img.shields.io/npm/l/ch-components-web.svg)](https://github.com/chenshanhe/CHComponents-web/blob/main/LICENSE)

## 📦 安装

### 环境要求

- **Node.js**: >= 14.0.0
- **Vue**: >= 2.6.14
- **Element UI**: >= 2.15.14

### 安装依赖

```bash
# 安装组件库
npm install ch-components-web

# 或使用 yarn
yarn add ch-components-web

# 或使用 pnpm
pnpm add ch-components-web
```

## 🚀 快速开始

### 1. 全局配置（推荐）

在 `main.js` 中设置全局默认配置：

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CHComponentsWeb, { TableGlobalConfig } from 'ch-components-web'

Vue.use(ElementUI)
Vue.use(CHComponentsWeb)

// 设置 TableHandler 全局默认配置
TableGlobalConfig.setTableHandlerDefaults({
  // 返回成功的code
  successCode: '200',
  // 返回的code的路径
  successCodePath: 'status',
  // 返回数据中list的路径
  tableDataPath: 'result.data',
  // 返回和请求时的分页总条数的路径
  totalPath: 'result.total',
  // 可选择的分页大小范围
  pageSizes: [20, 50, 100],
  // 初始时的默认值分页大小，默认20
  pageSize: 20,
})
```

### 2. 完整引入

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CHComponentsWeb from 'ch-components-web'

Vue.use(ElementUI)
Vue.use(CHComponentsWeb)
```

### 3. 按需引入

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Select, Form, TableMixins, TableGlobalConfig } from 'ch-components-web'

Vue.use(ElementUI)
Vue.component(Select.name, Select)
Vue.component(Form.name, Form)
```

## 🎯 核心功能

### 📋 表格辅助工具 (Table Handler)

强大的表格管理解决方案，支持：

- **自动数据管理**：自动处理表格数据的获取、更新、删除
- **智能分页**：统一的分页逻辑处理，支持多种分页模式
- **批量操作**：支持批量选择、删除、移动等操作
- **全局配置**：支持在 main.js 中设置全局默认配置
- **多表格支持**：一个组件中可以同时管理多个表格

#### 基本使用

```javascript
import { TableMixins } from 'ch-components-web'

export default {
  mixins: [TableMixins({
    serviceArea: {
      requestApi: getServiceAreaPage,
      deleteApi: deleteServiceArea,
      formUnset: ["depts", "rel"],
    }
  })],
  methods: {
    getServiceAreaPage(params) {
      return this.$http.get('/api/service-area', { params });
    },
    deleteServiceArea(id) {
      return this.$http.delete(`/api/service-area/${id}`);
    }
  }
}
```

#### 全局配置

```javascript
import { TableGlobalConfig } from 'ch-components-web'

// 设置全局默认配置
TableGlobalConfig.setTableHandlerDefaults({
  successCode: '200',
  successCodePath: 'status',
  tableDataPath: 'result.data',
  totalPath: 'result.total',
  pageSizes: [20, 50, 100],
  pageSize: 20,
})
```

### 🎨 表单组件 (Form)

基于 JSON 配置的智能表单组件：

- **JSON 配置**：通过配置快速生成表单
- **动态验证**：支持动态添加验证规则
- **灵活布局**：支持多种布局方式
- **自动提交**：自动处理表单提交逻辑

### 🔽 选择器组件 (Select)

增强的选择器组件：

- **远程搜索**：支持远程数据搜索
- **多选支持**：支持单选和多选模式
- **自定义选项**：支持自定义选项渲染
- **数据过滤**：内置数据过滤功能

### 📅 日期组件 (DatePicker & DateTimePicker)

增强的日期选择组件：

- **多种格式**：支持多种日期格式
- **范围选择**：支持日期范围选择
- **时间选择**：支持精确到时分秒的选择
- **快捷选项**：内置常用日期快捷选项

### 🌳 树形选择器 (TreeSelect)

树形结构的选择器：

- **层级展示**：清晰的层级结构展示
- **搜索功能**：支持节点搜索
- **多选支持**：支持多选和单选
- **异步加载**：支持异步加载子节点

## 🛠️ 开发指南

### 本地开发

```bash
# 克隆项目
git clone https://github.com/chenshanhe/CHComponents-web.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 文档开发

```bash
# 进入文档目录
cd Docs

# 安装依赖
npm install

# 启动文档服务器
npm run dev
```

## 📚 文档

- [组件文档](https://github.com/chenshanhe/CHComponents-web/tree/main/Docs/docs/components)
- [表格辅助工具文档](https://github.com/chenshanhe/CHComponents-web/tree/main/Docs/docs/tableHandler)
- [快速使用指南](https://github.com/chenshanhe/CHComponents-web/tree/main/Docs/docs/tableHandler/QuicklyUse.md)
- [API 文档](https://github.com/chenshanhe/CHComponents-web/tree/main/Docs/docs/tableHandler/API.md)

## 🎯 特性

- ✅ **Vue 2.x 兼容**：完美支持 Vue 2.x 项目
- ✅ **Element UI 集成**：基于 Element UI，保持一致的视觉风格
- ✅ **TypeScript 支持**：提供完整的 TypeScript 类型定义
- ✅ **按需引入**：支持按需引入，减小打包体积
- ✅ **全局配置**：支持全局默认配置，减少重复代码
- ✅ **开箱即用**：无需额外配置，安装即可使用
- ✅ **文档完善**：提供详细的使用文档和示例

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🔗 相关链接

- [GitHub 仓库](https://github.com/chenshanhe/CHComponents-web)
- [npm 包](https://www.npmjs.com/package/ch-components-web)
- [更新日志](https://github.com/chenshanhe/CHComponents-web/blob/main/Docs/docs/CHANGELOG.md)

## 👨‍💻 作者

**chenshanhe** - [GitHub](https://github.com/chenshanhe) - 421190919@qq.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
