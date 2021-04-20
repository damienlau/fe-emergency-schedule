<template>
  <a-layout class="launchpad">
    <lau-header has-background></lau-header>
    <launchpad-map>
      <template #sider>
        <a-layout-sider
          width="360"
          :collapsed="isSiderCollapsed"
          collapsed-width="0"
          collapsible
          @collapse="() => (isSiderCollapsed = !isSiderCollapsed)"
        >
          <lau-menu
            class="launchpad-menu background"
            :menus="launchpadComponents"
          ></lau-menu>
          <section class="launchpad-wrapper">
            <keep-alive>
              <component :is="launchpadActiveComponent"></component>
            </keep-alive>
          </section>
        </a-layout-sider>
      </template>
    </launchpad-map>
  </a-layout>
</template>

<script>
import { provide, ref } from "@vue/runtime-core";

import LauHeader from "../../components/Header.vue";
import LauMenu from "../../components/Menu/Menu.vue";
import LaunchpadMap from "../Map/index.vue";
import MapContacts from "../Map/contacts.vue";
import MapGeofence from "../Map/geofence.vue";

export default {
  name: "Launchpad",
  components: { LauHeader, LauMenu, LaunchpadMap, MapContacts, MapGeofence },
  setup() {
    const isSiderCollapsed = ref(false);
    // 定义启动台组件菜单
    const launchpadComponents = ref([
      { key: "MapContacts", label: "通讯名单" },
      { key: "MapGeofence", label: "电子围栏" },
    ]);
    // 定义启动台当前子组件
    const launchpadActiveComponent = ref(launchpadComponents.value[0].key);

    const handleSelect = (menuSelectedKey) => {
      launchpadActiveComponent.value = menuSelectedKey.value.toString();
    };

    provide("getMenuData", handleSelect);

    return { isSiderCollapsed, launchpadComponents, launchpadActiveComponent };
  },
};
</script>

<style lang="less" scoped>
.launchpad {
  &-menu {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &-wrapper {
    height: 85%;
    display: flex;
    min-height: 746px;
    flex-flow: column nowrap;
    border-radius: 6px;
    border: 1px solid fade(#3399ff, 30);
    background-color: fade(#07182e, 90);
    box-shadow: 0 10px 10px 0 fade(#083068, 10);
  }
}
</style>
