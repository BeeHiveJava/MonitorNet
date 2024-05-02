import type { RouteRecordRaw } from "vue-router"
import MdiChart from "~icons/mdi/chart-line"

export default [
  {
    path: "/charts/:device/:monitor(\\d+)",
    name: "charts",
    component: () => import("./views/TheChart.vue"),
    meta: {
      icon: MdiChart,
      navbar: false
    }
  }
] as RouteRecordRaw[]
