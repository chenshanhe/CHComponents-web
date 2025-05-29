<template>
  <el-button v-bind="$attrs" @click="handleEvent('click', $event)">
    <i v-if="leftIcon" :class="leftIcon"></i>
    {{ label}}
    <i v-if="rightIcon" :class="rightIcon"></i>
  </el-button>
</template>

<script>
import _ from "lodash";
import FormItemMixins from "../Mixins/FormItemMixins";
export default {
  name: "ChButton",
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
  },
  methods: {

  }
}

</script>

<style>
</style>