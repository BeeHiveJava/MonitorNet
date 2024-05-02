<template>
  <div v-if="store.devices.length <= 0" class="grid">
    <div v-for="index of 4" :key="index" class="col-12 sm:col-6 lg:col-4 xl:col-3">
      <DeviceListItem />
    </div>
  </div>
  <div v-else class="grid">
    <div v-for="device of store.devices" :key="device.id" class="col-12 sm:col-6 lg:col-4 xl:col-3">
      <DeviceListItem :id="device?.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeviceStore } from "@/devices"
const store = useDeviceStore()
useInterval(5 * 60 * 1000, { callback: store.refresh })
</script>
