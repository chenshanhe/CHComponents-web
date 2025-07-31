# TableHander API 

## 📖 概述

TableHander 是一个用于管理表格数据的核心类，提供了完整的表格操作功能，包括数据获取、分页、选择、删除、排序等。

## ⚙️ 配置选项

### 基础配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `initInMount` | Boolean | `true` | 是否在 mounted 时自动获取数据 |
| `requestApi` | Function | `null` | 数据获取 API 方法 |
| `deleteApi` | Function | `null` | 删除 API 方法 |
| `tableDataPath` | String | `'data'` | 返回数据中列表的路径 |
| `tableIdPath` | String | `'id'` | 数据中 ID 字段的路径 |
| `successCodePath` | String | `'code'` | 返回数据中状态码的路径 |
| `successCode` | String | `'0'` | 成功的状态码 |
| `usePager` | Boolean | `true` | 是否启用分页 |
| `limitMode` | Boolean | `false` | 是否使用启用分页limit模式 |
| `pageSizes` | Array | `[10, 20, 30, 50]` | 分页大小选项 |
| `currentPagePath` | String | `'currentPage'` | 请求参数中当前页的字段名 |
| `pageSizePath` | String | `'pageSize'` | 请求参数中分页大小的字段名 |
| `limitModeOffsetPath` | String | `'offset'` | limit模式下，请求参数中offset的路径 |
| `limitModeLimitPath` | String | `'limit'` | limit模式下，请求参数中limit的路径 |
| `currentPage` | Number | `1` | 初始当前页 |
| `pageSize` | Number | `10` | 初始分页大小 |
| `total` | Number | `0` | 初始总数 |
| `deleteIdName` | String | `''` | 删除时 ID 参数的名称 |
| `deleteIdJoinBy` | String | `''` | 删除时 ID 的拼接方式 |
| `onlySingleDelete` | Boolean | `false` | 是否只支持单行删除 |
| `singleDeleteIdUseArray` | Boolean | `true` | 单行删除时 ID 是否使用数组格式 |
| `singlePageSelect` | Boolean | `true` | 是否单页选择模式 |

#### 分页参数说明

- **普通分页模式**：使用 `currentPagePath` 和 `pageSizePath` 作为请求参数，适用于常见的 pageNum/pageSize 分页接口。
- **limit 模式**：使用 `limitModeOffsetPath` 和 `limitModeLimitPath` 作为请求参数，适用于后端只支持 offset/limit 分页的场景。
- 所有分页参数字段都可根据后端接口实际字段灵活配置。

#### 示例

**接口请求格式：**
```json
{
  "aaa": "bbb",
  "pages": {
    "pageNum": 1,
    "size": 10
  }
}
```

**接口返回格式：**
```json
{
  "errcode": 0,
  "data": {
    "list": [...],
    "pager": {
      "total": 0,
      "size": 10,
      "pageNum": 1
    }
  }
}
```

**根据以上接口要求，配置如下：**
```js
TableMixins.init({
  XXX: {
    requestApi: API,
    tableDataPath: "data.list",
    totalPath: "data.pager.total",
    currentPagePath: "pages.pageNum",
    pageSizePath: "pages.size"
  },
});

```

## 🔧 方法


### 数据操作方法

#### getList(options)

获取表格数据。

**入参：**
| 参数    | 类型   | 必填 | 说明           |
|---------|--------|------|----------------|
| options | Object | 否   | 临时覆盖配置项（可选） |

```javascript
// 使用默认配置获取数据
await [tableName]Handler.getList()

// 使用自定义配置获取数据
await [tableName]Handler.getList({
  requestApi: customApi,
  usePager: false
})
```

#### query()

执行查询操作（重置到第一页并获取数据）。

**入参：** 无

```javascript
[tableName]Handler.query()
```

#### reset()

重置表单并重新查询。

**入参：** 无

```javascript
[tableName]Handler.reset()
```

### 分页方法

#### currentChange(page)

切换当前页。

**入参：**
| 参数 | 类型   | 必填 | 说明     |
|------|--------|------|----------|
| page | Number | 是   | 新的页码 |

```javascript
@current-change="[tableName]Handler.currentChange"
```

#### sizeChange(size)

切换分页大小。

**入参：**
| 参数 | 类型   | 必填 | 说明         |
|------|--------|------|--------------|
| size | Number | 是   | 新的分页大小 |

```javascript
@size-change="[tableName]Handler.sizeChange"
```

#### nextPage()

跳转到下一页。

**入参：** 无

```javascript
[tableName]Handler.nextPage()
```

#### lastPage()

跳转到上一页。

**入参：** 无

```javascript
[tableName]Handler.lastPage()
```

### 选择方法

#### handleTableSelectEvent(selection, row)

处理表格选择事件。

**入参：**
| 参数      | 类型  | 必填 | 说明         |
|-----------|-------|------|--------------|
| selection | Array | 是   | 当前选中项数组 |
| row       | Object| 否   | 当前操作的行（可选） |

```javascript
@selection-change="[tableName]Handler.handleTableSelectEvent"
```

#### handleTableSelectAllEvent(selection, row)

处理表格全选事件。

**入参：**
| 参数      | 类型  | 必填 | 说明         |
|-----------|-------|------|--------------|
| selection | Array | 是   | 当前选中项数组 |
| row       | Object| 否   | 当前操作的行（可选） |

```javascript
@select-all="[tableName]Handler.handleTableSelectAllEvent"
```

#### clearTableSelection()

清空表格选择。

**入参：** 无

```javascript
[tableName]Handler.clearTableSelection()
```

#### handleTableSelected(options)

处理多页选择时的选择状态回显。

**入参：**
| 参数    | 类型   | 必填 | 说明           |
|---------|--------|------|----------------|
| options | Object | 否   | 临时覆盖配置项（可选） |

```javascript
[tableName]Handler.handleTableSelected()
```

### 行操作方法

#### tableRowUp(_TableMixinsId, count)

将指定行向上移动。

**入参：**
| 参数           | 类型   | 必填 | 说明         |
|----------------|--------|------|--------------|
| _TableMixinsId | String | 是   | 行唯一标识   |
| count          | Number | 否   | 上移行数，默认1 |

```javascript
[tableName]Handler.tableRowUp(_TableMixinsId)
[tableName]Handler.tableRowUp(_TableMixinsId, 3)
```

#### tableRowDown(_TableMixinsId, count)

将指定行向下移动。

**入参：**
| 参数           | 类型   | 必填 | 说明         |
|----------------|--------|------|--------------|
| _TableMixinsId | String | 是   | 行唯一标识   |
| count          | Number | 否   | 下移行数，默认1 |

```javascript
[tableName]Handler.tableRowDown(_TableMixinsId)
[tableName]Handler.tableRowDown(_TableMixinsId, 3)
```

#### tableDeleteRow(_TableMixinsId)

删除指定行（仅前端显示）。

**入参：**
| 参数           | 类型   | 必填 | 说明         |
|----------------|--------|------|--------------|
| _TableMixinsId | String | 是   | 行唯一标识   |

```javascript
[tableName]Handler.tableDeleteRow(_TableMixinsId)
```

#### tableDeleteRows(_TableMixinsIds)

批量删除指定行（仅前端显示）。

**入参：**
| 参数            | 类型   | 必填 | 说明         |
|-----------------|--------|------|--------------|
| _TableMixinsIds | Array  | 是   | 行唯一标识数组 |

```javascript
[tableName]Handler.tableDeleteRows([_TableMixinsId1, _TableMixinsId2, _TableMixinsId3])
```

#### tableDeleteSelectedRows()

删除选中的行（仅前端显示）。

**入参：** 无

```javascript
[tableName]Handler.tableDeleteSelectedRows()
```

### 删除方法

#### deleteRowData(row, options)

删除单行数据（带确认提示）。

**入参：**
| 参数    | 类型   | 必填 | 说明           |
|---------|--------|------|----------------|
| row     | Object | 是   | 行数据对象     |
| options | Object | 否   | 临时覆盖配置项（可选） |

```javascript
[tableName]Handler.deleteRowData(rowData)
```

#### deleteSelectedRowsData(options)

删除选中的多行数据（带确认提示）。

**入参：**
| 参数    | 类型   | 必填 | 说明           |
|---------|--------|------|----------------|
| options | Object | 否   | 临时覆盖配置项（可选） |

```javascript
[tableName]Handler.deleteSelectedRowsData()
```

#### deleteRowDataByApi(ids, options)

调用删除 API（内部方法）。

**入参：**
| 参数    | 类型         | 必填 | 说明           |
|---------|--------------|------|----------------|
| ids     | String/Array | 是   | 单个或多个ID   |
| options | Object       | 否   | 临时覆盖配置项（可选） |

```javascript
await [tableName]Handler.deleteRowDataByApi(123)
await [tableName]Handler.deleteRowDataByApi([123, 456, 789])
```

### 弹窗方法

#### openCreateOrUpdate(data, readOnly)

打开创建或编辑弹窗。

**入参：**
| 参数     | 类型    | 必填 | 说明         |
|----------|---------|------|--------------|
| data     | Object  | 否   | 行数据对象，新增时可不传 |
| readOnly | Boolean | 否   | 是否只读模式，默认 false |

```javascript
[tableName]Handler.openCreateOrUpdate()
[tableName]Handler.openCreateOrUpdate(rowData)
[tableName]Handler.openCreateOrUpdate(rowData, true)
```

### 生命周期方法

#### initInMount(options)

在 mounted 时初始化数据。

**入参：**
| 参数    | 类型   | 必填 | 说明           |
|---------|--------|------|----------------|
| options | Object | 否   | 临时覆盖配置项（可选） |

```javascript
[tableName]Handler.initInMount()
```

## 🎯 钩子函数

TableHander 支持以下自定义钩子函数，需要在 Vue 组件中定义：

### tableNameBeforeQuery(params)

在请求前调用，可以对请求参数进行处理。

```javascript
export default {
  methods: {
    userTableBeforeQuery(params) {
      // 处理请求参数
      params.timestamp = Date.now()
      return params
    }
  }
}
```

### tableNameAfterQuery()

在请求后调用，可以对返回数据进行处理。

```javascript
export default {
  methods: {
    userTableAfterQuery() {
      // 处理返回数据
      this.userTableHandler.tableData.forEach(item => {
        item.statusText = item.status === 1 ? '启用' : '禁用'
      })
    }
  }
}
```

### tableNameExtraReset()

在重置时调用，可以进行额外的重置操作。

```javascript
export default {
  methods: {
    userTableExtraReset() {
      // 额外的重置操作
      this.userTableQueryForm.customField = ''
    }
  }
}
```

## 🔗 Vue 引用配置

TableHander 需要以下 Vue 引用才能正常工作：

### 必需的 ref 引用

```vue
<template>
  <!-- 查询表单 -->
  <el-form ref="userTableQueryFormRef" :model="userTableQueryForm">
    <!-- 表单内容 -->
  </el-form>

  <!-- 数据表格 -->
  <el-table ref="userTableTableRef" :data="userTableHandler.tableData">
    <!-- 表格列 -->
  </el-table>

  <!-- 创建/编辑弹窗 -->
  <CreateOrUpdateDialog ref="userTableCreateOrUpdateRef" />
</template>
```

### 自动生成的属性

使用 TableMixins 后，会自动生成以下属性：

```javascript
// 查询表单数据
userTableQueryForm: {}

// 表格处理器实例
userTableHandler: {
  tableData: [],
  loading: false,
  tableSelection: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30, 50],
  // ... 其他方法和属性
}
```

## ⚠️ 注意事项

1. **ref 命名规范**：所有 ref 必须按照 `tableName + [QueryForm/Table/CreateOrUpdate] + Ref` 的格式命名
2. **钩子函数命名**：钩子函数必须按照 `tableName + HookName` 的格式命名
3. **数据唯一性**：每条数据会自动添加 `_TableMixinsId` 字段用于唯一标识
4. **API 格式**：确保 API 返回的数据格式符合配置的路径设置
5. **错误处理**：建议在 API 方法中添加适当的错误处理逻辑

---

> 📚 **提示**：TableHander 提供了完整的表格管理功能，通过合理的配置可以大大简化表格相关的开发工作。
