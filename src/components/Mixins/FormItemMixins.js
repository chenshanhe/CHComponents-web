import constants from "./CommonMixins"
export default {
  mixins: [constants],
  props: {

  },
  methods: {
    handleEvent(eventName, event) {
      if (_.get(this.eventHandlers, eventName)) {
        this.eventHandlers[eventName](event);
      }

      // 更新内部值，watch会自动处理input事件的发送
      if (eventName === 'input' || eventName === 'change') {
        this.modelValue = event;
      }

      this.$emit("CH_FORM_HANDLE_EVENT", { eventName, eventBody: event });
    },
  },
}