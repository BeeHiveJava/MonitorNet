import { toDeviceId, type DeviceId } from "@/devices"
import { toMonitorId, type Monitor, type MonitorId, type MonitorRotation } from "@/monitors"
import type { CryptoSymbol } from "@/symbols"
import { useMonitorNetApi } from "@/utils"
import type { UseFetchOptions } from "@vueuse/core"

export const useMonitorStore = defineStore("monitors", () => {
  const monitors = useLocalStorage<Monitor[]>("monitors", [])
  const external = useMonitorGetAll({ immediate: true })

  const refresh = async () => {
    await external.execute(true)
  }

  const save = async (device: DeviceId, monitor: MonitorId, data: MonitorSaveData) => {
    const request: MonitorSaveOneRequest = { device, monitor, data }
    const options: UseFetchOptions = { immediate: false, timeout: 3000 }
    await useMonitorSaveOne(request, options).execute(true)
  }

  watchEffect(() => {
    if (external.data.value) {
      monitors.value = external.data.value
    }
  })

  return { monitors, refresh, save }
})

export const useMonitor = (deviceId: DeviceId, monitorId: MonitorId) => {
  const monitors = useMonitors(deviceId)

  return computed(() => {
    const index = toMonitorId(monitorId)

    if (index === undefined) {
      return undefined
    }

    return monitors.value?.find(monitor => monitor.index === index)
  })
}

export const useMonitors = (deviceId: DeviceId) => {
  const store = useMonitorStore()

  return computed(() => {
    const device = toDeviceId(deviceId)

    if (device === undefined) {
      return undefined
    }

    return store.monitors.filter(monitor => monitor?.device === device)
  })
}

const useMonitorGetAll = (options?: UseFetchOptions) => {
  const api = useMonitorNetApi("api/monitors", options ?? { immediate: false })
  const { data, error, execute } = api.get().json<Monitor[]>()
  return { data, error, execute }
}

const useMonitorSaveOne = (request: MonitorSaveOneRequest, options?: UseFetchOptions) => {
  const device = toDeviceId(request.device)
  const monitor = toMonitorId(request.monitor)

  const api = useMonitorNetApi(`api/monitors/${device}/${monitor}`, options ?? { immediate: false })
  const { data, error, execute } = api.put(request.data)

  return { data, error, execute }
}

type MonitorSaveOneRequest = {
  device: DeviceId
  monitor: MonitorId
  data: MonitorSaveData
}

type MonitorSaveData = {
  symbol: CryptoSymbol
  rotation: MonitorRotation
}
