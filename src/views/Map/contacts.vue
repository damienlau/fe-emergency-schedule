<template>
  <lau-tab :tabs="tabConfig" @change="handleTabChange">
    <template #content>
      <div class="tabs-extra">
        <a-button
          block
          type="primary"
          @click="isModalVisible = !isModalVisible"
        >
          <template #icon>
            <lau-icon type="erds_mod_icon_plus"></lau-icon>
          </template>
          创建</a-button
        >
      </div>
      <lau-directory-tree :trees="treeConfig" @select="handleTreeSelected">
        <template #extra>
          <a-button class="extra" type="link" ghost @click="handleCall(1)">
            <lau-icon type="erds_icon_user_call"></lau-icon>
          </a-button>
          <a-button class="extra" type="link" ghost @click="handleCall(3)">
            <lau-icon type="erds_icon_user_video"></lau-icon>
          </a-button>
        </template>
      </lau-directory-tree>
    </template>
  </lau-tab>

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

import {
  getContactTeams,
  getContactMembers,
  createContactMember,
  createContactTeam,
} from "../../api/contact";

import Map from "../../utils/map";
import FaceTime from "../../utils/facetime";

import LauIcon from "../../utils/icon";
import LauTab from "../../components/Tabs/Tab.vue";
import LauForm from "../../components/Form/Form.vue";
import LauModal from "../../components/Modal/Modal.vue";
import LauDirectoryTree from "../../components/Tree/DirectoryTree.vue";

export default {
  name: "MapContacts",
  components: { LauIcon, LauTab, LauForm, LauModal, LauDirectoryTree },
  setup() {
    // 定义当前模态框激活状态
    const isModalVisible = ref(false);
    // 定义标签页配置数据
    const tabConfig = ref([
      {
        key: "member",
        label: "救援人员",
      },
      {
        key: "group",
        label: "救援小组",
      },
    ]);
    // 定义当前激活标签页面板的 KEY
    const tabActiveKey = ref(tabConfig.value[0].key);
    // 定义模态框表单配置数据
    const modalFormConfig = ref([
      {
        key: "personName",
        label: "姓名",
      },
      {
        key: "personPhone",
        label: "手机号",
      },
    ]);

    // 定义三方呼叫默认手机号码
    const callState = ref();
    // 定义树初始数据
    const treeConfig = ref();
    // 定义模态框表单初始值
    const modalFormState = ref();

    // 定义标签页切换事件
    const handleTabChange = (activeKey) => {
      tabActiveKey.value = activeKey;
      handleGetData(tabActiveKey.value);
    };

    // 定义点击树节点事件
    const handleTreeSelected = (selectedKeys, { node }) => {
      callState.value = node.dataRef.personPhone;

      // 构造地图实例
      Map.then(({ map, AMap }) => {
        if (node.dataRef.lastLongitude) {
          map.clearMap();

          // 创建标记点实例
          let marker = new AMap.Marker({
            icon: "src/assets/image/lau_icon_map_marker.png",
            position: [node.dataRef.lastLongitude, node.dataRef.lastLatitude],
            anchor: "top-center",
            offset: new AMap.Pixel(0, -39),
          });

          marker.setMap(map);
          map.setFitView();
        }
      });
    };

    const handleGetData = (filter) => {
      switch (filter) {
        // 查询接口获取所有人员
        case "member":
          getContactMembers().then((result) => {
            treeConfig.value = result.map((param) => {
              return {
                ...param,
                key: param.id,
                label: param.personName,
              };
            });
          });
          break;
        // 查询接口获取所有小组
        case "group":
          getContactTeams().then((result) => {
            treeConfig.value = result.map((param) => {
              return {
                ...param,
                key: param.id,
                label: param.groupName,
              };
            });
          });
          break;
      }
    };

    // 定义新建电子围栏事件
    const handleCreate = () => {
      switch (tabActiveKey.value) {
        // 查询接口获取所有人员
        case "member":
          createContactMember(modalFormState.value).then((result) => {
            console.log(result);
            isModalVisible.value = false;
          });
          break;
        // 查询接口获取所有小组
        case "group":
          createContactTeam(modalFormState.value).then((result) => {
            console.log(result);
            isModalVisible.value = false;
          });
          break;
      }
    };

    // 定义唤醒第三方通讯软件
    const handleCall = (action) => {
      FaceTime(action, callState.value);
    };

    onMounted(() => {
      handleGetData(tabActiveKey.value);
    });

    // 定义获取模态框表单事件
    const handleUpdate = (formData) => (modalFormState.value = formData);
    provide("getFormData", handleUpdate);

    return {
      tabConfig,
      treeConfig,
      isModalVisible,
      modalFormConfig,
      handleCreate,
      handleTabChange,
      handleTreeSelected,
      handleCall,
    };
  },
};
</script>

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
  color: #3399ff;
  font-size: 24px;
}
</style>
