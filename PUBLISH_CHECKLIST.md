# 📋 NPM 发布前检查清单

## ✅ 必须完成的项目

### 1. 基本信息配置
- [ ] 更新 `package.json` 中的 `author` 信息
- [ ] 更新 `package.json` 中的 `repository` URL
- [ ] 更新 `package.json` 中的 `homepage` URL
- [ ] 更新 `package.json` 中的 `bugs` URL
- [ ] 确认包名 `ch-components-web` 在npm上可用

### 2. 组件完善
- [ ] 确保所有组件都有正确的 `name` 属性
- [ ] 检查组件的 props 验证
- [ ] 添加组件的默认值和类型检查
- [ ] 测试组件的基本功能

### 3. 构建测试
- [ ] 运行 `npm run build:lib` 确保构建成功
- [ ] 检查 `lib` 目录是否生成正确的文件
- [ ] 测试在其他项目中引入组件库

### 4. 文档完善
- [ ] 更新 README.md 中的使用示例
- [ ] 添加完整的 API 文档
- [ ] 添加更多使用示例

### 5. 版本管理
- [ ] 确认当前版本号是否合适
- [ ] 准备 CHANGELOG.md 记录版本变更

## 🚀 发布步骤

1. **登录 npm**
   ```bash
   npm login
   ```

2. **检查包信息**
   ```bash
   npm pack --dry-run
   ```

3. **发布到 npm**
   ```bash
   npm publish
   ```

4. **验证发布**
   ```bash
   npm info ch-components-web
   ```

## ⚠️ 注意事项

- 确保网络连接稳定
- 首次发布可能需要邮箱验证
- 发布后无法删除，只能发布新版本
- 建议先发布 beta 版本进行测试

## 🔧 发布后维护

- 及时响应用户反馈
- 定期更新依赖版本
- 保持文档同步更新
- 遵循语义化版本规范 

# CHComponents-web 发布构建检查流程

## 1. 使用 Node.js 20 环境
建议使用 nvm 切换到 Node.js 20：
```bash
nvm use 20
```

## 2. 安装依赖
```bash
npm install
```

## 3. 构建产物
```bash
npm run build
```
构建产物会生成在 `dist/` 目录。

## 4. 检查类型声明
确保根目录有 `index.d.ts`，内容需导出主插件类型。

## 5. 配置 package.json
- `main`、`module` 指向 `dist` 目录下的入口文件
- `types` 指向根目录的 `index.d.ts`
- `files` 字段如下：
  ```json
  "files": [
    "dist",
    "index.d.ts",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ]
  ```

## 6. 检查 .npmignore
不要屏蔽 `dist/` 和 `index.d.ts`。

## 7. 打包检查
```bash
npm pack
```
解包检查：
```bash
tar -tzvf ch-components-web-*.tgz
```
应包含：
- dist/ 目录及所有构建产物
- index.d.ts
- README.md、LICENSE、package.json

## 8. 发布
```bash
npm publish
```

## 9. 下游项目测试
在新项目中安装并引入，确保无“找不到模块”或类型声明错误。 