
## 📝 完整使用示例
### 请求封装
```js     
//axios封装
import request from '@/utils/request'
// 查询用户列表
export function getUserList(data) {
  return request({
    url: '/api/user',
    method: 'get',
    params: data
  })
}
//删除用户
export function deleteUser(data) {
  return request({
    url: '/api/user',
    method: 'delete',
    data
  })
}
```
### CreateOrUpdate组件封装

```vue
<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" width="400px">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UserForm',
  data() {
    return {
      visible: false,
      dialogTitle: '新增/编辑用户',
      formData: {
        username: '',
        email: '',
        status: '1'
      },
      readOnly: false
    }
  },
  methods: {
    open(data = {}, readOnly = false) {
      this.dialogTitle = data && data.username ? '编辑用户' : '新增用户';
      this.formData = Object.assign({ username: '', email: '', status: '1' }, data);
      this.readOnly = readOnly;
      this.close()
    },
    handleSubmit() {
      // 这里可以做表单校验和提交
      this.$emit('success', this.formData);
      this.close()
    }
    close(){
        this.visible = false;
    }
  }
}
</script>
```


```vue
<template>
  <div class="user-management">
    <!-- 查询表单 -->
    <el-form ref="usersTableQueryFormRef" :model="usersTableQueryForm" inline>
      <el-form-item label="用户名">
        <el-input v-model="usersTableQueryForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="usersTableQueryForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="usersTableHandler.query()">查询</el-button>
        <el-button @click="usersTableHandler.reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div class="table-actions">
      <el-button type="primary" @click="usersTableHandler.openCreateOrUpdate()">
        新增用户
      </el-button>
      <el-button 
        type="danger" 
        :disabled="!usersTableHandler.tableSelection.length"
        @click="usersTableHandler.deleteSelectedRowsData()"
      >
        批量删除
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table
      ref="usersTableTableRef"
      v-loading="usersTableHandler.loading"
      :data="usersTableHandler.tableData"
      @selection-change="usersTableHandler.handleTableSelectEvent"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">
            {{ scope.row.status === '1' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button 
            size="mini" 
            @click="usersTableHandler.openCreateOrUpdate(scope.row)"
          >
            编辑
          </el-button>
          <el-button 
            size="mini" 
            type="danger" 
            @click="usersTableHandler.deleteRowData(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="usersTableHandler.currentPage"
      :page-sizes="usersTableHandler.pageSizes"
      :page-size="usersTableHandler.pageSize"
      :total="usersTableHandler.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="usersTableHandler.sizeChange"
      @current-change="usersTableHandler.currentChange"
    />

  </div>
</template>

<script>
import TableMixins from '@/components/TableHander/TableMixins'
import UserForm from './UserForm.vue'
import {getUserList,deleteUser} from '@/api/user'
TableMixins.init({
    users: {
    requestApi: getUserList,
    deleteApi: deleteUser
  },
})
export default {
  name: 'UserManagement',
  components: { UserForm },
  mixins: [TableMixins],
  data() {
    return {
      usersTableQueryForm: {
        username: '',
        status: ''
      }
    }
  },
  mounted() {
    this.init({
      usersTable: {
        requestApi: this.getUserList,
        deleteApi: this.deleteUser,
        usePager: true,
        pageSize: 20,
        formUnset: ['extraField']
      }
    })
  },
  methods: {
    // API 方法
    async getUserList(params) {
      return await this.$api.getUserList(params)
    },
    async deleteUser(ids) {
      return await this.$api.deleteUser(ids)
    },

    // 钩子函数
    usersTableBeforeQuery(params) {
      // 处理请求参数
      if (params.username) {
        params.username = params.username.trim()
      }
      return params
    },

    usersTableAfterQuery() {
      // 处理返回数据
      this.usersTableHandler.tableData.forEach(item => {
        item.statusText = item.status === '1' ? '启用' : '禁用'
      })
    },

    usersTableExtraReset() {
      // 额外的重置操作
      this.usersTableQueryForm.customField = ''
    }
  }
}
</script>
```
