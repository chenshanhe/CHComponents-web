<template>
  <el-date-picker
    v-model="dateValue"
    type="datetimerange"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :picker-options="pickerOptions"
    :editable="editable"
    :clearable="clearable"
    @change="handleChange"
  />
</template>

<script>
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
import _ from "lodash";
import { pareseShortcuts, isUnit } from "../../utils/ChUtils/DateUtil";
import FormItemMixins from "../Mixins/FormItemMixins";
export default {
  name: "ChDateTimePicker",
  mixins: [FormItemMixins],

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    rangeSeparator: {
      type: String,
      default: "至",
    },
    startPlaceholder: {
      type: String,
      default: "开始日期",
    },
    endPlaceholder: {
      type: String,
      default: "结束日期",
    },
    editable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    //选择时实时显示的范围
    // date	D	日期
    // day	d	星期(星期日0，星期六6)
    // month	M	月份(0-11)
    // year	y	年
    // hour	h	小时
    // minute	m	分钟
    // second	s	秒
    // millisecond	ms	毫秒
    selectRangeBefore: {
      type: Object,
      default: () => {},
      validator(val) {
        if (!_.isObject(val)) {
          console.error("CHc[DatePicker][selectRangeBefore]:类型错误", val);
          return false;
        }
        if (!_.isNumber(val.time)) {
          console.error("CHc[DatePicker][selectRangeBefore]:时间格式错误", val);
          return false;
        }
        if (!_.isString(val.unit)) {
          console.error("CHc[DatePicker][selectRangeBefore]:时间单位错误", val);
          return false;
        }

        if (!isUnit(val.unit)) {
          console.error("CHc[DatePicker][selectRangeBefore]:时间单位错误", val);
          return false;
        }
        if (val.includeSame) {
          val.includeSame = true;
        } else {
          val.includeSame = false;
        }
        return true;
      },
    },
    selectRangeAfter: {
      type: Object,
      default: () => {},
      validator(val) {
        if (!_.isObject(val)) {
          console.error("CHc[DatePicker][selectRangeAfter]:类型错误", val);
          return false;
        }
        if (!_.isNumber(val.time)) {
          console.error("CHc[DatePicker][selectRangeAfter]:时间格式错误", val);
          return false;
        }
        if (!_.isString(val.unit)) {
          console.error("CHc[DatePicker][selectRangeAfter]:时间单位错误", val);
          return false;
        }
        if (
          ![
            "date",
            "day",
            "month",
            "year",
            "hour",
            "minute",
            "second",
            "millisecond",
          ].includes(val.unit)
        ) {
          console.error("CHc[DatePicker][selectRangeAfter]:时间单位错误", val);
          return false;
        }
        if (val.includeSame) {
          val.includeSame = true;
        } else {
          val.includeSame = false;
        }
        return true;
      },
    },
    //默认显示的范围
    defaultRangeBefore: {
      type: Object,
      default: () => {},
      validator(val) {
        if (val.date) {
          let date = pareseShortcuts(val.date);
          if (date) {
            val.date = date.format("YYYY-MM-DD");
            return true;
          }
          if (!dayjs(val.date).isValid()) {
            console.error(
              "CHc[DatePicker][defaultRange.before]:时间格式无法被解析",
              val.date
            );
            return false;
          }
          return true;
        }
        if (val.includeSame) {
          val.includeSame = true;
        } else {
          val.includeSame = false;
        }
        return true;
      },
    },
    defaultRangeAfter: {
      type: Object,
      default: () => {},
      validator(val) {
        if (val.date) {
          let date = pareseShortcuts(val.date);
          if (date) {
            val.date = date.format("YYYY-MM-DD");
            return true;
          }
          if (!dayjs(val.date).isValid()) {
            console.error(
              "CHc[DatePicker][defaultRange.after]:时间格式无法被解析",
              val.date
            );
            return false;
          }
          return true;
        }
        if (val.includeSame) {
          val.includeSame = true;
        } else {
          val.includeSame = false;
        }
        return true;
      },
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val && val.length === 2) {
          this.dateValue = val;
        }
      },
    },
  },
  computed: {
    today() {
      return dayjs().startOf("day");
    },
    tomorrow() {
      return dayjs().add(1, "day").startOf("day");
    },
    yesterday() {
      return dayjs().subtract(1, "day").startOf("day");
    },
  },
  data() {
    return {
      dateValue: this.defaultDate || this.value,
      selectingDate: null,
      pickerOptions: {
        disabledDate: (date) => {
          let flagArr = [];

          if (this.defaultRangeBefore && this.defaultRangeBefore.date) {
            if (this.defaultRangeBefore.includeSame) {
              flagArr.push(
                !dayjs(date).isSameOrBefore(dayjs(this.defaultRangeBefore.date))
              );
            } else {
              flagArr.push(
                !dayjs(date).isBefore(dayjs(this.defaultRangeBefore.date))
              );
            }
          }
          if (this.defaultRangeAfter && this.defaultRangeAfter.date) {
            if (this.defaultRangeAfter.includeSame) {
              flagArr.push(
                !dayjs(date).isSameOrAfter(dayjs(this.defaultRangeAfter.date))
              );
            } else {
              flagArr.push(
                !dayjs(date).isAfter(dayjs(this.defaultRangeAfter.date))
              );
            }
          }

          if (this.selectingDate != null && this.selectRangeBefore) {
            let selectRangeBeforeDate = dayjs(this.selectingDate).subtract(
              this.selectRangeBefore.time,
              this.selectRangeBefore.unit
            );
            if (this.selectRangeBefore.includeSame) {
              flagArr.push(!dayjs(date).isSameOrAfter(selectRangeBeforeDate));
            } else {
              flagArr.push(!dayjs(date).isAfter(selectRangeBeforeDate));
            }
          }
          if (this.selectingDate != null && this.selectRangeAfter) {
            let selectRangeAfterDate = dayjs(this.selectingDate).add(
              this.selectRangeAfter.time,
              this.selectRangeAfter.unit
            );
            if (this.selectRangeAfter.includeSame) {
              flagArr.push(!dayjs(date).isSameOrBefore(selectRangeAfterDate));
            } else {
              flagArr.push(!dayjs(date).isBefore(selectRangeAfterDate));
            }
          }

          return _.includes(flagArr, true);
        },
        onPick: ({ maxDate, minDate }) => {
          this.selectingDate = minDate && minDate.getTime();
          if (maxDate) {
            this.selectingDate = null;
          }
        },
      },
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
