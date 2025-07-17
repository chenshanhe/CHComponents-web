<template>
  <el-select
    v-model="showValue"
    popper-class="CH_tree-select-dropdown"
    :disabled="disabled"
  >
    <template #empty>
      <div v-if="options.length === 0" class="CH_tree-select-empty">
        暂无数据
      </div>
      <el-tree
        v-else
        :ref="'CH_select_tree' + id_"
        :data="options"
        :props="treeDefaultProps"
        node-key="_path"
        show-checkbox
        @check="handleCheck"
      />
    </template>
  </el-select>
</template>

<script>
import FormItemMixins from "../Mixins/FormItemMixins";

export default {
  name: "ChTreeSelect",
  mixins: [FormItemMixins],
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    nodeKey: {
      type: String,
      default: "id",
    },
    treeDefaultProps: {
      type: Object,
      default: () => ({
        children: "children",
        label: "label",
      }),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      handler(newVal) {
        console.log("value111",newVal)
        if (newVal && newVal.length > 0) {
          console.log(
            newVal[0][this.treeDefaultProps.label],
            this.treeDefaultProps.label
          );
          this.showValue = newVal[0][this.treeDefaultProps.label];
        } else {
          this.showValue = "";
        }
      },
      immediate: true,
      deep: true,
    },
    showValue: {
      handler(newVal) {
        if (!newVal) {
          this.$refs["CH_select_tree" + this.id_].setCheckedKeys([]);
        }
      },
      immediate: true,
      deep: true,
    },
    treeData: {
      handler(newVal) {
        //处理数据每层加level，递归
        let level = -1;
        const addLevel = (data, parentPath) => {
          level++;
          data.forEach((item) => {
            if (!parentPath) {
              item._path = item[this.nodeKey] + '';
            } else {
              item._path = parentPath + "__" + item[this.nodeKey];
            }
            item.level = level;
            if (item[this.treeDefaultProps.children]) {
              addLevel(item[this.treeDefaultProps.children], item._path);
            }
          });
        };
        addLevel(newVal);
        console.log("newVal",newVal)
        this.options = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      id_: _.random(1000000, 9999999),
      options: this.treeData,
      showValue: "",
    };
  },
  methods: {
    handleCheck(node, checked) {
      console.log("handleCheck",node,checked)
      if (checked.checkedKeys.length > 0) {
        this.$refs["CH_select_tree" + this.id_].setCheckedKeys([node._path]);
      } else {
        this.$refs["CH_select_tree" + this.id_].setCheckedKeys([]);
      }
      let value = this.$refs["CH_select_tree" + this.id_].getCheckedNodes();
      console.log("value",value)
      this.$emit("input", value);
      this.$emit("change", value);
    },
    setOptions(options) {
      let level = -1;
      const addLevel = (data, parentPath) => {
        level++;
        data.forEach((item) => {
          if (!parentPath) {
            item._path = item[this.nodeKey];
          } else {
            item._path = parentPath + "__" + item[this.nodeKey];
          }
          item.level = level;
          if (item[this.treeDefaultProps.children]) {
            addLevel(item[this.treeDefaultProps.children], item._path);
          }
        });
      };
      addLevel(options);
      this.options = options;
    },
    setSelected(id) {
      console.log("setSelected", id);
      this.$refs["CH_select_tree" + this.id_].setCheckedKeys([id]);
      let value = this.$refs["CH_select_tree" + this.id_].getCheckedNodes();
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>
<style lang="scss">
.CH_tree-select-empty {
  text-align: center;
  padding: 10px 0;
  color: #999;
  font-size: 14px;
}
.CH_tree-select-dropdown {
  padding: 10px 5px !important;
  overflow: auto !important;
  height: 350px !important;
  min-height: 200px !important;
  max-height: 400px !important;
}
</style>
<style lang="scss" scoped>
.CH_tree-select-option {
  width: 100%;
  padding: 0;
  background-color: #fff;
  // min-height:262px
  height: 235px !important;
  overflow-y: hidden !important;
}

::v-deep .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff !important;
}
::v-deep .el-tree {
  height: 250px !important;
}
</style>