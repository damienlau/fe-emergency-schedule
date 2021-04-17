import { createStore } from "vuex";
import Cookies from "js-cookie";
import router from "../router";

import { Login } from "../api/user";

export default createStore({
  state: {
    token: "",
    isLogin: Cookies.get("authorization") ? true : false,
  },
  mutations: {
    hasLogin(state, user) {
      Login(user).then((info) => {
        Cookies.set("user", JSON.stringify(info));
        router.push({ name: "Home", params: { username: info.userName } });
      });
    },
  },
  actions: {},
  modules: {},
});
