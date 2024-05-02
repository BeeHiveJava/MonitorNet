import type { NavigationGuardWithThis } from "vue-router"
import { useAuthStore } from "./auth.store"

export const AuthGuard: NavigationGuardWithThis<undefined> = to => {
  if (toValue(to.meta.anonymous) === true) {
    return true
  }

  const store = useAuthStore()

  if (typeof to.query.token === "string") {
    store.login(to.query.token)
  }

  return toValue(store.authenticated) === true
}
