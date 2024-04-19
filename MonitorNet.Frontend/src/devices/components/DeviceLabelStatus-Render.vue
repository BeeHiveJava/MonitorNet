<template>
  <div class="flex align-items-center">
    <IconMdiAccountOnline class="mr-1" />
    <Tag v-if="status" v-tooltip="'Device Status'" :severity="severity" :value="status" />
    <Skeleton v-else v-tooltip="'Device Status'" />
  </div>
</template>

<script setup lang="ts">
import type { TagProps } from "primevue/tag"
import type { HintedString } from "primevue/ts-helpers"

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
type StatusType = PropType<TagProps, "severity">

const props = defineProps<{
  status?: HintedString<"Online" | "Offline">
}>()

const severity = computed<StatusType>(() => {
  const status = props.status?.toLowerCase()
  if (status === "online") {
    return "success"
  }

  if (status === "offline") {
    return "danger"
  }

  return "secondary"
})
</script>
