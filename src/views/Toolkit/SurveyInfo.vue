<template>
  <lau-tab :tabs="tabConfig" @change="handleTabChange">
    <template #content>
      <lau-filter-form class="filter" :forms="formConfig"></lau-filter-form>
      <lau-table
        :data="tableData"
        :tables="tableConfig"
        :scroll="{ y: 690 }"
      ></lau-table>
    </template>
  </lau-tab>
</template>

<script>
import { onMounted, provide, ref } from "@vue/runtime-core";

import moment from "moment";

import { getContactTeams } from "../../api/contact";
import { getSurveyInfos, searchSurveyInfo } from "../../api/survey";

import LauTab from "../../components/Tabs/Tab.vue";
import LauTable from "../../components/Table.vue";
import LauFilterForm from "../../components/Form/FilterForm.vue";

export default {
  name: "Toolkit",
  components: { LauTab, LauTable, LauFilterForm },
  setup() {
    // 定义标签页配置数据
    const tabConfig = ref([
      {
        key: "photos",
        surveyType: 1,
        label: "拍照",
        tableConfig: [
          {
            title: "姓名",
            dataIndex: "personName",
            key: "personName",
            width: 150,
          },
          {
            title: "照片",
            dataIndex: "fileUrl",
            key: "fileUrl",
            width: 312,
            slots: {
              customRender: "image",
            },
          },
          {
            title: "所在小组",
            dataIndex: "groupName",
            key: "groupName",
            width: 188,
          },
          {
            title: "联系方式",
            dataIndex: "personPhone",
            key: "personPhone",
            width: 200,
          },
          {
            title: "所在事件",
            dataIndex: "eventName",
            key: "eventName",
            width: 290,
          },
          {
            title: "日期",
            dataIndex: "talkStartTime",
            key: "talkStartTime",
            width: 340,
          },
          {
            title: "操作",
            dataIndex: "personName",
            key: "personName",
          },
        ],
      },
      {
        key: "videos",
        surveyType: 2,
        label: "录像",
        tableConfig: [
          {
            title: "姓名",
            dataIndex: "personName",
            key: "personName",
          },
          {
            title: "录像",
            dataIndex: "fileUrl",
            key: "fileUrl",
            slots: {
              customRender: "video",
            },
          },
          {
            title: "所在小组",
            dataIndex: "groupName",
            key: "groupName",
          },
          {
            title: "联系方式",
            dataIndex: "personPhone",
            key: "personPhone",
          },
          {
            title: "日期",
            dataIndex: "talkStartTime",
            key: "talkStartTime",
          },
          {
            title: "操作",
            dataIndex: "personName",
            key: "personName",
          },
        ],
      },
      {
        key: "calls",
        surveyType: 3,
        label: "通话",
        tableConfig: [
          {
            title: "群组名称",
            dataIndex: "groupName",
            key: "groupName",
            slots: {
              customRender: "audio",
            },
          },
          // {
          //   title: "终端",
          //   dataIndex: "terminal",
          //   key: "terminal",
          // },
          {
            title: "通话时长",
            dataIndex: "talkTime",
            key: "talkTime",
          },
          {
            title: "通话时间",
            dataIndex: "talkStartTime",
            key: "talkStartTime",
          },
        ],
      },
    ]);
    // 定义筛选表单配置数据
    const formConfig = ref([
      {
        key: "groupName",
        label: "群组名称",
      },
      {
        key: "filterDate",
        label: "时间筛选",
        type: "rangePicker",
      },
      {
        key: "groupId",
        label: "所在小组",
        type: "select",
        selectOptions: [],
      },
    ]);
    // 定义表格默认数据
    const tableData = ref();
    const tableConfig = ref(tabConfig.value[0].tableConfig);

    // 定义标签页切换事件
    const handleTabChange = (activeKey) => {
      tabConfig.value.map((element) => {
        if (element.key === activeKey) {
          handleGetData();
          tableConfig.value = element.tableConfig;
        }
      });
    };

    // 定义筛选表单输入事件
    const handleSearch = (formData) => {
      formData.startDate = moment(formData.filterDate[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      formData.endDate = moment(formData.filterDate[1]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      formData.filterDate = "";

      handleGetData(formData);
    };

    onMounted(() => {
      // 获取全部勘查信息记录
      handleGetData();

      // 查询接口获取所有小组
      getContactTeams().then((data) => {
        formConfig.value.map((element) => {
          if (element.key === "groupId") {
            element.selectOptions = data;
          }
        });
      });
    });

    const handleGetData = (filter) => {
      // 查询接口获取所有勘查信息记录
      getSurveyInfos(filter).then((result) => {
        tableData.value = result;
      });
    };

    provide("getFormData", handleSearch);

    return {
      tabConfig,
      formConfig,
      tableData,
      tableConfig,
      handleTabChange,
    };
  },
};
</script>

<style lang="less" scoped>
.filter {
  margin: 28px 0;
}
</style>
