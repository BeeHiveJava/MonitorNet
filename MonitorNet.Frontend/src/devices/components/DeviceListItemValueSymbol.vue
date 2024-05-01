<template>
  <DeviceListItemValue :title="title" :value="monitor?.symbol" v-slot="{ value }">
    <div @click="() => dialog(device, monitor)" style="cursor: pointer;">
      <CryptoSymbol :symbol="value" />
    </div>
  </DeviceListItemValue>
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
