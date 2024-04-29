import { createFetch } from "@vueuse/core"

export const useMonitorNetApi = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URI,
  fetchOptions: {
    headers: { "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_SUBSCRIPTION_KEY }
  }
})
