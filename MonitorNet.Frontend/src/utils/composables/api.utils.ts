import { createFetch } from "@vueuse/core"
import { useAuthStore } from "./auth.store"

export const useMonitorNetApi = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URI,
  options: {
    beforeFetch: (ctx) => {
      const store = useAuthStore()
      const authentication: HeadersInit = store.authenticated ? {"Ocp-Apim-Subscription-Key": store.token!} : {}

      ctx.options.headers = {...ctx.options.headers, ...authentication}
      return ctx
    }
  }
})
