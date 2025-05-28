<template>
  <!-- 表单容器 -->
  <el-form
    :ref="'form_' + id_"
    :model="formObj"
    :inline="inline"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :label-suffix="labelSuffix"
    :hide-required-asterisk="hideRequiredAsterisk"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-on-rule-change="validateOnRuleChange"
    :size="size"
    :disabled="disabled"
  >
    <!-- 动态表单项 -->
    <el-form-item
      v-for="(item, index) of filteredSettings"
      v-show="item.vShow !== false"
      :key="id_ + '_' + index"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
      :label-width="item.labelWidth || ''"
      :required="item.required || false"
      :error="item.error || ''"
      :show-message="item.showMessage || true"
      :inline-message="item.inlineMessage || false"
      :size="item.size || ''"
    >
      <!-- 动态组件 -->
      <component
        :ref="item.ref"
        :is="TYPES_LAYOUT[item.type]"
        v-model="formObj[item.prop]"
        v-bind="item.itemOptions"
      ></component>
    </el-form-item>
    <el-button @click="onSubmit">submit</el-button>
  </el-form>
</template>
  <script>
import * as constants from "./constants/index";
import ChSelect from "../Select/index.vue";
import _ from "lodash";
export default {
  name: "ChForm",
  components: {
    ChSelect,
  },
  props: {
    settings: {
      type: Array,
      default: () => [],
      validator: (value) => {
        return value.every((item) => {
          if (!item.type || !constants.TYPES.includes(item.type)) {
            console.error(
              `[CHForm][propError]:[settings.${item.label||item.prop}.type] = ${item.type} is required and must be in`,
              _.join(constants.TYPES, ",")
            );
            return false;
          }
          if(item.prop == undefined){
            console.error(
              `[CHForm][propError]:[settings.${item.label}.prop] = ${item.prop} is required`
            );
            return false;
          }
          return true;
        });
      },
    },
    inline: {
      type: Boolean,
      default: false,
    },
    labelPosition: {
      type: String,
      default: "right",
      validator: (value) => {
        if (!constants.LABEL_POSITIONS.includes(value)) {
          console.error(
            "[CHForm][propError]:[labelPosition] is required and must be in",
            _.join(constants.LABEL_POSITIONS, ",")
          );
          return false;
        }
        return true;
      },
    },
    labelWidth: {
      type: String,
      default: "auto",
    },
    labelSuffix: {
      type: String,
      default: "",
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false,
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    inlineMessage: {
      type: Boolean,
      default: false,
    },
    statusIcon: {
      type: Boolean,
      default: false,
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "",
      validator: (value) => {
        if (!constants.SIZES.includes(value)) {
          console.error(
            "[CHForm][propError]:[size] is required and must be in",
            _.join(constants.SIZES, ",")
          );
          return false;
        }
        return true;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    TYPES_LAYOUT() {
      return constants.TYPES_LAYOUT;
    },
    TYPES() {
      return constants.TYPES;
    },
    filteredSettings() {
      return this.settings.filter((item) => item.vIf !== false);
    },
  },
  data() {
    return {
      id_: _.random(1000000, 9999999),
      formObj: {},
      resetBackUp: {},
    };
  },
  created() {
    // 初始化formObj
    this.formObj = _.reduce(
      this.settings,
      (acc, field) => {
        acc[field.prop] = _.has(field, "defaultValue")
          ? field.defaultValue
          : constants.TYPES_DEFAULT_VALUE[field.type] || null;
        return acc;
      },
      {}
    );
    this.resetBackUp = _.cloneDeep(this.formObj);
  },
  methods: {
    onSubmit() {
      this.getFormRef().validate((valid) => {
        if (valid) {
          this.$emit("submit", this.formObj);
        } else {
          this.$emit("submitError", valid);
        }
      });
    },
    getFormRef() {
      return this.$refs[`form_${this.id_}`];
    },
    resetForm() {
      this.formObj = _.cloneDeep(this.resetBackUp);
    },
    getRef(refName) {
      console.log(this.$refs);
      return _.get(this.$refs,refName+'[0]')
    },
    action(refName, actionName, ...args) {
      const ref = this.getRef(refName);
      console.log(ref);
      if (ref) {
        ref[actionName](...args);
      } else {
        console.error(`[CHForm][actionError]:[refName] = ${refName} is not found`);
      }
    },
  },
};
</script>
  <style scoped>
</style>