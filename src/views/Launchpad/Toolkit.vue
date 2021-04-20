<template>
  <a-layout class="toolkit">
    <lau-header>
      <template #content>
        <lau-menu :menus="toolkitComponents"></lau-menu>
      </template>
    </lau-header>
    <a-layout-content class="lau-layout-content">
      <keep-alive>
        <component :is="toolkitActiveComponent"></component>
      </keep-alive>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { provide, reactive, ref, shallowRef } from "@vue/runtime-core";

import LauHeader from "../../components/Header.vue";
import LauMenu from "../../components/Menu/Menu.vue";
import ToolkitSurveyInfo from "../Toolkit/SurveyInfo.vue";
import ToolkitGeoFenceInfo from "../Toolkit/GeoFenceInfo.vue";
import ToolkitSickbedInfo from "../Toolkit/SickbedInfo.vue";

export default {
  name: "Toolkit",
  components: {
    LauHeader,
    LauMenu,
    ToolkitSurveyInfo,
    ToolkitGeoFenceInfo,
    ToolkitSickbedInfo,
  },
  setup() {
    // 定义工具箱子组件库
    const toolkitComponents = reactive([
      { key: "ToolkitSurveyInfo", label: "勘查信息" },
      { key: "ToolkitGeoFenceInfo", label: "围栏动态" },
      { key: "ToolkitSickbedInfo", label: "病床信息" },
    ]);
    // 定义工具箱当前子组件
    const toolkitActiveComponent = shallowRef(toolkitComponents[0].key);

    const handleSelect = (menuSelectedKey) => {
      toolkitActiveComponent.value = menuSelectedKey.value.toString();
    };

    provide("getMenuData", handleSelect);

    return { toolkitComponents, toolkitActiveComponent };
  },
};
</script>
