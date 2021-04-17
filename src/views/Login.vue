<template>
  <lau-header></lau-header>
  <a-layout-content class="login">
    <lau-form :forms="formConfig" :rules="formRulesConfig">
      <template #button>
        <a-button
          block
          type="primary"
          @click="() => $store.commit('hasLogin', formState)"
          >登录</a-button
        >
      </template>
    </lau-form>
  </a-layout-content>
</template>

<script>
import { provide, reactive, readonly } from "@vue/runtime-core";

import LauHeader from "../components/Header.vue";
import LauForm from "../components/Form/Form.vue";

export default {
  name: "Home",
  components: { LauHeader, LauForm },
  setup() {
    // 定义登录表单数据
    const formState = reactive({});

    // 定义登录表单配置
    const formConfig = readonly([
      {
        key: "loginAccount",
        label: "账号",
      },
      {
        key: "loginPassword",
        label: "密码",
        type: "password",
      },
    ]);

    // 定义登录表单校验配置
    const formRulesConfig = readonly({
      loginAccount: [
        {
          required: true,
          message: "必须填写账号",
          trigger: "blur",
        },
      ],
      loginPassword: [
        {
          required: true,
          message: "必须填写密码",
          trigger: "blur",
        },
      ],
    });

    // 定义获取表单数据事件
    const getFormData = (formData) => {
      Object.assign(formState, formData);
    };

    provide("getFormData", getFormData);

    return { formState, formConfig, formRulesConfig };
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
