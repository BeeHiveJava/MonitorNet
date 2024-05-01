import type { MaybeRef, MaybeRefOrGetter } from "vue"
import type { Monitor } from "../models"

export type MonitorId = MaybeMonitorRefOrGetter | MaybeMonitorIdRefOrGetter
export const toMonitorId = (id: MonitorId) => {
  const value = toValue(id)
  return typeof value === "number" ? value : value?.index
}


export type MaybeMonitor = Monitor | undefined
export type MaybeMonitorRef = MaybeRef<MaybeMonitor>
export type MaybeMonitorRefOrGetter = MaybeRefOrGetter<MaybeMonitor>

export type MaybeMonitorId = number | undefined
export type MaybeMonitorIdRef = MaybeRef<MaybeMonitorId>
export type MaybeMonitorIdRefOrGetter = MaybeRefOrGetter<MaybeMonitorId>
