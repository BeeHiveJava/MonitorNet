<template>
  <Card>
    <template #title>
      <span v-if="name">{{ name }}</span>
      <Skeleton v-else class="w-6" style="height: 24px" />
    </template>
    <template #content>
      <div class="grid">
        <DeviceListItemValueTypeRender :type="type" class="col-6" />
        <DeviceListItemValueStatusRender :status="status" class="col-6" />

        <DeviceListItemValueAddressRender type="lan" :address="network?.local" class="col-6" />
        <DeviceListItemValueAddressRender type="wan" :address="network?.public" class="col-6" />

        <DeviceListItemValueUsageRender type="CPU" :value="usage?.cpuUsage" :max="100" unit="%" class="col-6" />
        <DeviceListItemValueUsageRender type="Temperature" :value="usage?.cpuTemperature" :max="100" unit="C" class="col-6" />

        <DeviceListItemValueUsageRender type="Memory" :value="(usage?.memoryUsageMb ?? 0) / 1000" :max="(usage?.memoryTotalMb ?? 0) / 1000" unit="GB" class="col-6" />
        <DeviceListItemValueUsageRender type="Storage" :value="(usage?.storageUsageMb ?? 0) / 1000" :max="(usage?.storageTotalMb ?? 0) / 1000" unit="GB" class="col-6" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { DeviceNetworkAddresses, DeviceReleases, DeviceUsage, DeviceVersions } from "../models/device"

const props = defineProps<{
  name?: string
  status?: string
  type?: string
  versions?: DeviceVersions
  releases?: DeviceReleases
  network?: DeviceNetworkAddresses
  usage?: DeviceUsage
}>()
</script>
