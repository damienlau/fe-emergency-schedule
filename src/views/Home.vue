<template>
  <router-view
    v-for="route in routeConfig"
    :key="route.key"
    :name="route.key"
  ></router-view>
</template>

<script>
import { readonly } from "@vue/reactivity";
export default {
  setup() {
    const routeConfig = readonly([
      // {
      //   key: "facetime",
      //   label: "视频通讯",
      // },
      // {
      //   key: "map",
      //   label: "指挥调度",
      // },
      {
        key: "toolkit",
        label: "工具箱",
      },
    ]);

    return { routeConfig };
  },
};
</script>
