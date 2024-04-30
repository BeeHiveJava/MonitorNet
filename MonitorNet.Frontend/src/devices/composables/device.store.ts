import type { Device } from "@/devices"
import { useMonitorNetApi } from "@/utils"
import type { UseFetchOptions } from "@vueuse/core"
import type { MaybeRef } from "vue"

export const useDeviceStore = defineStore("devices", () => {
  const devices = useLocalStorage<Device[]>("devices", [])
  const external = useDeviceGetAll(true)

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

export const useDevice = (idRef: MaybeRef<string | undefined>) => {
  const store = useDeviceStore()

  return computed(() => {
    const id = toValue(idRef)

    if (id === undefined) {
      return undefined
    }

    return store.devices.find(device => device.id === id)
  })
}

const useDeviceGetAll = (immediate: boolean = false) => {
  const options: UseFetchOptions = { immediate }
  const api = useMonitorNetApi("api/devices", options)
  const { data, error, execute } = api.get().json<Device[]>()
  return { data, error, execute }
}
