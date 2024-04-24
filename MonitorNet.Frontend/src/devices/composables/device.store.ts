import { createFetch } from "@vueuse/core"
import type { Device } from "../models/device"

const useDeviceFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URI,
  fetchOptions: {
    headers: { "Ocp-Apim-Subscription-Key": import.meta.env.VITE_API_SUBSCRIPTION_KEY }
  }
})

export const useDeviceStore = defineStore("devices", () => {
  const devices = useLocalStorage<Device[]>("devices", [])
  const { data, execute } = useDeviceFetch("api/devices").get().json<Device[]>()

  const get = (id: string) => devices.value.find(device => device.id === id)
  const refresh = async () => { await execute() }
  watchEffect(() => devices.value = data.value ? data.value : devices.value)

  return { devices, get, refresh }
})

export const useDevice = (id?: string) => {
  const store = useDeviceStore()
  return computed(() => id !== undefined ? store.get(id) : undefined)
}
