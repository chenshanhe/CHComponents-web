
export default class TabelHander {
  _log = (...args) => {
    console.log('[TabelHander]', ...args);
  }
  constructor(tableName, options) {
    this._log('TabelHander init', tableName, options);

    //tableName为表名，用于设置vue实例的值，如VUE_QueryFormPath等
    this.tableName = tableName;
    //vue实例
    this.vueInstance = null
    //表格数据
    this.tableData = [];
    //是否加载中
    this.loading = false;
    //表格中勾选的选项
    this.tableSelection = [];

    //当前表单查询时所使用的from对象地址，固定格式为tableNameQueryForm，由mixins自动设置
    this.VUE_QueryFormPath = this.tableName + 'QueryForm';

    //【需提前设置】当前表单查询时所使用的from对象地址，固定格式为tableNameQueryFormRef，需由用户手动绑定，否则清空表单等操作可能失效
    this.VUE_QueryFormRef = '$refs.' + this.tableName + 'QueryFormRef';
    //【需提前设置】当前表格对象地址，固定格式为tableNameTableRef，需由用户手动绑定，否则控制表格勾选回显等操作可能失效
    this.VUE_TableRef = '$refs.' + this.tableName + 'TableRef';
    //【需提前设置】当前创建或编辑窗口对象地址，固定格式为tableNameCreateOrUpdateRef，需由用户手动绑定，否则开启编辑和新增窗口等操作可能失效
    this.VUE_CreateOrUpdateRef = '$refs.' + this.tableName + 'CreateOrUpdateRef';

    //可提供给用户自定义的方法，固定格式为tableNameBeforeQuery，在请求前调用，参数为请求参数
    this.VUE_METHOD_BeforeQueryPath = this.tableName + 'BeforeQuery';
    //可提供给用户自定义的方法，固定格式为tableNameAfterQuery，在请求后调用，无参数
    this.VUE_METHOD_AfterQueryPath = this.tableName + 'AfterQuery';
    //可提供给用户自定义的方法，固定格式为tableNameExtraReset，在重置时调用，无参数
    this.VUE_METHOD_ExtraResetPath = this.tableName + 'ExtraReset';

    this.options = {
      //是否在mounted时自动获取数据
      initInMount: true,
      //请求api接口，接口应该另外定义
      requestApi: null,
      //需要发送请求时从form中删除的属性（路径）
      formUnset: [],
      //返回数据中list的路径
      tableDataPath: 'data',
      //是否使用分页
      usePager: true,
      //分页模式，false为分页模式，true为limit模式
      limitMode: false,
      //可选择的分页大小范围
      pageSizes: [10, 20, 30, 50],
      //返回和请求时的分页当前页的路径
      currentPagePath: 'currentPage',
      //limit模式下，请求参数中offset的路径
      limitModeOffsetPath: 'offset',
      //limit模式下，请求参数中limit的路径
      limitModeLimitPath: 'limit',
      //返回和请求时的分页大小的路径
      pageSizePath: 'pageSize',
      //返回和请求时的分页总条数的路径
      totalPath: 'total',
      //返回成功的code
      successCode: "0",
      //返回的code的路径
      successCodePath: 'code',
      //返回数据中id的路径
      tableIdPath: 'id',
      //删除api接口，接口应该另外定义
      deleteApi: null,
      //调用删除api时重命名id，如设置delId时返回{delId:[123,456]},不设置返回[123,456]
      deleteIdName: '',
      //删除id时，id的拼接方式，如设置','时返回{delId:'123,456'},不设置返回{delId:[123,456]}
      deleteIdJoinBy: '',
      //后端接口只支持单行删除时，设置为true
      onlySingleDelete: false,
      //单行删除时，id是否使用数组格式
      singleDeleteIdUseArray: true,
      //是否单页选择,还是多页选择在同一个selection中
      singlePageSelect: true,
      //初始时的默认值当前页，默认1
      currentPage: 1,
      //初始时的默认值分页大小，默认10
      pageSize: 10,
      //初始时的默认值总条数，默认0
      total: 0,
      ...options,
    }
    this.total = this.options.total || 0
    this.currentPage = this.options.currentPage || 1
    this.pageSize = this.options.pageSize || 1
    this.pageSizes = this.options.pageSizes || [10, 20, 30, 50]

  }
  /**
   * 设置options,用户可以通过此方法设置options
   * @param {*} options
   */
  setOptions = (options) => {
    this.options = {
      ...this.options,
      ...options,
    }
  }
  /**
   * 设置vue实例，在TableMixins中自动调用
   * @param {*} vueInstance
   */
  setVueInstance = (vueInstance) => {
    this.vueInstance = vueInstance
  }
  /**
   * 在mounted时自动获取数据，在TableMixins中自动调用
   * @param {*} options
   */
  initInMount = (options = this.options) => {
    if (options.initInMount) {
      this.getList(options);
    }
  }
  /**
   * 获取数据，用户可以通过tableNameBeforeQuery和tableNameAfterQuery方法进行数据处理,
   * tableNameBeforeQuery方法参数为params：请求参数，用户可以在此方法中对请求参数进行处理，
   * unset的优先级比tableNameBeforeQuery优先级高
   * tableNameAfterQuery无参数方法，但用户可以直接对this.tableNameHandler.tableData等数据进行操作
   * @param {*} options
   */
  getList = async (options = this.options) => {
    this.loading = true;
    if (options.singlePageSelect) {
      this.tableSelection = []
    }
    this.tableData = [];
    try {
      let params = _.cloneDeep(this._getVueValue('VUE_QueryFormPath', {}))
      if (options.usePager) {
        if (this.currentPage < 1) {
          this.currentPage = 1
        }
        if (options.limitMode) {
          let offset = _.multiply(this.currentPage - 1, this.pageSize)
          _.set(params, options.limitModeLimitPath, this.pageSize)
          _.set(params, options.limitModeOffsetPath, offset)
        } else {
          _.set(params, options.currentPagePath, this.currentPage)
          _.set(params, options.pageSizePath, this.pageSize)
        }
      }
      let beforeQuery = this._getVueValue('VUE_METHOD_BeforeQueryPath')
      if (beforeQuery) {
        beforeQuery(params)
      }
      if (options.formUnset && options.formUnset.length > 0) {
        _.forEach(options.formUnset, (item) => {
          _.unset(params, item)
        });
      }
      if (!options.requestApi) {
        console.warn('[TableHander] requestApi is not set')
        return
      }
      let res = await options.requestApi(params)
      let code = _.get(res, options.successCodePath)

      if (code === options.successCode) {
        let total = _.get(res, options.totalPath, 0)
        let list = _.get(res, options.tableDataPath)
        list = this._handleTableData(list)
        this.tableData = list
        if (!options.singlePageSelect) {
          this.handleTableSelected(options)
        }
        this.total = total

        let afterQuery = this._getVueValue('VUE_METHOD_AfterQueryPath')
        if (afterQuery) {
          afterQuery()
        }

      } else {
        console.error('error code 预期', options.successCode, '实际', code);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
  /**
   * 下一页,如果用element等组件，此方法可能不会被调用
   */
  nextPage = () => {
    if (this.currentPage < _.divide(this.total, this.pageSize)) {
      this.currentPage = _.add(this.currentPage, 1)
      this.getList()
    }
  }
  /**
   * 上一页,如果用element等组件，此方法可能不会被调用
   */
  lastPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getList()
    }
  }
  /**
   * 改变分页大小，可通过@size-change="tableNameHandler.sizeChange"被element组件调用
   * @param {*} size
   */
  sizeChange = (size) => {
    this.pageSize = size
    this.getList()
  }
  /**
   * 改变当前页，可通过@current-change="tableNameHandler.currentChange"被element组件调用
   * @param {*} page
   */
  currentChange = (page) => {
    console.log('currentChange', page);
    this.currentPage = page
    this.getList()
  }

  /**
   * 表格选择是多页联动时，负责在页面变动时控制表格勾选状态的回显
   * @param {*} options
   */
  handleTableSelected = (options = this.options) => {
    if (!this._getVueValue('VUE_TableRef')) {
      console.warn('[TableHander] please set the tableRef:', this.VUE_TableRef)
      return
    } else {
      this._getVueValue('VUE_TableRef').clearSelection()
      this.vueInstance.$nextTick(() => {
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            let index = _.findIndex(this.tableSelection, selectItem => {
              return selectItem[options.tableIdPath] === item[options.tableIdPath]
            })
            if (index != -1) {
              this._getVueValue('VUE_TableRef').toggleRowSelection(item, true)
            }
          })
        }
      })
    }
  }
  /**
   * 处理表格选择事件，可通过@selection-change="tableNameHandler.handleTableSelectEvent"被element的table组件调用
   * @param {*} selection
   * @param {*} row
   * @param {*} options
   */
  handleTableSelectEvent = (selection, row, options = this.options) => {
    if (options.singlePageSelect) {
      this.tableSelection = selection
      return
    }
    console.log(selection, row)
    if (!row._TableMixinsId) {
      throw new Error('[TableMixins] row must have _TableMixinsId')
    }
    let index = _.findIndex(selection, { _TableMixinsId: row._TableMixinsId })
    let tableSelection = _.cloneDeep(this.tableSelection)
    if (index === -1) {
      //取消
      tableSelection = _.filter(tableSelection, (item) => {
        return item._TableMixinsId !== row._TableMixinsId
      })
    } else {
      //选中
      tableSelection.push(row)
    }
    this.tableSelection = tableSelection
    console.log(this.tableSelection)
  }
  /**
   * 处理表格全选事件，可通过@select-all="tableNameHandler.handleTableSelectAllEvent"被element的table组件调用
   * @param {*} selection
   * @param {*} row
   * @param {*} options
   */
  handleTableSelectAllEvent = (selection, row, options = this.options) => {
    if (options.singlePageSelect) {
      this.tableSelection = selection
      return
    }
  }
  clearTableSelection = () => {
    this.tableSelection = []
    this._getVueValue('VUE_TableRef').clearSelection()
  }
  /**
   * 表格显示上，将当前行上移
   * 注意：table...开头（相关）为纯逻辑操作，后端数据不进行操作
   * @param {*} _TableMixinsId
   * @param {*} count 移动的行数
   */
  tableRowUp = (_TableMixinsId,count = 1) => {
    let index = _.findIndex(this.tableData, (item) => {
      return item._TableMixinsId === _TableMixinsId
    })
    if (index > 0) {
      let temp = this.tableData[index]
      let newIndex = index - count
      if (newIndex < 0) {
        newIndex = 0
      }
      //上移,移除当前行
      this.tableData.splice(index, 1)
      //在指定位置插入
      this.tableData.splice(newIndex, 0, temp)
    }
  }
  /**
   * 表格显示上，将当前行下移
   * 注意：table...开头（相关）为纯逻辑操作，后端数据不进行操作
   * @param {*} _TableMixinsId
   * @param {*} count 移动的行数
   */
  tableRowDown = (_TableMixinsId,count = 1) => {
    let index = _.findIndex(this.tableData, (item) => {
      return item._TableMixinsId === _TableMixinsId
    })
    if (index < this.tableData.length - 1) {
      let temp = this.tableData[index]
      let newIndex = index + count
      if (newIndex > this.tableData.length - 1) {
        newIndex = this.tableData.length - 1
      }
      //下移,移除当前行
      this.tableData.splice(index, 1)
      //在指定位置插入
      this.tableData.splice(newIndex, 0, temp)
    }
  }
  /**
   * 删除行显示
   * 注意：table...开头（相关）为纯逻辑操作，后端数据不进行操作
   * @param {*} _TableMixinsId
   */
  tableDeleteRow = (_TableMixinsId) => {
    this._log('deleteRow', _TableMixinsId);
    let index = _.findIndex(this.tableData, (item) => {
      return item._TableMixinsId === _TableMixinsId
    })
    if (index !== -1) {
      this.tableData.splice(index, 1)
    }
  }
  /**
   * 批量删除行显示
   * 注意：table...开头（相关）为纯逻辑操作，后端数据不进行操作
   * @param {*} _TableMixinsIds
   */
  tableDeleteRows = (_TableMixinsIds) => {
    _.forEach(_TableMixinsIds, (_TableMixinsId) => {
      this.tableDeleteRow(_TableMixinsId)
    })
  }
  /**
   * 批量删除tableSelection选中的行显示
   * @returns
   */
  tableDeleteSelectedRows = () => {
    if (this.tableSelection.length === 0) {
      this.vueInstance.$message.warning('请选择要删除的数据')
      return
    }
    let ids = this.tableSelection.map(item => {
      return _.get(item, '_TableMixinsId')
    })
    this.tableDeleteRows(ids)
  }


  /**
   * 点击form的按钮查询，可通过@click="tableNameHandler.query"被调用
   */
  query = () => {
    this.currentPage = 1
    this.getList()
  }
  /**
   * 重置，可通过@click="tableNameHandler.reset"被调用
   * 注意：如果用户需要额外重置，用户可以设置tableNameExtraReset方法，方法无参数，用户可以在此方法中对表单进行额外的reset处理
   */
  reset = () => {
    this._getVueValue('VUE_QueryFormRef').resetFields()
    //额外重置的属性
    let extraReset = this._getVueValue('VUE_METHOD_ExtraResetPath')
    if (extraReset) {
      extraReset()
    }

    this.vueInstance.$nextTick(() => {
      this.query()
    })
  }
  /**
   * 打开创建或编辑窗口，可通过@click="tableNameHandler.openCreateOrUpdate"被调用
   * 注意：需要提前引用createOrUpdate组件，组件中应包含open方法，设置createOrUpdateRef，格式为tableNameCreateOrUpdateRef
   * @param {*} data
   * @param {*} readOnly
   */
  openCreateOrUpdate = (data, readOnly = false) => {
    if (!this._getVueValue('VUE_CreateOrUpdateRef')) {
      console.warn('[TableHander] please set the createOrUpdateRef:', this.VUE_CreateOrUpdateRef)
      return
    } else {
      this._getVueValue('VUE_CreateOrUpdateRef').open(data, readOnly)
    }
  }
  /**
   * 删除多行数据，询问并调用api
   * @param {*} options
   */
  deleteSelectedRowsData = (options = this.options) => {
    if (this.tableSelection.length === 0) {
      this.vueInstance.$message.warning('请选择要删除的数据')
      return
    }
    this.vueInstance.$confirm(`确定删除${this.tableSelection.length}条数据吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let ids = this.tableSelection.map(item => {
        return _.get(item, options.tableIdPath)
      })
      if (options.onlySingleDelete) {
        _.forEach(ids, (id) => {
          this.deleteRowDataByApi(id, options)
        })
      } else {
        this.deleteRowDataByApi(ids, options)
      }
    }).catch(() => {
    });
  }
  /**
   * 删除单行数据，询问并调用api
   * @param {*} row
   * @param {*} options
   */
  deleteRowData = (row, options = this.options) => {
    let id = row[options.tableIdPath]
    this.vueInstance.$confirm(`确定删除这条数据吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deleteRowDataByApi(id, options)
    }).catch(() => {
    });
  }
  /**
   * 删除数据时最后调用的api
   * @param {*} ids
   * @param {*} options
   */
  deleteRowDataByApi = async (ids, options = this.options) => {
    let deleteApi = options.deleteApi
    if (deleteApi) {
      console.log('ids', ids, options.singleDeleteIdUseArray, _.isString(ids))
      if (options.singleDeleteIdUseArray && !_.isArray(ids)) ids = [ids]
      if (options.deleteIdJoinBy) ids = ids.join(options.deleteIdJoinBy)

      let params = null
      if (options.deleteIdName) {
        params = { [options.deleteIdName]: ids }
      } else {
        params = ids
      }
      let res = await deleteApi(params)
      let code = _.get(res, options.successCodePath)
      if (code === options.successCode) {
        this.vueInstance.$message.success('删除成功')
        this.getList(options)
      }
    }
  }
  /**
   * 获取vue实例的值，内部方法
   * @param {*} name
   * @param {*} defaultValue
   * @returns
   */
  _getVueValue = (name, defaultValue = null) => {
    if (!name) {
      throw new Error('[TableHander] name is not set')
    }
    if (!this.vueInstance) {
      console.warn('[TableHander] vueInstance is not set')
      return defaultValue
    }
    return _.get(this.vueInstance, this[name], defaultValue)
  }

  /**
   * 设置vue实例的值，内部方法
   * @param {*} name
   * @param {*} value
   */
  _setVueValue = (name, value) => {
    if (!this.vueInstance) {
      console.warn('[TableHander] vueInstance is not set')
      return
    }
    _.set(this.vueInstance, this[name], value)
  }

  /**
   * 处理表格数据，内部方法
   * @param {*} list
   * @returns
   */
  _handleTableData = (list) => {
    //用lodash给每一个数据添加一个id
    _.forEach(list, (item, index) => {
      item._TableMixinsId = _.uniqueId('TID_')
    })
    return list
  }

}


