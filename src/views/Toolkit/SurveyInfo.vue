<!-- 勘察信息 -->

<template>
  <lau-tab :tabs="tabConfig">
    <template #content>
      <lau-table :data-source="dataSource" :columns="columns">
        <template #action>
          <a-button>删除</a-button>
        </template>
      </lau-table>
    </template>
  </lau-tab>
</template>

<script>
import { readonly } from "@vue/reactivity";

import LauTable from "../../components/Table.vue";
import LauTab from "../../components/Tabs/Tab.vue";

export default {
  name: "Toolkit",
  components: { LauTable, LauTab },
  setup() {
    // 定义标签页配置数据
    const tabConfig = readonly([
      {
        key: "photos",
        label: "拍照",
      },
      {
        key: "videos",
        label: "录像",
      },
      {
        key: "calls",
        label: "通话",
      },
    ]);

    return {
      tabConfig,
    };
  },
};
</script>
