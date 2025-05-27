<template>
  <div id="app">
    <div class="container">
      <h1>CH Components 组件库演示</h1>
      
      <div class="demo-section">
        <h2>Select 组件</h2>
        <ch-select 
          v-model="selectValue" 
          :options="selectOptions"
          placeholder="请选择"
        />
        <p>选中值: {{ selectValue }}</p>
      </div>

      <div class="demo-section">
        <h2>Form 组件</h2>
        <ch-form 
          :model="formData"
          :rules="formRules"
          ref="form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </ch-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selectValue: '',
      selectOptions: [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
        { label: '选项3', value: 'option3' }
      ],
      formData: {
        username: '',
        email: ''
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!')
        } else {
          this.$message.error('请检查表单')
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.demo-section h2 {
  margin-top: 0;
  color: #409eff;
}
</style> 