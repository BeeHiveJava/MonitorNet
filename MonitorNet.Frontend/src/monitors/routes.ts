import type { RouteRecordRaw } from "vue-router"
import MdiMonitors from "~icons/mdi/monitors"

export default [
  {
    path: "/monitors",
    name: "monitors",
    component: () => import("./views/TheMonitors.vue"),
    meta: {
      icon: MdiMonitors
    }
  }
] as RouteRecordRaw[]
