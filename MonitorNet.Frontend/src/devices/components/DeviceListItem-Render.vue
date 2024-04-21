<template>
  <Card>
    <template #title>
      <span v-if="name">{{ name }}</span>
      <Skeleton v-else class="w-6" />
    </template>
    <template #content>
      <div class="grid">
        <DeviceListItemValueTypeRender :type="type" class="col-6" />
        <DeviceListItemValueStatusRender :status="status" class="col-6" />

        <DeviceListItemValueAddressRender type="lan" :address="network?.local" class="col-6" />
        <DeviceListItemValueAddressRender type="wan" :address="network?.public" class="col-6" />

        <DeviceListItemValueUsageRender type="CPU" :value="3" :max="100" unit="%" class="col-6" />
        <DeviceListItemValueUsageRender type="Temperature" :value="51" unit="C" class="col-6" />

        <DeviceListItemValueUsageRender type="Memory" :value="2.1" :max="3.7" unit="GB" class="col-6" />
        <DeviceListItemValueUsageRender type="Storage" :value="1.7" :max="28.4" unit="GB" class="col-6" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { DeviceNetworkAddresses, DeviceReleases, DeviceVersions } from "../models/device"

defineProps<{
  name?: string
  status?: string
  type?: string
  versions?: DeviceVersions
  releases?: DeviceReleases
  network?: DeviceNetworkAddresses
}>()
</script>
