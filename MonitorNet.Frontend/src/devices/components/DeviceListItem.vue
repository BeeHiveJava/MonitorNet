<template>
  <Card>
    <template #title>
      <DeviceListItemHeader :id="device?.id" />
    </template>
    <template #content>
      <div class="grid">
        <DeviceListItemValueSymbol :id="device?.id" :index="1" class="col-6" />
        <DeviceListItemValueSymbol :id="device?.id" :index="2" class="col-6" />

        <DeviceListItemValueType :id="device?.id" class="col-6" />
        <DeviceListItemValueStatus :id="device?.id" class="col-6" />

        <DeviceListItemValueVersion :id="device?.id" class="col-6" />
        <DeviceListItemValuePower :id="device?.id" class="col-6" />

        <DeviceListItemValueAddress :id="device?.id" type="lan" class="col-6" />
        <DeviceListItemValueAddress :id="device?.id" type="wan" class="col-6" />

        <DeviceListItemValueUsage :id="device?.id" type="CPU Usage" class="col-6" />
        <DeviceListItemValueUsage :id="device?.id" type="CPU Temperature" class="col-6" />

        <DeviceListItemValueUsage :id="device?.id" type="Memory" class="col-6" />
        <DeviceListItemValueUsage :id="device?.id" type="Storage" class="col-6" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useDevice } from "@/devices"
const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)
</script>
