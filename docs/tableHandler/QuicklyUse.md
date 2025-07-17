快速使用
```javascript
//引用TableMixins
import TableMixins from "./TableHander/TableMixins";
TableMixins.init({
  //users是自定义的表格名，用于区分同组件的多表格
  users: {
    requestApi: null,//可填入api方法
  },
});
export default {
  mixins: [TableMixins],
  data:{
    return {
        //以下为自动注入的参数
        // usersHandler:{
        //     //表格数据
        //     tableData: [],
        //     //是否加载中
        //     loading: false,
        //     //表格中勾选的选项
        //     tableSelection: [],
        //     //总条数
        //     total:0,
        //     //当前页数
        //     currentPage:1,
        //     //页面条数
        //     pageSize:10,
        //     //可选择的分页大小范围
        //     pageSizes: [10, 20, 30, 50],
        // }
        // //用户可以自行在tableQueryForm中绑定变量
        // usersQueryForm: {}
    }
  }
}
```