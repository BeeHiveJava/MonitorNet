<template>
  <DeviceListItemValue title="Version" :value="device?.releases && device?.versions">
    <span v-tooltip="{ value: tooltip, pt: { text: 'w-15rem' } }">{{ version }}</span>
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "../composables/device.store"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)

const version = computed(() => device.value?.releases.current)
const tooltip = computed(() => `Host: ${device.value?.versions.host}\nSupervisor: ${device.value?.versions.supervisor}`)
</script>
