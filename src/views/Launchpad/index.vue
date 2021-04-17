<template>
  <lau-header has-background></lau-header>
  <a-layout>
    <a-layout-sider></a-layout-sider>
    <a-layout-content>2</a-layout-content>
  </a-layout>
</template>

<script>
import LauHeader from "../../components/Header.vue";

export default {
  name: "Launchpad",
  components: { LauHeader },
};
</script>
