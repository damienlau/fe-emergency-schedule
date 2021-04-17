<template>
  <a-layout-header
    class="lau-layout-header"
    :class="{ 'lau-layout-header-background': hasBackground }"
  >
    <slot name="logo"></slot>
    <slot name="title">
      <h1 class="title">{{ title }}</h1>
    </slot>
    <slot name="extra"></slot>
  </a-layout-header>
</template>

<script>
export default {
  name: "LauHeader",
  props: {
    title: { type: String, require: false, default: "应急指挥调度系统" },
    hasBackground: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
};
</script>
