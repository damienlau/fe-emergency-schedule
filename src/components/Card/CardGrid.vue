<template>
  <a-row :gutter="20">
    <a-col :span="4">
      <slot name="extra"></slot>
    </a-col>
    <a-col v-for="(card, index) in cards" :key="index" :span="4">
      <a-card class="lau-card card lau-card-demo">
        <div class="demo">{{ selectOptions[card.bedType].label }}</div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "LauCardGrid",
  props: {
    cards: {
      type: Array,
      require: true,
      default: new Array(),
    },
  },
  setup() {
    const selectOptions = ref([
      {
        id: 1,
        label: "儿童病床",
      },
      {
        id: 2,
        label: "男病床",
      },
      {
        id: 3,
        label: "女病床",
      },
      {
        id: 4,
        label: " 康复病床",
      },
      {
        id: 5,
        label: "隔离病床",
      },
      {
        id: 6,
        label: "ICU 病床",
      },
    ]);

    return { selectOptions };
  },
};
</script>

<style lang="less" scoped>
.card {
  text-align: center;

  .demo {
    width: 72px;
    height: 24px;
    background: linear-gradient(180deg, #f24343 0%, #e02020 100%);
    border-radius: 2px;
    text-align: center;
  }
}
</style>
