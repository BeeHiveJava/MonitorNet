<template>
  <DeviceListItemValue title="Status" :value="device?.status" v-slot="{ value }">
    <div class="flex align-items-center">
      <span>{{ value }}</span>
      <IconMdiCheckCircle v-if="value === 'Online'" class="ml-1 text-green-700" />
      <IconMdiCloseCircle v-else class="ml-1 text-red-700" />
    </div>
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "../composables/device.store"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)
</script>
