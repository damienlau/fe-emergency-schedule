<template>
  <lau-tab-card
    class="sickbed"
    type="editable-card"
    :tabs="tabConfig"
    @edit="isAreaModalVisible = !isAreaModalVisible"
    @change="handleTabPaneChange"
  >
    <template #content>
      <lau-card-grid class="sickbed-card" :cards="cardData">
        <template #extra>
          <lau-card @click="isBedModalVisible = !isBedModalVisible"></lau-card>
        </template>
      </lau-card-grid>
    </template>
  </lau-tab-card>

  <lau-modal v-model:visible="isAreaModalVisible" title="新增病床区域">
    <lau-form :forms="modalFormAreaConfig">
      <template #button>
        <a-button type="primary" @click="handleAreaCreate">保存</a-button>
      </template>
    </lau-form>
  </lau-modal>
  <lau-modal v-model:visible="isBedModalVisible" title="新增病床">
    <lau-form :forms="modalFormBedConfig">
      <template #button>
        <a-button type="primary" @click="handleBedCreate">保存</a-button>
      </template>
    </lau-form>
  </lau-modal>
</template>

<script>
import { onMounted, provide, ref } from "@vue/runtime-core";

import {
  getSickBeds,
  createSickBed,
  getSickBedAreas,
  createSickBedArea,
} from "../../api/sickbed";

import LauCard from "../../components/Card/Card.vue";
import LauCardGrid from "../../components/Card/CardGrid.vue";
import LauForm from "../../components/Form/Form.vue";
import LauTabCard from "../../components/Tabs/TabCard.vue";
import LauModal from "../../components/Modal/Modal.vue";

export default {
  components: {
    LauCard,
    LauForm,
    LauTabCard,
    LauCardGrid,
    LauModal,
  },
  setup() {
    // 定义标签页配置数据
    const tabConfig = ref([
      {
        key: "",
        label: "请点击右侧按钮添加病床区域",
      },
    ]);
    // 定义当前激活标签页面板的 KEY
    const tabActiveKey = ref(tabConfig.value[0].key);

    // 定义当前病床信息
    const cardData = ref();

    // 定义模态框表单初始值
    const modalFormState = ref();
    // 定义病床区域模态框表单配置数据
    const modalFormAreaConfig = ref([
      {
        key: "bedAreaName",
        label: "区域名称",
      },
    ]);
    // 定义病床信息模态框表单配置数据
    const modalFormBedConfig = ref([
      {
        key: "bedType",
        label: "病床类型",
        type: "select",
        selectOptions: [
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
        ],
      },
    ]);

    // 定义病床区域当前模态框激活状态
    const isAreaModalVisible = ref(false);
    // 定义病床信息当前模态框激活状态
    const isBedModalVisible = ref(false);

    // 定义获取模态框表单事件
    const handleUpdate = (formData) => (modalFormState.value = formData);

    // 定义新建病床区域事件
    const handleAreaCreate = () => {
      createSickBedArea(modalFormState.value).then((result) => {
        handleGetAllArea();
      });
    };

    // 定义新建病床事件
    const handleBedCreate = () => {
      let param = modalFormState.value;
      Object.assign(param, tabActiveKey.value);

      createSickBed(param).then((result) => {
        handleGetAllBed(tabActiveKey.value);
      });
    };

    // 定义获取全部病床区域事件
    const handleGetAllArea = () => {
      getSickBedAreas().then((result) => {
        tabConfig.value = result.map((param) => {
          return {
            param,
            key: param.id,
            label: param.bedAreaName,
          };
        });

        isAreaModalVisible.value = false;
      });
    };

    // 定义获取全部病床事件
    const handleGetAllBed = (filter) => {
      getSickBeds(filter).then((result) => {
        cardData.value = result.map((param) => {
          return {
            ...param,
            // key: param.id,
            // label: param.bedAreaName,
          };
        });

        isBedModalVisible.value = false;
      });
    };

    // 定义获取区域病床信息
    const handleTabPaneChange = (activeKey = tabActiveKey.value) => {
      tabActiveKey.value = { bedAreaId: activeKey };

      handleGetAllBed(tabActiveKey.value);
    };

    // 获取全部病床区域
    handleGetAllArea();

    provide("getFormData", handleUpdate);

    return {
      cardData,
      tabConfig,
      modalFormAreaConfig,
      modalFormBedConfig,
      isAreaModalVisible,
      isBedModalVisible,
      handleAreaCreate,
      handleBedCreate,
      handleTabPaneChange,
    };
  },
};
</script>

<style lang="less" scoped>
.sickbed {
  margin-top: 8px;

  &-card {
    margin-top: 28px;
    max-height: 80vh;
    overflow-y: scroll;
  }
}
</style>
