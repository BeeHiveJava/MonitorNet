<template>
  <DeviceListItemValueRender :title="title" :value="address" v-slot="{ value }">
    <span>{{ value }}</span>
  </DeviceListItemValueRender>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: "lan" | "wan"
  address?: string
}>()

const title = computed(() => {
  if (props.type === "lan") {
    return "Local IP"
  }

  if (props.type === "wan") {
    return "Public IP"
  }

  return "IP"
})
</script>
