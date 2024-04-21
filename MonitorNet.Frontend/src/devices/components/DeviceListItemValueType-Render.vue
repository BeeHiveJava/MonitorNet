<template>
  <DeviceListItemValueRender title="Type" :value="friendlyType" v-slot="{ value }">
    <span>{{ value }}</span>
  </DeviceListItemValueRender>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: string
}>()

const friendlyType = computed(() => props.type?.replace("(using 64bit OS)", "").trim())
</script>
