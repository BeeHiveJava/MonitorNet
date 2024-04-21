<template>
  <DeviceListRender :devices="store.devices" />
</template>

<script setup lang="ts">
import { useDeviceStore } from "../stores/device.store"

const store = useDeviceStore()

let interval: number
onMounted(() => interval = setInterval(store.refresh, 50 * 60 * 1000))
onUnmounted(() => clearInterval(interval))
</script>
