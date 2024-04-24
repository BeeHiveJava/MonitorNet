<template>
  <DeviceListItemValue title="Type" :value="device?.type">
    <span>{{ type }}</span>
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "../composables/device.store"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)

const type = computed(() => device.value?.type.replace("(using 64bit OS)", "").trim())
</script>
