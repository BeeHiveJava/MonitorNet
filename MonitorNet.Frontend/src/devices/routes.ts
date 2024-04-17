import type { RouteRecordRaw } from "vue-router"
import MdiDevices from "~icons/mdi/monitor-multiple"

export default [
  {
    path: "/devices",
    name: "devices",
    component: () => import("./views/TheDevices.vue"),
    meta: {
      icon: MdiDevices
    }
  }
] as RouteRecordRaw[]
