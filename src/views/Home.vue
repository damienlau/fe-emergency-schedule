<template>
  <lau-header></lau-header>
  <a-layout>
    <a-layout-sider></a-layout-sider>
    <a-layout-content></a-layout-content>
  </a-layout>
</template>

<script>
import LauHeader from "../components/Header.vue";

export default {
  name: "Home",
  components: { LauHeader },
};
</script>
