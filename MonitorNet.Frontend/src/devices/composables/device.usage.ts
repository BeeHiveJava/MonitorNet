import type { MaybeDeviceRefOrGetter } from "@/devices"

const ZERO = toRef(() => 0)
const HUNDRED = toRef(() => 100)

export type DeviceUsageType = "Memory" | "Storage" | "CPU Usage" | "CPU Temperature"

export const useDeviceUsage = (type: DeviceUsageType, device: MaybeDeviceRefOrGetter) => {
  if (type === "CPU Usage") {
    return useDeviceCpuUsage(device)
  }

  if (type === "CPU Temperature") {
    return useDeviceCpuTemperature(device)
  }

  if (type === "Memory") {
    return useDeviceMemoryuUsage(device)
  }

  if (type === "Storage") {
    return useDeviceStorageUsage(device)
  }

  return useDeviceUsageCustom(ZERO, HUNDRED, "%")
}

const useDeviceCpuUsage = (device: MaybeDeviceRefOrGetter) => {
  const value = computed(() => toValue(device)?.usage.cpuUsage ?? 0)
  return useDeviceUsageCustom(value, HUNDRED, "%")
}

const useDeviceCpuTemperature = (device: MaybeDeviceRefOrGetter) => {
  const value = computed(() => toValue(device)?.usage.cpuTemperature ?? 0)
  return useDeviceUsageCustom(value, HUNDRED, "C")
}

const useDeviceMemoryuUsage = (device: MaybeDeviceRefOrGetter) => {
  const value = computed(() => toValue(device)?.usage.memoryUsageGb ?? 0)
  const max = computed(() => toValue(device)?.usage.memoryTotalGb ?? 0)
  return useDeviceUsageCustom(value, max, "GB")
}

const useDeviceStorageUsage = (device: MaybeDeviceRefOrGetter) => {
  const value = computed(() => toValue(device)?.usage.storageUsageGb ?? 0)
  const max = computed(() => toValue(device)?.usage.storageTotalGb ?? 0)
  return useDeviceUsageCustom(value, max, "GB")
}

const useDeviceUsageCustom = (usage: Ref<number>, max: Ref<number>, unit: string) => {
  const round = (value: number) => Math.round((value + Number.EPSILON) * 10) / 10

  const percentage = computed(() => round(usage.value / max.value * 100))

  const description = computed(() => unit === "%" || unit === "C"
    ? `${round(usage.value)}${unit}`
    : `${round(usage.value)}${unit} / ${round(max.value)}${unit} (${percentage.value}%)`)

  const color = computed(() => {
    if (percentage.value <= 60) {
      return "bg-green-600"
    }

    if (percentage.value <= 70) {
      return "bg-yellow-600"
    }

    if (percentage.value <= 80) {
      return "bg-orange-600"
    }

    return "bg-red-700"
  })

  return { percentage, description, color }
}
