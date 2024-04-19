<template>
  <div class="flex align-items-center">
    <IconMdiNetworkPos class="mr-1" />
    <span v-if="type" v-tooltip="'Device Type'">{{ type }}</span>
    <Skeleton v-else v-tooltip="'Device Type'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: string
}>()
</script>
