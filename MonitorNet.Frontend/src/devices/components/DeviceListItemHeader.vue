<template>
  <div class="grid">
    <div class="col-11">
      <span v-if="device">{{ device.name }}</span>
      <Skeleton v-else class="w-6" style="height: 24px" />
    </div>
    <div class="col-1">
      <DeviceListItemActions :id="device?.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from "../composables/device.store"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)
</script>
