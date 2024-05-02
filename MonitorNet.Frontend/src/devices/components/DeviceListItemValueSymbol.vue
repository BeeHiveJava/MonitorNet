<template>
  <div @click="() => dialog(id, index)" style="cursor: pointer;">
    <DeviceListItemValue :title="title" :value="monitor?.symbol" v-slot="{ value }">
      <CryptoSymbol :symbol="value" />
    </DeviceListItemValue>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
import { useMonitor, useMonitorConfigurationDialog } from "@/monitors"

const props = defineProps<{ index: number, id?: string }>()

const device = useDevice(props.id)
const monitor = useMonitor(device, props.index)

const title = computed(() => `Monitor ${monitor.value?.index ?? props.index}`)
const dialog = useMonitorConfigurationDialog()
</script>
