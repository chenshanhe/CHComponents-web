# 快速使用

## 全局配置（推荐）

在 `main.js` 中设置全局默认配置，避免在每个组件中重复配置：

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

## 基本用法

```javascript
// 引入 TableMixins
import { TableMixins } from "ch-components-web";

export default {
  mixins: [
    TableMixins({
      // serviceArea 是自定义的表格名，用于区分同组件的多表格
      serviceArea: {
        requestApi: getServiceAreaPage,    // 获取数据的 API 方法
        deleteApi: deleteServiceArea,      // 删除数据的 API 方法
        formUnset: ["depts", "rel"],       // 请求时从表单中删除的属性
        // 其他配置会自动使用全局默认配置
      },
    })
  ],
  data() {
    return {
      // 以下为自动注入的参数
      // serviceAreaHandler: {
      //   tableData: [],        // 表格数据
      //   loading: false,       // 是否加载中
      //   tableSelection: [],   // 表格中勾选的选项
      //   total: 0,            // 总条数
      //   currentPage: 1,      // 当前页数
      //   pageSize: 20,        // 页面条数（使用全局配置）
      //   pageSizes: [20, 50, 100], // 可选择的分页大小范围（使用全局配置）
      // }
      // serviceAreaQueryForm: {} // 用户可以自行绑定查询表单变量
    };
  },
  methods: {
    // 获取服务区域列表
    getServiceAreaPage(params) {
      return this.$http.get('/api/service-area', { params });
    },
    // 删除服务区域
    deleteServiceArea(id) {
      return this.$http.delete(`/api/service-area/${id}`);
    }
  }
}
```

## 多表格配置

```javascript
import { TableMixins } from "ch-components-web";

export default {
  mixins: [
    TableMixins({
      // 用户表格
      users: {
        requestApi: this.getUserList,
        deleteApi: this.deleteUser,
        // 使用全局默认配置
      },
      // 订单表格
      orders: {
        requestApi: this.getOrderList,
        deleteApi: this.deleteOrder,
        formUnset: ["extraFields"],
        // 可以覆盖全局配置
        pageSizes: [10, 25, 50], // 局部配置会覆盖全局配置
      },
    })
  ],
  methods: {
    getUserList(params) {
      return this.$http.get('/api/users', { params });
    },
    deleteUser(id) {
      return this.$http.delete(`/api/users/${id}`);
    },
    getOrderList(params) {
      return this.$http.get('/api/orders', { params });
    },
    deleteOrder(id) {
      return this.$http.delete(`/api/orders/${id}`);
    }
  }
}
```

## 配置优先级

1. **局部配置** > **全局配置** > **默认配置**
2. 在组件中配置的参数会覆盖全局配置
3. 全局配置会覆盖默认配置
4. 未配置的参数使用默认值

## 全局配置方法

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

// 获取当前全局配置
const config = TableGlobalConfig.getTableHandlerDefaults()

// 重置为默认配置
TableGlobalConfig.resetTableHandlerDefaults()
```