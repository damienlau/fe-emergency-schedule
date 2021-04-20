<template>
  <a-menu
    v-model:selectedKeys="menuSelectedKey"
    class="lau-menu"
    :mode="type"
    @select="handleSelect"
  >
    <a-menu-item v-for="menu in menus" :key="menu.key">
      <lau-icon
        v-if="menuSelectedKey.toString() === menu.key"
        class="menu-item-icon"
        type="erds_mod_icon_right"
      ></lau-icon>
      <span>{{ menu.label }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { inject, shallowRef } from "@vue/runtime-core";

import LauIcon from "../../utils/icon";

export default {
  name: "LauMenu",
  components: {
    LauIcon,
  },
  props: {
    /**
     * 菜单类型
     *
     * @params:['vertical', 'vertical-right', 'horizontal', 'inline']
     */
    type: {
      type: String,
      require: false,
      default: "horizontal",
    },
    menus: {
      type: Array,
      require: true,
      default: new Array(),
    },
    hasBackgroundImage: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  setup(props) {
    // 定义菜单数据对象
    const menuSelectedKey = shallowRef([props.menus[0].key]);
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
