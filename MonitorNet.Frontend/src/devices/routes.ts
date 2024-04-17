import type { RouteRecordRaw } from "vue-router"

export default [
  {
    path: "/devices",
    name: "devices",
    component: () => import("./views/TheDevices.vue")
  }
] as RouteRecordRaw[]
