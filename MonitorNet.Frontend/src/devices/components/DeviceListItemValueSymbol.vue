<template>
  <div @click="() => dialog(id, index)" style="cursor: pointer;">
    <DeviceListItemValue :title="title" :value="symbol" v-slot="{ value }">
      <CryptoSymbol :symbol="value" />
    </DeviceListItemValue>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
import { useMonitor, useMonitorConfigurationDialog } from "@/monitors"
import { DefaultCryptoSymbol } from "@/symbols"

const props = defineProps<{ index: number, id?: string }>()

const device = useDevice(props.id)
const monitor = useMonitor(device, props.index)

const title = computed(() => `Monitor ${monitor.value?.index ?? props.index}`)
const symbol = computed(() => {
  const symbol = toValue(monitor)?.symbol ?? DefaultCryptoSymbol
  return toValue(device) !== undefined ? symbol : undefined
})

const dialog = useMonitorConfigurationDialog()
</script>
