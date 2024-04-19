<template>
  <DeviceListRender :devices="store.devices" />
</template>

<script setup lang="ts">
import { useDeviceStore } from "../stores/device.store"

const store = useDeviceStore()

onMounted(async () => await store.refresh())
</script>
