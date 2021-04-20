<template>
  <a-layout class="lau-layout home">
    <router-view
      v-for="route in routeConfig"
      :key="route.key"
      :name="route.key"
    ></router-view>
  </a-layout>
</template>

<script>
import { readonly } from "@vue/reactivity";

export default {
  setup() {
    const routeConfig = readonly([
      {
        key: "facetime",
        label: "视频通讯",
      },
      {
        key: "map",
        label: "指挥调度",
      },
      {
        key: "toolkit",
        label: "工具箱",
      },
    ]);

    return { routeConfig };
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-flow: row nowrap;

  > * {
    width: calc(100% / 3);
  }
}
</style>
