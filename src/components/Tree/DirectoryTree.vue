<template>
  <a-directory-tree
    class="tree-directory lau-tree-directory"
    :show-icon="false"
    :replace-fields="replaceFields"
    multiple
    :tree-data="trees"
  >
    <template #title="{ key: treeKey, label, fenceFeature, fenceScope }">
      <section class="wrapper">
        <div class="left">
          <!-- 图标 -->
          <lau-icon
            v-if="hasIcon"
            class="avatar"
            type="erds_mod_icon_user"
          ></lau-icon>
          <div class="userinfo">
            <span class="name">{{ label }}</span>
            <span class="description">
              <template v-if="fenceScope">
                <a-tag
                  :style="{
                    width: '34px',
                    height: '18px',
                    'font-size': '10px',
                    'line-height': '14px',
                    'border-radius': '9px',
                  }"
                  :color="fenceFeature ? 'warning' : 'error'"
                >
                  {{ fenceFeature ? "禁入" : "禁出" }}
                </a-tag>
              </template>
              <template v-else>暂无数据</template>
            </span>
          </div>
        </div>
        <div class="right">
          <slot name="extra"></slot>
        </div>
      </section>
    </template>
  </a-directory-tree>
</template>

<script>
import { readonly } from "@vue/reactivity";

import LauIcon from "../../utils/icon";

export default {
  name: "LauDirectoryTree",
  components: { LauIcon },
  props: {
    trees: {
      type: Array,
      require: true,
      default: new Array(),
    },
    hasIcon: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  setup(props) {
    // 定义替换树节点自定义字段
    const replaceFields = readonly({
      children: "children",
      title: "label",
      key: "key",
    });

    return { replaceFields };
  },
};
</script>

<style lang="less" scoped>
.tree-directory {
  max-height: 65vh;
  overflow-y: scroll;
}

.wrapper {
  width: 338px;
  display: flex;
  border-bottom: 1px solid fade(#333c4f, 40);
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    flex-flow: row nowrap;

    .avatar {
      margin-right: 8px;
      line-height: 24px;
    }

    .userinfo {
      span {
        line-height: 22px;
        color: #ffffff;
        display: block;
      }

      .name {
        font-size: 18px;
        font-weight: 400;
      }

      .description {
        font-size: 12px;
      }
    }
  }

  .right {
    .icon {
      color: #3399ff;
      font-size: 24px;
    }
  }
}
</style>
