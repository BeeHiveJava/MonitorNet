import { toDeviceId, type Device, type DeviceId } from "@/devices"
import { useMonitorNetApi } from "@/utils"
import type { UseFetchOptions } from "@vueuse/core"

export const useDeviceStore = defineStore("devices", () => {
  const devices = useLocalStorage<Device[]>("devices", [])
  const external = useDeviceGetAll({ immediate: true })

  const refresh = async () => {
    await external.execute(true)
  }

  const restart = async (device: DeviceId) => {
    const request: DeviceActionRequest = { device, action: "restart" }
    const options: UseFetchOptions = { immediate: false }
    await useDeviceAction(request, options).execute(true)
  }

  const reboot = async (device: DeviceId) => {
    const request: DeviceActionRequest = { device, action: "reboot" }
    const options: UseFetchOptions = { immediate: false }
    await useDeviceAction(request, options).execute(true)
  }

  const shutdown = async (device: DeviceId) => {
    const request: DeviceActionRequest = { device, action: "shutdown" }
    const options: UseFetchOptions = { immediate: false }
    await useDeviceAction(request, options).execute(true)
  }

  watchEffect(() => {
    if (external.data.value) {
      devices.value = external.data.value
    }
  })

  return { devices, refresh, restart, reboot, shutdown }
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

const useDeviceAction = (request: DeviceActionRequest, options?: UseFetchOptions) => {
  const device = toDeviceId(request.device)
  const action = request.action

  const api = useMonitorNetApi(`api/devices/${device}/${action}`, options ?? { immediate: false })
  const { error, execute } = api.post()
  return { error, execute }
}

type DeviceAction = "restart" | "reboot" | "shutdown"
type DeviceActionRequest = { device: DeviceId, action: DeviceAction }
