<template>
  <a-card class="card lau-card lau-card-dashed">
    <section class="card-extra">
      <lau-icon class="card-extra-icon" type="erds_mod_icon_plus"></lau-icon>
      <span class="card-extra-name">添加病床</span>
    </section>
  </a-card>
</template>

<script>
import LauIcon from "../../utils/icon";
export default {
  name: "LauCard",
  components: { LauIcon },
};
</script>

<style lang="less" scoped>
.card {
  cursor: pointer;

  &-extra {
    display: flex;
    flex-flow: column nowrap;
    color: fade(#fff, 45);

    &-icon {
      font-size: 24px;
      margin-bottom: 14px;
    }

    &-name {
    }
  }
}
</style>
