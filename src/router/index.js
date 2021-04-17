import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

const routes = [
  // {
  //   path: "/",
  //   components: {
  //     FaceTime: () => import("../views/FaceTime.vue"),
  //     Launchpad: () => import("../views/Launchpad.vue"),
  //     Toolkit: () => import("../views/Toolkit.vue"),
  //   },
  // },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        components: {
          facetime: () => import("../views/Launchpad/FaceTime.vue"),
          launchpad: () => import("../views/Launchpad/index.vue"),
          toolkit: () => import("../views/Launchpad/Toolkit.vue"),
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.isLogin) next({ name: "Login" });
  else next();
});

export default router;
