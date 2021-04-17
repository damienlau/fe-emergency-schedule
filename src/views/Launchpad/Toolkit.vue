<template>
  <lau-header></lau-header>
  <a-layout-content class="lau-layout-content"></a-layout-content>
</template>

<script>
import { readonly } from "@vue/reactivity";

import LauHeader from "../../components/Header.vue";

export default {
  name: "Toolkit",
  components: { LauHeader },
  setup() {},
};
</script>
