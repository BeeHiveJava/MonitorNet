<template>
  <span class="font-semibold">Monitor {{ monitor?.index }} ({{ device?.name }})</span>
</template>

<script setup lang="ts">
import { toDeviceId, useDevice } from "@/devices"
import { toMonitorId, useMonitor, type MonitorDialogOpenData } from "@/monitors"
import type { DynamicDialogOptions } from "primevue/dynamicdialogoptions"

const dialog = inject<Ref<DynamicDialogOptions>>("dialogRef")
const data = computed<MonitorDialogOpenData>(() => dialog!.value.data)

const deviceId = ref()
const device = useDevice(deviceId)

const monitorId = ref()
const monitor = useMonitor(deviceId, monitorId)

onMounted(() => {
  deviceId.value = toDeviceId(toValue(data).device)
  monitorId.value = toMonitorId(toValue(data).monitor)
})
</script>
