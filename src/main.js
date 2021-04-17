import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import "./assets/less/index.less";

createApp(App).use(Antd).use(router).use(store).mount("#app");
