<template>
  <DeviceListItemValue :title="type" :value="device?.usage">
    <ProgressBar :value="percentage" v-tooltip.top="description" :pt:value:class="color" style="height: 16px">
      <div></div>
    </ProgressBar>
  </DeviceListItemValue>
</template>

<script setup lang="ts">
import { useDevice } from "../composables/device.store"
import { useDeviceUsage, type DeviceUsageType } from "../composables/device.utils"

const props = defineProps<{ type: DeviceUsageType, id?: string }>()
const device = useDevice(props.id)

const { percentage, description, color } = useDeviceUsage(props.type, device)
</script>
