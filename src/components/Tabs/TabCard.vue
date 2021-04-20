<template>
  <a-tabs v-model:activeKey="tabActiveKey" class="lau-tabs-card" type="card">
    <a-tab-pane
      v-for="tab in tabs"
      :key="tab.key"
      :tab="tab.label"
      :closable="false"
    >
      <slot name="content"></slot>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  name: "LauTabCard",
  props: {
    tabs: {
      type: Array,
      require: true,
      default: new Array(),
    },
  },
  setup(props) {
    // 定义当前激活标签页面板的 KEY
    const tabActiveKey = ref(props.tabs[0].key);

    return {
      tabActiveKey,
    };
  },
};
</script>
