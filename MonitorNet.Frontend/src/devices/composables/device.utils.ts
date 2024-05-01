import type { Device } from "@/devices"
import type { MaybeRef, MaybeRefOrGetter } from "vue"

export type DeviceId = MaybeDeviceRefOrGetter | MaybeDeviceIdRefOrGetter
export const toDeviceId = (id: DeviceId) => {
  const value = toValue(id)
  return typeof value === "string" ? value : value?.id
}

export type MaybeDevice = Device | undefined
export type MaybeDeviceRef = MaybeRef<MaybeDevice>
export type MaybeDeviceRefOrGetter = MaybeRefOrGetter<MaybeDevice>

export type MaybeDeviceId = string | undefined
export type MaybeDeviceIdRef = MaybeRef<MaybeDeviceId>
export type MaybeDeviceIdRefOrGetter = MaybeRefOrGetter<MaybeDeviceId>
