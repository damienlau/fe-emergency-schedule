<template>
  <a-form
    ref="formRef"
    layout="inline"
    class="lau-form"
    :model="formState"
    hide-required-mark
  >
    <a-form-item
      v-for="form in forms"
      :key="form.key"
      has-feedback
      :name="form.key"
    >
      <!-- 名称 -->
      <template #label>
        {{ form.label }}
      </template>
      <!-- 选择框 -->
      <a-select
        v-if="form.type === 'select'"
        v-model:value="formState[form.key]"
        size="large"
        allow-clear
        :placeholder="`请选择${form.label}`"
        @change="handleChange(formState)"
      >
        <a-select-option v-for="option in form.selectOptions" :key="option.id">
          {{ option.groupName }}
        </a-select-option>
      </a-select>
      <!-- 日期选择框 -->
      <a-range-picker
        v-else-if="form.type === 'rangePicker'"
        v-model:value="formState[form.key]"
        allow-clear
        show-time
        format="YYYY/MM/DD HH:mm:ss"
        @change="handleChange(formState)"
      />
      <!-- 输入框 -->
      <a-input
        v-else
        v-model:value="formState[form.key]"
        size="large"
        :placeholder="`请输入${form.label}`"
        allow-clear
        :type="form.type"
        autocomplete="off"
        @change="handleChange(formState)"
      >
        <!-- 输入框-前缀图标 -->
        <template v-if="form.prefix" #prefix>
          <lau-icon :type="form.prefix"></lau-icon>
        </template>
        <!-- 输入框-后缀图标 -->
        <template v-if="form.suffix" #suffix>
          <lau-icon :type="form.suffix"></lau-icon>
        </template>
      </a-input>
    </a-form-item>
    <!-- 操作区 -->
    <a-form>
      <slot name="button"></slot>
    </a-form>
  </a-form>
</template>

<script>
import { inject, reactive, ref } from "@vue/runtime-core";

import LauIcon from "../../utils/icon";

export default {
  name: "LauFilterForm",
  props: {
    forms: {
      type: Array,
      require: true,
      default: new Array(),
    },
  },
  components: { LauIcon },
  setup(props) {
    const formRef = ref();
    // 定义表单数据对象
    const formState = reactive({});

    // 定义表单数据改变后回调事件
    const handleChange = inject("getFormData");
    // const handleChange = () => {};

    return {
      formRef,
      formState,
      handleChange,
    };
  },
};
</script>
