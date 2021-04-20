<template>
  <a-menu
    v-model:selectedKeys="menuSelectedKey"
    mode="inline"
    class="lau-menu-tree"
    @select="handleSelect"
  >
    <a-menu-item v-for="(menu, index) in menus" :key="index">
      <span>{{ menu.label }}</span>
      <slot name="extra"></slot>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { inject, ref } from "@vue/runtime-core";

export default {
  name: "LauMenuTree",
  components: {},
  props: {
    menus: {
      type: Array,
      require: true,
      default: new Array(),
    },
  },
  setup(props) {
    // 定义菜单数据对象
    const menuSelectedKey = ref("");
    // 定义菜单数据选择后回调事件
    const handleChange = inject("getMenuData");

    const handleSelect = ({ item, key, selectedKeys }) => {
      handleChange(menuSelectedKey);
    };

    return { menuSelectedKey, handleSelect };
  },
};
</script>

<style lang="less" scoped>
.menu-item-icon {
  position: absolute;
  top: 14px;
  left: 16px;
}
</style>
