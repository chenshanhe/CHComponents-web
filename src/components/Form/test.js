import CreateDialog from "@/views/task/CreateDialog/index.vue";
export default function queryFrom(that) {
  return [
    {
      type: 'input',
      label: '服务区域',
      prop: 'serviceAddress',
      itemOptions: {
        placeholder: '请输入',
        style: {
          width: '240px'
        }
      }
    },
    {
      type: 'select',
      label: '状态',
      prop: 'status',
      itemOptions: {
        placeholder: '请输入',
        style: {
          width: '240px'
        },
      }
    },
    {
      type: 'select',
      label: '所属部门',
      prop: 'department',
      itemOptions: {
        style: {
          width: '240px'
        }
      }
    },
    {
      type: 'select',
      label: '服务团队/人员',
      prop: 'serviceTeam',
      itemOptions: {
        style: {
          width: '240px'
        },
        onMounted:that.selectMounted,
      }
    },
    {
      type: 'button',
      label: '',
      prop: 'submitBtn',
      itemOptions: {
        label: '搜索',
        type: 'primary',
        size: 'mini',
        leftIcon: 'el-icon-search',
      }
    }, {
      type: 'button',
      label: '',
      prop: 'resetBtn',
      itemOptions: {
        label: '重置',
        size: 'mini',
        leftIcon: 'el-icon-refresh',
      }
    },
    {
      type:'component',
      component:CreateDialog,
      prop:'submitBtn',
      itemOptions:{
        label:'搜索',
        type:'primary',
      }
    }

  ]
}