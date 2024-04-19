<template>
  <div class="flex align-items-center">
    <IconMdiAccountSupervisor class="mr-1" />
    <span v-if="version" v-tooltip="'Supervisor Version'">{{ version }}</span>
    <Skeleton v-else v-tooltip="'Supervisor Version'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  version?: string
}>()
</script>
