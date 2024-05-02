import type { NavigationGuardWithThis } from "vue-router"
import { useAuthStore } from "./auth.store"

export const AuthGuard: NavigationGuardWithThis<undefined> = to => {
  const store = useAuthStore()
  return toValue(to.meta.anonymous) === true || toValue(store.authenticated) === true
}
