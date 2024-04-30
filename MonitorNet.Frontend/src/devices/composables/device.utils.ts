import type { Device } from "@/devices"
import type { MaybeRef, MaybeRefOrGetter } from "vue"

export type MaybeDevice = Device | undefined
export type MaybeDeviceRef = MaybeRef<MaybeDevice>
export type MaybeDeviceRefOrGetter = MaybeRefOrGetter<MaybeDevice>
