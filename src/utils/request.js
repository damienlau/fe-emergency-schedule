import axios from "axios";
import store from "../store";
import Cookies from "js-cookie";
import { message } from "ant-design-vue";

// 创建实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 233333,
});

// 配置全局提示
message.config({
  maxCount: 1,
  duration: 4,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (store.state.isLogin) {
      config.headers.authorization = Cookies.get("authorization");
    }

    message.loading({
      content: "数据加载中",
      key: "listener",
      duration: 0,
    });

    return config;
  },
  (error) => {
    console.error(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    const hasAuth = response.headers.authorization;

    if (response.status !== 200 || res.code !== 0) {
      message.error({
        content: res.message || "响应拦截：网络异常，请检查网络后重试",
        key: "listener",
      });

      if (res.code === 402) {
        store.state.isLogin = false;
        Cookies.remove("authorization");
      }
    } else {
      if (!!hasAuth) {
        store.state.isLogin = true;
        Cookies.set("authorization", hasAuth);
      }

      message.success({
        content: res.message,
        key: "listener",
      });

      return res.data;
    }
  },
  (error) => {
    console.log(error);
    message.error({
      content: "响应错误：网络异常，请检查网络后重试",
      key: "listener",
    });
  }
);

export default instance;
