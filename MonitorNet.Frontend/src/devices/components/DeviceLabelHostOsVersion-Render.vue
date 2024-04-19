<template>
  <div class="flex align-items-center">
    <IconMdiComputer class="mr-1" />
    <span v-if="version" v-tooltip="'Host OS Version'">{{ version }}</span>
    <Skeleton v-else v-tooltip="'Host OS Version'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  version?: string
}>()
</script>
