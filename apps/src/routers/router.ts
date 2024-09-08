import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../pages/Home.vue";
import { useTokenStore } from "@/stores/useTokenStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => HomePage,
  },
  {
    path: "/logon",
    name: "logon",
    component: () => import("../pages/Logon.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const { getToken } = useTokenStore();
  if (to.name === "logon" && getToken()) {
    next({ name: "home" });
  } else if (!getToken() && to.name !== "logon") {
    next({ name: "logon" });
  } else {
    next();
  }
});

export default router;
