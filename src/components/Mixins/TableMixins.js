import _ from 'lodash'
export default {
  data() {
    return {
      initInMount: true,
      queryFormRef: 'queryForm',
      requestApi: null,
      queryForm: {},
      formUnset: [],//需要发送请求时从form中删除的属性（路径）
      tableData: [],
      tableDataPath: 'data',
      usePager: true,
      loading: false,
      pageSizes: [10, 20, 30, 50],
      currentPage: 1,
      currentPagePath: 'pageNum',

      pageSize: 10,
      pageSizePath: 'pageSize',

      total: 0,
      totalPath: 'total',

      successCode: "0000",
      successCodePath: 'code',

      deleteApi: null,
      deleteIdPath: 'id',
      deleteIdName: '',
      onlySingleDelete: false,
      tableSelection: [],
    }
  },
  mounted() {
    if (this.initInMount) {
      this.getList()
    }
  },
  methods: {
    async getList() {
      this.loading = true;
      this.tableSelection = []
      this.tableData = [];
      try {
        let params = _.cloneDeep(this.queryForm)
        if (this.usePager) {
          _.set(params, this.currentPagePath, this.currentPage)
          _.set(params, this.pageSizePath, this.pageSize)
        }
        if (this.formUnset && this.formUnset.length > 0) {
          _.forEach(this.formUnset, (item) => {
            _.unset(params, item)
          });
        }
        if (!this.requestApi) {
          console.warn('[TableMixins] requestApi is not set')
          return
        }
        let res = await this.requestApi(params)
        let code = _.get(res, this.successCodePath)
        if (code === this.successCode) {
          let list = _.get(res, this.tableDataPath)
          this.tableData = this._handleTableData(list)
          this.total = _.get(res, this.totalPath)
          this.$nextTick(() => {
            this.handleTableDataAfterGetList()
          })
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    handleTableDataAfterGetList(){},
    handleQueryBeforeRequest(){},
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
    sizeChange(size) {
      this.pageSize = size
      this.getList()
    },
    currentChange(page) {
      this.currentPage = page
      this.getList()
    },
    _handleTableData(list) {
      //用lodash给每一个数据添加一个id
      _.forEach(list, (item, index) => {
        item._TableMixinsId = _.uniqueId('TID_')
      })
      return list
    },
    //行上移
    rowUp(id) {
      let index = _.findIndex(this.tableData, (item) => {
        return item._TableMixinsId === id
      })
      if (index > 0) {
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
      if (index < this.tableData.length - 1) {
        let temp = this.tableData[index]
        this.$set(this.tableData, index, this.tableData[index + 1])
        this.$set(this.tableData, index + 1, temp)
      }
    },
    handleTableSelectEvent(selection, row) {
      this.tableSelection = selection
    },
    //删除行显示
    deleteRow(_id) {
      console.log('deleteRow',_id);
      let index = _.findIndex(this.tableData, (item) => {
        return item._TableMixinsId === _id
      })
      if (index !== -1) {
        this.tableData.splice(index, 1)
      }
    },
    //批量删除行显示
    deleteRows(_ids) {
      _.forEach(_ids, (_id) => {
        this.deleteRow(_id)
      })
    },
    //点击form的按钮查询
    query() {
      this.currentPage = 1
      this.getList()
    },
    reset() {
      this.$refs[this.queryFormRef].resetFields()
      this.$nextTick(() => {
        this.query()
      })
    },
    openCreateOrUpdate(data,readOnly = false) {
      this.$refs.CreateOrUpdate.open(data,readOnly)
    },
    deleteSelectedRows() {
      if (this.tableSelection.length === 0) {
        this.$message.warning('请选择要删除的数据')
        return
      }
      let ids = this.tableSelection.map(item => {
        return _.get(item, '_TableMixinsId')
      })
      this.deleteRows(ids)
    },
    deleteSelectedData() {
      if (this.tableSelection.length === 0) {
        this.$message.warning('请选择要删除的数据')
        return
      }
      this.$confirm(`确定删除${this.tableSelection.length}条数据吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.tableSelection.map(item => {
          return _.get(item, this.deleteIdPath)
        })
        if (this.onlySingleDelete) {
          _.forEach(ids, (id) => {
            this.deleteDataByApi(id)
          })
        } else {
          this.deleteDataByApi(ids)
        }
      }).catch(() => {
      });
    },
    deleteData(row) {
      let id = row[this.deleteIdPath]
      this.$confirm(`确定删除这条数据吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.onlySingleDelete) {
          this.deleteDataByApi(id)
        } else {
          this.deleteDataByApi([id])
        }
      }).catch(() => {
      });

    },
    async deleteDataByApi(ids) {
      if (this.deleteApi) {
        let params = null
        if(this.deleteIdName){
          params= {[this.deleteIdName]: ids}
        }else{
          params = ids
        }
        let res = await this.deleteApi(params)
        let code = _.get(res, this.successCodePath)
        if (code === this.successCode) {
          this.$message.success('删除成功')
          this.getList()
        }
      }
    }
  }
}
