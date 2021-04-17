<template>
  <a-layout class="toolkit">
    <lau-header></lau-header>
    <a-layout-content class="lau-layout-content">
      <keep-alive>
        <component :is="toolkitActiveComponent"></component>
      </keep-alive>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";

import LauHeader from "../../components/Header.vue";
import ToolkitSurveyInfo from "../Toolkit/SurveyInfo.vue";
import ToolkitGeoFenceInfo from "../Toolkit/GeoFenceInfo.vue";
import ToolkitSickbedInfo from "../Toolkit/SickbedInfo.vue";

export default {
  name: "Toolkit",
  components: {
    LauHeader,
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
    const toolkitActiveComponent = ref(toolkitComponents[0].key);

    return { toolkitComponents, toolkitActiveComponent };
  },
};
</script>
