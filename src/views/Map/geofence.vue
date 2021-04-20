<template>
  <div class="tabs-extra">
    <a-button block type="primary" @click="handleDraw">
      <template #icon>
        <lau-icon type="erds_mod_icon_plus"></lau-icon>
      </template>
      建围栏</a-button
    >
  </div>
  <lau-directory-tree
    :has-icon="false"
    :trees="treeConfig"
    @select="handleTreeSelected"
  >
    <template #extra>
      <!-- <a-button class="extra" type="link" ghost @click="handleCall(1, 1210)">
        <lau-icon type="erds_icon_user_call"></lau-icon>
      </a-button> -->
      <a-button class="extra" type="link" ghost @click="handleCall(3, 1210)">
        删除
      </a-button>
    </template>
  </lau-directory-tree>

  <lau-modal v-model:visible="isModalVisible" title="新建围栏">
    <lau-form :forms="modalFormConfig">
      <template #button>
        <a-button type="primary" @click="handleCreate">保存</a-button>
      </template>
    </lau-form>
  </lau-modal>
</template>

<script>
import { onMounted, provide, ref } from "@vue/runtime-core";

import Map from "../../utils/map";

import { createGeoFence, getGeoFences } from "../../api/geofence";

import LauIcon from "../../utils/icon";
import LauModal from "../../components/Modal/Modal.vue";
import LauForm from "../../components/Form/Form.vue";
import LauDirectoryTree from "../../components/Tree/DirectoryTree.vue";

import { message } from "ant-design-vue";

export default {
  name: "MapGeofence",
  components: { LauModal, LauIcon, LauForm, LauDirectoryTree },
  setup() {
    // 定义当前围栏数据
    const treeConfig = ref();
    // 定义模态框表单初始值
    const modalFormState = ref();
    // 定义当前模态框激活状态
    const isModalVisible = ref(false);
    // 定义模态框表单配置数据
    const modalFormConfig = ref([
      {
        key: "fenceName",
        label: "围栏名称",
      },
      {
        key: "fenceFeature",
        label: "围栏动作",
        type: "select",
        selectOptions: [
          { id: 0, label: "禁止出" },
          { id: 1, label: "禁止入" },
        ],
      },
    ]);

    // 定义启动鼠标工具事件
    const handleDraw = () => {
      // 构造地图实例
      Map.then(({ map, AMap }) => {
        message.success("已开启电子围栏绘制功能");
        AMap.plugin(["AMap.MouseTool"], function () {
          //在地图中添加MouseTool插件
          var mouseTool = new AMap.MouseTool(map);
          //用鼠标工具画多边形
          var drawPolygon = mouseTool.polygon();

          // 结束鼠标绘制
          mouseTool.on("draw", function (e) {
            isModalVisible.value = true;
            treeConfig.value = e.obj.getPath().map((param) => {
              return [param.lng, param.lat];
            });

            console.log(treeConfig.value);
          });
        });
      });
    };

    // 定义新建电子围栏事件
    const handleCreate = () => {
      let obj = modalFormState.value;
      obj.fenceScopeArray = treeConfig.value;

      createGeoFence(obj).then((result) => {
        handleGetData();
      });
    };

    // 定义获取全部电子围栏事件
    const handleGetData = (filter) => {
      getGeoFences(filter).then((result) => {
        treeConfig.value = result.map((param) => {
          return {
            ...param,
            label: param.fenceName,
          };
        });
        isModalVisible.value = false;
      });
    };

    // 定义点击树节点事件
    const handleTreeSelected = (selectedKeys, { node }) => {
      // 构造地图实例
      Map.then(({ map, AMap }) => {
        console.log(node.dataRef);
        if (node.dataRef.fenceScope) {
          map.clearMap();
          // 创建标记点实例
          let polygon = new AMap.Polygon({
            path: eval("(" + node.dataRef.fenceScope + ")"),
            strokeColor: "#FF33FF",
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: "#1791fc",
            zIndex: 50,
            bubble: true,
          });
          polygon.setMap(map);
          map.setFitView();
        }
      });
    };

    // 定义获取模态框表单事件
    const handleUpdate = (formData) => (modalFormState.value = formData);
    provide("getFormData", handleUpdate);

    onMounted(() => {
      handleGetData();
    });

    return {
      treeConfig,
      isModalVisible,
      modalFormConfig,
      handleDraw,
      handleCreate,
      handleTreeSelected,
    };
  },
};
</script>

<style lang="less" scoped>
.toolbar {
  padding: 20px;
}

.wrapper {
  flex: 1 1 auto;
}
</style>

<style lang="less" scoped>
.tabs-extra {
  padding: 20px;
  border-bottom: 1px solid fade(#627499, 50);

  > button {
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    background-color: #18263b;
    border-color: #1f3049;
  }
}
.extra {
  color: #ed4264;
}
</style>
