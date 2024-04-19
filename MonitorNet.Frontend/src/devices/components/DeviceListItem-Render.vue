<template>
  <Card>
    <template #title>
      <span v-if="name">{{ name }}</span>
      <Skeleton v-else class="w-6" />
    </template>
    <template #content>
      <div class="grid">
        <div class="col-6">
          <DeviceLabelStatusRender :status="status" />
        </div>
        <div class="col-6">
          <DeviceLabelTypeRender :type="type" />
        </div>
        <div class="col-6">
          <DeviceLabelSupervisorVersionRender :version="versions?.supervisor" />
        </div>
        <div class="col-6">
          <DeviceLabelHostOsVersionRender :version="versions?.host" />
        </div>
        <div class="col-6">
          <DeviceLabelAppVersionRender name="Current Release" :version="releases?.current" />
        </div>
        <div class="col-6">
          <DeviceLabelAppVersionRender name="Target Release" :version="releases?.target" />
        </div>
        <div class="col-6">
          <DeviceLabelIpRender type="lan" :address="network?.local" />
        </div>
        <div class="col-6">
          <DeviceLabelIpRender type="wan" :address="network?.public" />
        </div>
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
