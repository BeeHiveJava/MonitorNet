<template>
  <div class="flex align-items-center">
    <IconMdiLocalAreaNetwork v-if="type === 'lan'" class="mr-1" />
    <IconMdiWideAreaNetwork v-else-if="type === 'wan'" class="mr-1" />
    <span v-if="address" v-tooltip="type === 'lan' ? 'Local IP' : 'Public IP'">{{ address }}</span>
    <Skeleton v-else v-tooltip="type === 'lan' ? 'Local IP' : 'Public IP'" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type: "lan" | "wan"
  address?: string
}>()
</script>
