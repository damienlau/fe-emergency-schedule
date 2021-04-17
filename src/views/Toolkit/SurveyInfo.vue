<!-- 勘察信息 -->

<template>
  <lau-tab :tabs="tabConfig">
    <template #content>
      <lau-filter-form class="filter" :forms="formConfig"></lau-filter-form>
    </template>
  </lau-tab>
</template>

<script>
import { onMounted, readonly } from "@vue/runtime-core";

import { getContactTeam } from "../../api/contact";

import LauTab from "../../components/Tabs/Tab.vue";
import LauFilterForm from "../../components/Form/FilterForm.vue";

export default {
  name: "Toolkit",
  components: { LauTab, LauFilterForm },
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
    // 定义筛选表单配置数据
    const formConfig = readonly([
      {
        key: "",
        label: "群组名称",
      },
      {
        key: "",
        label: "时间筛选",
      },
      {
        key: "",
        label: "所在小组",
      },
    ]);

    onMounted(() => {
      // 查询接口获取所有小组
      getContactTeam().then((data) => {
        console.log(data);
      });
    });

    return {
      tabConfig,
      formConfig,
    };
  },
};
</script>

<style lang="less" scoped>
.filter {
  margin: 28px 0;
}
</style>
