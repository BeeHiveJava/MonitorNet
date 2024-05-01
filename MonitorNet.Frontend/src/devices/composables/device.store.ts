import { toDeviceId, type Device, type DeviceId } from "@/devices"
import { useMonitorNetApi } from "@/utils"
import type { UseFetchOptions } from "@vueuse/core"

export const useDeviceStore = defineStore("devices", () => {
  const devices = useLocalStorage<Device[]>("devices", [])
  const external = useDeviceGetAll({ immediate: true })

  const refresh = async () => {
    await external.execute(true)
  }

  watchEffect(() => {
    if (external.data.value) {
      devices.value = external.data.value
    }
  })

  return { devices, refresh }
})

export const useDevice = (device: DeviceId) => {
  const store = useDeviceStore()

  return computed(() => {
    const id = toDeviceId(device)

    if (id === undefined) {
      return undefined
    }

    return store.devices.find(device => device.id === id)
  })
}

const useDeviceGetAll = (options?: UseFetchOptions) => {
  const api = useMonitorNetApi("api/devices", options ?? { immediate: false })
  const { data, error, execute } = api.get().json<Device[]>()
  return { data, error, execute }
}
