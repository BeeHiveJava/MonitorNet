import type { RouteRecordRaw } from "vue-router"
import MdiHome from "~icons/mdi/home-outline"

export default [
  {
    path: "/",
    name: "home",
    component: () => import("./views/TheHome.vue"),
    meta: {
      icon: MdiHome,
      anonymous: true
    }
  }
] as RouteRecordRaw[]
