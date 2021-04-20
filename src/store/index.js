import { createStore } from "vuex";
import Cookies from "js-cookie";
import router from "../router";

import { Login, Logout } from "../api/user";

export default createStore({
  state: {
    token: "",
    isLogin: Cookies.get("authorization") ? true : false,
  },
  mutations: {
    // 登录
    hasLogin(state, user) {
      Login(user).then((info) => {
        if (info) {
          Cookies.set("user", JSON.stringify(info));
          router.push({ name: "Home", params: { username: info.userName } });
        }
      });
    },
    // 注销
    hasLogout(state) {
      Logout().then((info) => {
        Cookies.remove("user");
        router.push({ name: "Login" });
      });
    },
  },
  actions: {},
  modules: {},
});
