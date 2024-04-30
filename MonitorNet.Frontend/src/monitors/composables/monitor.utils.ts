import type { MaybeDeviceRefOrGetter } from "@/devices"
import type { MaybeRef, MaybeRefOrGetter } from "vue"

export type MonitorId = { device: MaybeDeviceRefOrGetter, monitor: MaybeMonitorIndexRefOrGetter }

export type MaybeMonitorIndex = number | undefined
export type MaybeMonitorIndexRef = MaybeRef<MaybeMonitorIndex>
export type MaybeMonitorIndexRefOrGetter = MaybeRefOrGetter<MaybeMonitorIndex>
