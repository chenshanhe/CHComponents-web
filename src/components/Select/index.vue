<template>
  <el-select
    v-model="modelValue"
    :multiple="multiple"
    :disabled="disabled"
    :value-key="valueKey"
    :size="size"
    :clearable="clearable"
    :collapse-tags="collapseTags"
    :multiple-limit="multipleLimit"
    :name="name"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :filterable="filterable"
    :allow-create="allowCreate"
    :filter-method="filterMethod"
    :remote-method="remoteMethod"
    :loading="loading"
    :loading-text="loadingText"
    :no-match-text="noMatchText"
    :no-data-text="noDataText"
    :popper-class="popperClass"
    :reserve-keyword="reserveKeyword"
    :default-first-option="defaultFirstOption"
    :popper-append-to-body="popperAppendToBody"
    :automatic-dropdown="automaticDropdown"
    @change="handleEvent('change', $event)"
    @visible-change="handleEvent('visible-change', $event)"
    @remove-tag="handleEvent('remove-tag', $event)"
    @clear="handleEvent('clear', $event)"
    @blur="handleEvent('blur', $event)"
    @focus="handleEvent('focus', $event)"
    @input="handleEvent('input', $event)"
  >
    <el-option
      v-for="item in selectOptions"
      :key="item[props.key]"
      :label="item[props.label]"
      :value="item[props.value]"
    >
    </el-option>
  </el-select>
</template>

<script>
import * as constants from "./constants/index";
import FormItemMixins from "../Mixins/FormItemMixins";
export default {
  name: "ChSelect",
  mixins: [FormItemMixins],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({
        value: "value",
        label: "label",
        key: "value",
      }),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valueKey: {
      type: String,
      default: "value",
    },
    size: {
      type: String,
      default: "",
      validator: (value) => {
        if (!constants.SIZES.includes(value)) {
          console.error(
            `[CHSelect][propError]:[size] = ${value} is required and must be in`,
            _.join(constants.SIZES, ",")
          );
          return false;
        }
        return true;
      },
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    collapseTags: {
      type: Boolean,
      default: false,
    },
    multipleLimit: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    filterMethod: {
      type: Function,
      default: () => {},
    },
    remoteMethod: {
      type: Function,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "加载中",
    },
    noMatchText: {
      type: String,
      default: "无匹配数据",
    },
    noDataText: {
      type: String,
      default: "无数据",
    },
    popperClass: {
      type: String,
      default: "",
    },
    reserveKeyword: {
      type: Boolean,
      default: false,
    },
    defaultFirstOption: {
      type: Boolean,
      default: false,
    },
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    automaticDropdown: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectOptions: [...this.options],
    };
  },
  watch: {
    options: {
      handler(newOptions) {
        this.selectOptions = [...newOptions];
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setOptions(options) {
      this.selectOptions = options
    },
  },
};
</script>

<style>
</style>
