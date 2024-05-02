<template>
  <Transition name="fade" class="w-full">
    <InlineMessage v-if="error" severity="error">An error occurred</InlineMessage>
    <InlineMessage v-else-if="success" severity="success">Success</InlineMessage>
  </Transition>

  <div class="flex justify-content-end gap-2">
    <Button label="Close" @click="close" severity="secondary" outlined />
    <Button label="Save" @click="save" :loading="saving" :disabled="invalid" />
  </div>
</template>

<script setup lang="ts">
import { toDeviceId } from "@/devices"
import { MonitorDialogActiveRotation, MonitorDialogActiveSymbol, toMonitorId, useMonitorStore, type MonitorDialogOpenData } from "@/monitors"
import type { DynamicDialogOptions } from "primevue/dynamicdialogoptions"

const store = useMonitorStore()

const dialog = inject<Ref<DynamicDialogOptions>>("dialogRef")
const data = computed<MonitorDialogOpenData>(() => dialog!.value.data)

const deviceId = ref()
const monitorId = ref()

const invalid = computed(() => toValue(MonitorDialogActiveSymbol) === undefined || (toValue(MonitorDialogActiveRotation) ?? "").length <= 0)
const saving = ref(false)
const error = ref(false)
const success = ref(false)

const save = async () => {
  saving.value = true
  error.value = false
  success.value = false

  try {
    const data = { symbol: toValue(MonitorDialogActiveSymbol), rotation: toValue(MonitorDialogActiveRotation) }
    await store.save(deviceId, monitorId, data)
    await store.refresh()
    success.value = true
  } catch (cause) {
    error.value = true
    throw cause
  } finally {
    saving.value = false
  }
}

const close = () => dialog!.value.close()

onMounted(() => {
  deviceId.value = toDeviceId(toValue(data).device)
  monitorId.value = toMonitorId(toValue(data).monitor)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
