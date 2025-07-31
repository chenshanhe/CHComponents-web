import _ from 'lodash';
import TableHander from './TabelHander';

// 工厂函数，为每个组件创建独立的 mixin
export default function tableMixin(config) {
  let _TableHandlers = {};
  let _TableOptions = {};
  let _TableQueryFrom = {};
  let _TableQueryFromRef = {};

  // 初始化配置
  _.forEach(config, (value, key) => {
    _TableHandlers[key + 'Handler'] = new TableHander(key, value);
    _TableQueryFrom[key + 'QueryForm'] = {}
    _TableQueryFromRef[key + 'QueryFormRef'] = {}
  });

  return {
    mounted() {
      console.log('mounted rrrrrrparams', this.sercieArea);
      _.forEach(_TableHandlers, (handler, key) => {
        handler.setVueInstance(this);
        handler.initInMount();
      });
    },
    computed: {
      _onlyOneTable() {
        if (_.keys(_TableOptions).length === 1) {
          return _.keys(_TableOptions)[0];
        }
        return null;
      }
    },
    data() {
      return {
        ..._TableQueryFrom,
        ..._TableHandlers,
      };
    },
  };
}

// 为了保持向后兼容，保留原来的 init 方法
export function init(data) {
  console.warn('TableMixins.init() 已废弃，请使用 createTableMixin() 替代');
  return createTableMixin(data);
}
