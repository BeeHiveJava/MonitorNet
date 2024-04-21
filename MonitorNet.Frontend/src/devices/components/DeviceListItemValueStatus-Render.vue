<template>
  <DeviceListItemValueRender title="Status" :value="status" v-slot="{ value }">
    <div class="flex align-items-center">
      <span>{{ value }}</span>
      <IconMdiCheckCircle v-if="status === 'Online'" class="ml-1 text-green-700" />
      <IconMdiCloseCircle v-else-if="status === 'Offline'" class="ml-1 text-red-700" />
    </div>
  </DeviceListItemValueRender>
</template>

<script setup lang="ts">
import type { HintedString } from "primevue/ts-helpers"

defineProps<{
  status?: HintedString<"Online" | "Offline">
}>()
</script>
