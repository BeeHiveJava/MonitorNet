import type { Device } from "@/devices"
import { useMonitorNetApi } from "@/utils"
import type { MaybeRef } from "vue"

export const useDeviceStore = defineStore("devices", () => {
  const devices = useLocalStorage<Device[]>("devices", [])
  const { data, execute } = useMonitorNetApi("api/devices").get().json<Device[]>()

  const get = (id: string) => devices.value.find(device => device.id === id)
  const refresh = async () => { await execute() }
  watchEffect(() => devices.value = data.value ? data.value : devices.value)

  return { devices, get, refresh }
})

export const useDevice = (idRef: MaybeRef<string | undefined>) => {
  const store = useDeviceStore()

  return computed(() => {
    const id = toValue(idRef)
    return id !== undefined ? store.get(id) : undefined
  })
}
