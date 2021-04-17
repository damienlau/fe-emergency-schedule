<template>
  <a-table class="lau-table">
    <template #action>
      <slot name="action"></slot>
    </template>
  </a-table>
</template>

<script>
export default {
  name: "LauTable",
  setup() {},
};
</script>
