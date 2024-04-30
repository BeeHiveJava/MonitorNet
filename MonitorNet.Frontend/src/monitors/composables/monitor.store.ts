import type { MaybeDeviceRefOrGetter } from "@/devices"
import type { Monitor } from "@/monitors"
import type { MaybeRef } from "vue"

export const useMonitorStore = defineStore("monitors", () => {
  const monitors = useLocalStorage<Monitor[]>("monitors", [])
  // const { data, execute } = useMonitorNetApi("api/devices").get().json<Device[]>()

  const get = (device: MaybeDeviceRefOrGetter) => {
    return monitors.value.filter(monitor => monitor?.device === toValue(device)?.id)
  }

  const save = (monitor: Monitor) => {
    const index = monitors.value.findIndex(item => item.device === monitor.device && item.index === monitor.index)

    if (index >= 0) {
      monitors.value.splice(index, 1, monitor)
    } else {
      monitors.value.push(monitor)
    }
  }

  return { monitors, get, save }
})

export const useMonitor = (device: MaybeDeviceRefOrGetter, indexRef: MaybeRef<number | undefined>) => {
  const monitors = useMonitors(device)

  return computed(() => {
    const index = toValue(indexRef)

    if (index === undefined) {
      return undefined
    }

    return monitors.value?.find(monitor => monitor.index === index)
  })
}

export const useMonitors = (deviceRef: MaybeDeviceRefOrGetter) => {
  const store = useMonitorStore()

  return computed(() => {
    const device = toValue(deviceRef)

    if (device === undefined) {
      return undefined
    }

    return store.get(device)
  })
}
