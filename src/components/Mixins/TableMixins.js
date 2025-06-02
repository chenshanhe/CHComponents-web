import _ from 'lodash'
export default {
  data() {
    return {
      queryFormRef: 'queryForm',
      requestApi: null,
      queryForm: {},
      tableData: [],
      tableDataPath: 'data',
      usePager: true,
      loading: false,

      currentPage: 1,
      currentPagePath: 'pageNum',

      pageSize: 10,
      pageSizePath: 'pageSize',

      total: 0,
      totalPath: 'total',

      successCode: "0000",
      successCodePath: 'code',
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      console.log('getList')
      this.loading = true;
      this.tableData = [];
      this.total = 0;
      try {
        let params = _.cloneDeep(this.queryForm)
        if (this.usePager) {
          _.set(params, this.currentPagePath, this.currentPage)
          _.set(params, this.pageSizePath, this.pageSize)
        }
        if(!this.requestApi) {
          console.error('requestApi is not set')
          return
        }
        let res = await this.requestApi(params)
        let code = _.get(res, this.successCodePath)
        if (code === this.successCode) {
          let list = _.get(res, this.tableDataPath)
          this.tableData = this._handletableData(list)
          this.total = _.get(res, this.totalPath)
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    nextPage() {
      if (this.currentPage < _.divide(this.total, this.pageSize)) {
        this.currentPage = _.add(this.currentPage, 1)
        this.getList()
      }
    },
    lastPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.getList()
      }
    },
    _handletableData(list) {
      //用lodash给每一个数据添加一个id
      _.forEach(list, (item, index) => {
        item._TableMixinsId = _.uniqueId(item,'TID_')
      })
      return list
    },
    //行上移
    rowUp(id) {
      let index = _.findIndex(this.tableData, (item) => {
        return item._TableMixinsId === id
      })
      if(index > 0) {
        let temp = this.tableData[index]
        this.$set(this.tableData, index, this.tableData[index - 1])
        this.$set(this.tableData, index - 1, temp)
      }
    },
    //行下移
    rowDown(id) {
      let index = _.findIndex(this.tableData, (item) => {
        return item._TableMixinsId === id
      })
      if(index < this.tableData.length - 1) {
        let temp = this.tableData[index]
        this.$set(this.tableData, index, this.tableData[index + 1])
        this.$set(this.tableData, index + 1, temp)
      }
    },
    //删除行
    deleteRow(id) {
      let index = _.findIndex(this.tableData, (item) => {
        return item._TableMixinsId === id
      })
      if(index !== -1) {
        this.tableData.splice(index, 1)
      }
    },
    //批量删除
    deleteRows(ids) {
      _.forEach(ids, (id) => {
        this.deleteRow(id)
      })
    },
    //点击form的按钮查询
    query(){
      this.currentPage = 1
      this.getList()
    },
    reset(){
      this.$refs[this.queryFormRef].resetForm()
      this.query()
    }
  }
}