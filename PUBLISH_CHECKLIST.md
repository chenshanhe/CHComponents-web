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