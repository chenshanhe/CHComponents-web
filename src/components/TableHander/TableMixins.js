import _ from 'lodash';
import TableHander from './TabelHander';
let _TableHandlers = {};
let _TableOptions = {};
let _TableQueryFrom = {};
let _TableQueryFromRef = {};
export default {
  init(data) {
    _.forEach(data, (value, key) => {
      _TableHandlers[key + 'Handler'] = new TableHander(key, value, this);
      _TableQueryFrom[key + 'QueryForm'] = {}
      _TableQueryFromRef[key + 'QueryFormRef'] = {}
    });
  },
  mounted() {
    console.log('mounted', this.sercieArea);
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
}
