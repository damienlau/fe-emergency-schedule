<template>
  <lau-filter-form class="filter" :forms="formConfig"></lau-filter-form>
  <lau-table
    :data="tableData"
    :tables="tableConfig"
    :scroll="{ y: 690 }"
  ></lau-table>
</template>

<script>
import { ref } from "@vue/reactivity";

import { getGeoFences, getGeoFenceInfos } from "../../api/geofence";

import LauTable from "../../components/Table.vue";
import LauFilterForm from "../../components/Form/FilterForm.vue";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "ToolkitGeoFenceInfo",
  components: { LauTable, LauFilterForm },
  setup() {
    // 定义筛选表单配置数据
    const formConfig = ref([
      {
        key: "groupName",
        label: "电子围栏",
        type: "select",
        selectOptions: [],
      },
      {
        key: "filterDate",
        label: "时间筛选",
        type: "rangePicker",
      },
      {
        key: "warnType",
        label: "日志类型",
        type: "select",
        selectOptions: [
          {
            id: 1,
            label: "未到场",
          },
          {
            id: 2,
            label: "擅离",
          },
          {
            id: 3,
            label: "闯入",
          },
        ],
      },
    ]);

    // 定义表格默认数据
    const tableData = ref();
    const tableConfig = ref([
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
        dataIndex: "createTime",
        key: "createTime",
        width: 340,
      },
      {
        title: "操作",
        dataIndex: "personName",
        key: "personName",
      },
    ]);

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
      // 获取全部围栏动态
      handleGetData();

      // 查询接口获取所有电子围栏
      getGeoFences().then((data) => {
        console.log(data);
        // formConfig.value.map((element) => {
        //   if (element.key === "groupId") {
        //     element.selectOptions = data;
        //   }
        // });
      });
      // getContactTeams().then((data) => {
      //   formConfig.value.map((element) => {
      //     if (element.key === "groupId") {
      //       element.selectOptions = data;
      //     }
      //   });
      // });
    });

    const handleGetData = (filter) => {
      // 查询接口获取所有电子围栏动态
      getGeoFenceInfos(filter).then((result) => {
        // tableData.value = result;
        console.log(result);
      });
    };

    return {
      formConfig,
      tableData,
      tableConfig,
    };
  },
};
</script>

<style lang="less" scoped>
.filter {
  margin: 8px 0 28px 0;
}
</style>
