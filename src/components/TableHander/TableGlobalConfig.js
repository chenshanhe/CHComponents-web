import TableHandlerConfig from './TableHandlerConfig';

/**
 * 全局配置工具
 * 提供便捷的全局配置方法
 */
export const TableGlobalConfig = {
  /**
   * 设置 TableHandler 全局默认配置
   * @param {Object} options - 配置选项
   * @example
   * // 在 main.js 中调用
   * import { globalConfig } from 'ch-components-web'
   * globalConfig.setTableHandlerDefaults({
   *   successCode: '200',
   *   successCodePath: 'status',
   *   tableDataPath: 'result.data',
   *   totalPath: 'result.total',
   *   pageSizes: [20, 50, 100]
   * })
   */
  setTableHandlerDefaults(options) {
    TableHandlerConfig.setDefaultOptions(options);
  },

  /**
   * 获取 TableHandler 当前默认配置
   * @returns {Object} 当前默认配置
   */
  getTableHandlerDefaults() {
    return TableHandlerConfig.getDefaultOptions();
  },

  /**
   * 重置 TableHandler 为默认配置
   */
  resetTableHandlerDefaults() {
    TableHandlerConfig.reset();
  }
};

export default TableGlobalConfig; 