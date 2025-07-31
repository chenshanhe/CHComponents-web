import _ from 'lodash';

/**
 * TableHandler 全局配置工具
 * 用于设置整个项目中 TableHandler 的默认配置
 */
class TableHandlerConfig {
  constructor() {
    this.defaultOptions = {
      // 是否在mounted时自动获取数据
      initInMount: true,
      // 需要发送请求时从form中删除的属性（路径）
      formUnset: [],
      // 返回数据中list的路径
      tableDataPath: 'data',
      // 是否使用分页
      usePager: true,
      // 分页模式，false为分页模式，true为limit模式
      limitMode: false,
      // 可选择的分页大小范围
      pageSizes: [10, 20, 30, 50],
      // 返回和请求时的分页当前页的路径
      currentPagePath: 'currentPage',
      // limit模式下，请求参数中offset的路径
      limitModeOffsetPath: 'offset',
      // limit模式下，请求参数中limit的路径
      limitModeLimitPath: 'limit',
      // 返回和请求时的分页大小的路径
      pageSizePath: 'pageSize',
      // 返回和请求时的分页总条数的路径
      totalPath: 'total',
      // 返回成功的code
      successCode: "0",
      // 返回的code的路径
      successCodePath: 'code',
      // 返回数据中id的路径
      tableIdPath: 'id',
      // 调用删除api时重命名id，如设置delId时返回{delId:[123,456]},不设置返回[123,456]
      deleteIdName: '',
      // 删除id时，id的拼接方式，如设置','时返回{delId:'123,456'},不设置返回{delId:[123,456]}
      deleteIdJoinBy: '',
      // 后端接口只支持单行删除时，设置为true
      onlySingleDelete: false,
      // 单行删除时，id是否使用数组格式
      singleDeleteIdUseArray: true,
      // 是否单页选择,还是多页选择在同一个selection中
      singlePageSelect: true,
      // 初始时的默认值当前页，默认1
      currentPage: 1,
      // 初始时的默认值分页大小，默认10
      pageSize: 10,
      // 初始时的默认值总条数，默认0
      total: 0,
    };
  }

  /**
   * 设置全局默认配置
   * @param {Object} options - 配置选项
   */
  setDefaultOptions(options) {
    this.defaultOptions = _.merge({}, this.defaultOptions, options);
  }

  /**
   * 获取全局默认配置
   * @returns {Object} 默认配置
   */
  getDefaultOptions() {
    return _.cloneDeep(this.defaultOptions);
  }

  /**
   * 合并用户配置和默认配置
   * @param {Object} userOptions - 用户配置
   * @returns {Object} 合并后的配置
   */
  mergeOptions(userOptions = {}) {
    return _.merge({}, this.defaultOptions, userOptions);
  }

  /**
   * 重置为默认配置
   */
  reset() {
    this.defaultOptions = {
      initInMount: true,
      formUnset: [],
      tableDataPath: 'data',
      usePager: true,
      limitMode: false,
      pageSizes: [10, 20, 30, 50],
      currentPagePath: 'currentPage',
      limitModeOffsetPath: 'offset',
      limitModeLimitPath: 'limit',
      pageSizePath: 'pageSize',
      totalPath: 'total',
      successCode: "0",
      successCodePath: 'code',
      tableIdPath: 'id',
      deleteIdName: '',
      deleteIdJoinBy: '',
      onlySingleDelete: false,
      singleDeleteIdUseArray: true,
      singlePageSelect: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  }
}

// 创建单例实例
const tableHandlerConfig = new TableHandlerConfig();

export default tableHandlerConfig; 