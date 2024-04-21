<template>
  <div v-if="devices.length <= 0" class="grid">
    <div v-for="index of 4" :key="index" class="col-12 sm:col-6 lg:col-4 xl:col-3">
      <DeviceListItemRender :loading="true" />
    </div>
  </div>
  <div v-else class="grid">
    <div v-for="device of devices" :key="device.id" class="col-12 sm:col-6 lg:col-4 xl:col-3">
      <DeviceListItemRender
        :name="device.name"
        :status="device.status"
        :type="device.type"
        :versions="device.versions"
        :releases="device.releases"
        :network="device.network"
        :usage="device.usage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Device } from "../models/device"

defineProps<{
  devices: Device[]
}>()
</script>
