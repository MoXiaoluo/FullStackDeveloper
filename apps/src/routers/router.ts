import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../pages/Home.vue";

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

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
