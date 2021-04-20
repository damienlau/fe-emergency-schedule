<template>
  <a-layout id="map">
    <slot name="sider"></slot>
  </a-layout>
</template>

<script>
import { onMounted } from "@vue/runtime-core";

import Map from "../../utils/map";

export default {
  name: "LaunchpadMap",
  setup() {},
};
</script>

<style lang="less" scoped>
#map {
  margin: 20px;
}
</style>
