<template>
  <Card>
    <template #title>
      <DeviceListItemHeader :id="device?.id" />
    </template>
    <template #content>
      <div class="grid">
        <DeviceListItemValueType :id="device?.id" class="col-6" />
        <DeviceListItemValueStatus :id="device?.id" class="col-6" />

        <DeviceListItemValueVersion :id="device?.id" class="col-6" />
        <DeviceListItemValuePower :id="device?.id" class="col-6" />

        <DeviceListItemValueAddress :id="device?.id" type="lan" class="col-6" />
        <DeviceListItemValueAddress :id="device?.id" type="wan" class="col-6" />

        <DeviceListItemValueUsage :id="device?.id" type="cpu_usage" class="col-6" />
        <DeviceListItemValueUsage :id="device?.id" type="cpu_temperature" class="col-6" />

        <DeviceListItemValueUsage :id="device?.id" type="memory" class="col-6" />
        <DeviceListItemValueUsage :id="device?.id" type="storage" class="col-6" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useDevice } from "../composables/device.store"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)
</script>
