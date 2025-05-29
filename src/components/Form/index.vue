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
        :ref="'component_' + (item.ref || item.prop) + '_' + id_"
        :is="item.type === 'component' ? item.component : TYPES_LAYOUT[item.type]"
        v-model="formObj[item.prop]"
        v-bind="item.itemOptions"
        @CH_FORM_HANDLE_EVENT="handleComponentEvent($event, item)"
      ></component>
    </el-form-item>
  </el-form>
</template>
  <script>
import * as constants from "./constants/index";
import ChSelect from "../Select/index.vue";
import ChDatePicker from "../DatePicker/index.vue";
import ChDateTimePicker from "../DateTimePicker/index.vue";
import ChLink from "../Link/index.vue";
import ChButton from "../Button/index.vue";
import CommonMixins from "../Mixins/CommonMixins";

import _ from "lodash";
export default {
  name: "ChForm",
  mixins: [CommonMixins],
  components: {
    ChSelect,
    ChDatePicker,
    ChDateTimePicker,
    ChLink,
    ChButton,
  },
  props: {
    settings: {
      type: Array,
      default: () => [],
      validator: (value) => {
        return value.every((item) => {
          if (!item.type || !constants.TYPES.includes(item.type)) {
            console.error(
              `[CHForm][propError]:[settings.${
                item.label || item.prop
              }.type] = ${item.type} is required and must be in`,
              _.join(constants.TYPES, ",")
            );
            return false;
          }
          if (item.prop == undefined) {
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
            `[CHForm][propError]:[settings.labelPosition] = ${value} is required and must be in`,
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
    if (this.created && _.isFunction(this.created)) {
      this.created();
    }
  },
  methods: {
    validate() {
      // 异步验证改为同步
      return new Promise((resolve, reject) => {
        this.getFormRef().validate((valid) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    submit() {
      this.$emit("submit", this.formObj);
      return this.formObj;
    },
    validateAndSubmit() {
      let valid = this.validate();
      if (valid) {
        return this.submit();
      } else {
        return false;
      }
    },
    resetFields() {
      this.getFormRef().resetFields();
      console.log("resetFields", this.formObj);
    },
    getDataByProp(prop) {
      return _.find(this.settings, (item) => item.prop === prop);
    },
    getFormRef() {
      return this.$refs[`form_${this.id_}`];
    },
    resetForm() {
      this.formObj = _.cloneDeep(this.resetBackUp);
    },
    getRef(refName) {
      let setting = this.getDataByProp(refName);
      if (setting) {
        refName = setting.ref || setting.prop;
      }
      return _.get(this.$refs, "component_" + refName + "_" + this.id_ + "[0]");
    },
    action(refName, actionName, ...args) {
      const ref = this.getRef(refName);
      if (ref) {
        ref[actionName](...args);
      } else {
        console.error(
          `[CHForm][actionError]:[refName] = ${refName} is not found`
        );
      }
    },
    handleComponentEvent(event, item) {
      let eventName = (item.ref || item.prop) + "_" + event.eventName;
      this.$emit(eventName, event.eventBody);
    },
    getSettingParam(path) {
      return _.get(this.settings, path);
    },
    setParam(path, value) {
      let option = this.getSettingParam(path);
      if (option) {
        option = value;
      }
    },
  },
};
</script>
  <style scoped>
.el-form--inline .el-form-item {
  vertical-align: top;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

/* 确保不同高度的组件能够对齐 */
.el-form--inline .el-form-item__content {
  vertical-align: top;
}
</style>
