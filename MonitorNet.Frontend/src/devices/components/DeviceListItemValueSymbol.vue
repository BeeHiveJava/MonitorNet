<template>
  <DeviceListItemValue :title="title" :value="monitor?.symbol" v-slot="{ value }">
    <CryptoSymbol :symbol="value" />
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
import { useMonitor } from "@/monitors"

const props = defineProps<{ index: number, id?: string }>()
const device = useDevice(props.id)
const monitor = useMonitor({device, monitor: props.index})
const title = computed(() => `Monitor ${props.index}`)
</script>
