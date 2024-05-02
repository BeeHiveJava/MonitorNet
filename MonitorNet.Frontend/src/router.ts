import { createRouter, createWebHistory } from "vue-router"
import { AuthGuard } from "./utils"

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

router.beforeEach(AuthGuard)

export default router
