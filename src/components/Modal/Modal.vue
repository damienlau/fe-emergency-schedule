<template>
  <a-modal centered :width="650" :footer="null" destroy-on-close>
    <slot></slot>
  </a-modal>
</template>

<script>
export default {
  name: "LauModal",
  setup() {},
};
</script>
