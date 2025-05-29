import _ from 'lodash'
export default {
  data() {
    return {
      modelValue: this.value,
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: null,
    },
    onBeforeCreate: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[beforeCreate] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onCreated: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[created] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onBeforeMount: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[beforeMount] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onMounted: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[mounted] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onBeforeUpdate: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[beforeUpdate] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onUpdated: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[updated] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onBeforeDestroy: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHSelect][propError]:[beforeDestroy] = is not a function`
          );
          return false
        }
        return true
      }
    },
    onDestroyed: {
      type: Function,
      default: () => { },
      validator: (value) => {
        if (!_.isFunction(value)) {
          console.error(
            `[CHComponents][propError]:[destroyed] = is not a function`
          );
          return false
        }
        return true
      }
    },
    eventHandlers: {
      type: Object,
      default: () => { },
      validator: (value) => {
        return Object.keys(value).every((key) => {
          return _.isFunction(value[key]);
        });
      }
    }
  },
  // 自动调用传入的生命周期函数
  beforeCreate() {
    // 在 beforeCreate 阶段，props 可能还没有完全初始化，所以需要安全检查
    if (this.$options.propsData && this.$options.propsData.onBeforeCreate && _.isFunction(this.$options.propsData.onBeforeCreate)) {
      this.$options.propsData.onBeforeCreate(this);
    }
  },
  created() {
    if (this.onCreated && _.isFunction(this.onCreated)) {
      this.onCreated(this);
    }
  },
  beforeMount() {
    if (this.onBeforeMount && _.isFunction(this.onBeforeMount)) {
      this.onBeforeMount(this);
    }
  },
  mounted() {
    if (this.onMounted && _.isFunction(this.onMounted)) {
      this.onMounted(this);
    }
  },
  beforeUpdate() {
    if (this.onBeforeUpdate && _.isFunction(this.onBeforeUpdate)) {
      this.onBeforeUpdate(this);
    }
  },
  updated() {
    if (this.onUpdated && _.isFunction(this.onUpdated)) {
      this.onUpdated(this);
    }
  },
  beforeDestroy() {
    if (this.onBeforeDestroy && _.isFunction(this.onBeforeDestroy)) {
      this.onBeforeDestroy(this);
    }
  },
  destroyed() {
    if (this.onDestroyed && _.isFunction(this.onDestroyed)) {
      this.onDestroyed(this);
    }
  },
  watch: {
    value(newVal) {
      this.modelValue = newVal;
    },
    modelValue(newVal) {
      this.$emit('input', newVal);
    }
  },
  methods: {
    handleEvent(evnetName, event) {
      if (_.get(this.eventHandlers, evnetName)) {
        this.eventHandlers[evnetName](event);
      }

      // 更新内部值，watch会自动处理input事件的发送
      if (evnetName === 'input' || evnetName === 'change') {
        this.modelValue = event;
      }
    },
  }
};
