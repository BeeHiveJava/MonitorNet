import type { MaybeDeviceRefOrGetter } from "@/devices"
import type { Monitor, MonitorId } from "@/monitors"
import type { CryptoSymbol } from "@/symbols"
import { useMonitorNetApi } from "@/utils"
import type { UseFetchOptions } from "@vueuse/core"

export const useMonitorStore = defineStore("monitors", () => {
  const monitors = useLocalStorage<Monitor[]>("monitors", [])
  const external = useMonitorGetAll(true)

  const refresh = async () => {
    await external.execute(true)
  }

  const save = async (id: MonitorId, symbol: CryptoSymbol) => {
    await useMonitorSave(id, symbol).execute(true)
  }

  watchEffect(() => {
    if (external.data.value) {
      monitors.value = external.data.value
    }
  })

  return { monitors, refresh, save }
})

export const useMonitor = (id: MonitorId) => {
  const monitors = useMonitors(id.device)

  return computed(() => {
    const index = toValue(id.monitor)

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

    return store.monitors.filter(monitor => monitor?.device === toValue(device)?.id)
  })
}

const useMonitorGetAll = (immediate: boolean = false) => {
  const options: UseFetchOptions = { immediate }
  const api = useMonitorNetApi("api/monitors", options)
  const { data, error, execute } = api.get().json<Monitor[]>()
  return { data, error, execute }
}

const useMonitorSave = (id: MonitorId, symbol: CryptoSymbol, immediate: boolean = false) => {
  const options: UseFetchOptions = { immediate }
  const api = useMonitorNetApi(`api/monitors/${toValue(id.device)?.id}/${toValue(id.monitor)}`, options)
  const { data, error, execute } = api.put(symbol)
  return { data, error, execute }
}
