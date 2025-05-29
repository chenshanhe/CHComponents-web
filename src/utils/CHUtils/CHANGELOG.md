# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 进行版本管理。

## [1.0.0] - 2025-05-21

### 新增
- 初始版本发布
- 添加日期工具函数库

### 功能特性
- `pareseShortcuts`: 解析日期快捷方式字符串
  - 支持 'today'、'tomorrow'、'yesterday' 快捷方式
  - 返回对应的 dayjs 对象
  - 无效输入返回 null

- `getTodayObj`: 获取今天的 dayjs 对象
  - 返回当天开始时间（00:00:00）
  - 使用 dayjs 的 startOf 方法

- `getTomorrowObj`: 获取明天的 dayjs 对象
  - 返回明天开始时间（00:00:00）
  - 使用 dayjs 的 add 和 startOf 方法

- `getYesterdayObj`: 获取昨天的 dayjs 对象
  - 返回昨天开始时间（00:00:00）
  - 使用 dayjs 的 subtract 和 startOf 方法

- `isUnit`: 检查时间单位是否有效
  - 支持的时间单位：
    - date: 日期
    - day: 星期
    - month: 月份
    - year: 年
    - hour: 小时
    - minute: 分钟
    - second: 秒
    - millisecond: 毫秒
  - 返回布尔值表示单位是否有效

### 依赖
- dayjs: ^1.11.0
- dayjs/plugin/isSameOrBefore
- dayjs/plugin/isSameOrAfter

### 注意事项
1. 所有日期相关操作都使用 dayjs 库
2. 时间单位检查使用预定义的合法单位列表
3. 快捷方式解析支持大小写不敏感
4. 所有返回的日期对象都设置为当天的开始时间（00:00:00） 