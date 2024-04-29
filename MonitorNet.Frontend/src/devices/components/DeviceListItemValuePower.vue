<template>
  <DeviceListItemValue title="Power Supply" :value="device?.undervolted" v-slot="{ value }">
    <div class="flex align-items-center">
      <span>{{ value ? "Undervolted" : "Good" }}</span>
      <IconMdiCheckCircle v-if="value === false" class="ml-1 text-green-700" />
      <IconMdiCloseCircle v-else class="ml-1 text-red-700" />
    </div>
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)
</script>
