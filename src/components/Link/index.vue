<template>
  <el-link v-bind="$attrs" @click="handleEvent('click', $event)">
    <i v-if="leftIcon" :class="leftIcon"></i>
    {{ label}}
    <i v-if="rightIcon" :class="rightIcon"></i>
  </el-link>
</template>

<script>
import _ from "lodash";
import FormItemMixins from "../Mixins/FormItemMixins";
export default {
  name: "ChLink",
  mixins: [FormItemMixins],
  props: {
    label: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    eventHandlers: {
      type: Object,
      default: () => {},
      validator: (value) => {
        return Object.keys(value).every((key) => {
          if(typeof value[key] !== "function"){
            console.error(`[CHLink][propError]:[eventHandlers.${key}] = ${value[key]} is not a function`);
            return false;
          }
          return true;
        });
      }
    }
  },
  methods: {
    handleEvent(evnetName, event) {
      if(_.get(this.eventHandlers, evnetName)){
        this.eventHandlers[evnetName](event);
      }
      this.$emit("CH_FORM_HANDLE_EVENT", { evnetName, eventBody: event });
    },
  }
}

</script>

<style>
</style>