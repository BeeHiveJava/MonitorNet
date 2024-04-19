<template>
  <div class="flex align-items-center">
    <IconMdiGit class="mr-1" />
    <span v-if="version" v-tooltip="name">{{ version }}</span>
    <Skeleton v-else v-tooltip="name" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  version?: string
}>()
</script>
