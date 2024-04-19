import type { Device } from "../models/device"
import DeviceService from "../services/device.service"

export const useDeviceStore = defineStore("devices", () => {
  const devices = useLocalStorage<Device[]>("devices", [])
  const service = new DeviceService()

  let pending: Promise<void> | undefined = undefined

  function refresh(): Promise<void> {
    if (pending === undefined) {
      pending = service.GetAll()
        .then(result => { devices.value = result })
        .finally(() => { pending = undefined })
    }

    return pending
  }

  return { devices, refresh }
})
