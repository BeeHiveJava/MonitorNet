<template>
  <div class="w-25rem">
    <CryptoSearch label="Monitor-1" v-model="monitorOneSymbol" class="mb-2" />
    <CryptoSearch label="Monitor 2" v-model="monitorTwoSymbol" class="mb-2" />

    <div class="flex justify-content-end gap-2">
      <Button label="Cancel" @click="cancel" severity="secondary" outlined />
      <Button label="Save" @click="save" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
import { useMonitor, useMonitorStore } from "@/monitors"
import type { CryptoSymbol } from "@/symbols"
import type { DynamicDialogOptions } from "primevue/dynamicdialogoptions"

const dialog = inject("dialogRef") as Ref<DynamicDialogOptions>
const store = useMonitorStore()

const deviceId = ref()
const device = useDevice(deviceId)

const monitorOne = useMonitor({device, monitor: 1})
const monitorOneSymbol = ref<CryptoSymbol>()

const monitorTwo = useMonitor({device, monitor: 2})
const monitorTwoSymbol = ref<CryptoSymbol>()

const save = async () => {
  await Promise.all([
    store.save({device, monitor: 1}, monitorOneSymbol.value!),
    store.save({device, monitor: 2}, monitorTwoSymbol.value!)
  ])
  await store.refresh()

  dialog.value.close()
}

const cancel = () => dialog.value.close()

onMounted(() => {
  deviceId.value = dialog.value.data.device
  monitorOneSymbol.value = monitorOne.value?.symbol ?? { id: "BTCUSDT" }
  monitorTwoSymbol.value = monitorTwo.value?.symbol ?? { id: "BTCUSDT" }
})
</script>
