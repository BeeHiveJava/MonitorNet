import type { Monitor } from "@/monitors"
import type { MaybeRef } from "vue"
import type { Device } from "@/devices"

export const useMonitorStore = defineStore("monitors", () => {
  const monitors = useLocalStorage<Monitor[]>("monitors", [])
  // const { data, execute } = useMonitorNetApi("api/devices").get().json<Device[]>()

  const all = (device: string) => monitors.value.filter(monitor => monitor?.device === device)
  const get = (device: string, index: number) => all(device).find(monitor => monitor?.index === index)

  return { monitors, all, get }
})

export const useMonitor = (deviceRef: MaybeDeviceOrId, indexRef: MaybeRef<number | undefined>) => {
  const store = useMonitorStore()

  return computed(() => {
    const device = toValue(deviceRef)
    if (device === undefined) {
      return undefined
    }

    const index = toValue(indexRef)
    if (index === undefined) {
      return undefined
    }

    const deviceId = typeof device === "string" ? device : device.id
    return store.get(deviceId, index)
  })
}

type MaybeDeviceOrId = MaybeRef<Device | string | undefined>
