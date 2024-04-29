<template>
  <DeviceListItemValue :title="title" :value="address" v-slot="{ value }">
    <span>{{ value }}</span>
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"

const props = defineProps<{ type: "lan" | "wan", id?: string }>()
const device = useDevice(props.id)

const title = computed(() => {
  if (props.type === "lan") {
    return "Local IP"
  }

  if (props.type === "wan") {
    return "Public IP"
  }

  return "IP"
})

const address = computed(() => {
  if (props.type === "lan") {
    return device.value?.network?.local
  }

  if (props.type === "wan") {
    return device.value?.network?.public
  }

  return undefined
})
</script>
