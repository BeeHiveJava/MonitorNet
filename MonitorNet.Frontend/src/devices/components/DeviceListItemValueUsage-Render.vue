<template>
  <DeviceListItemValueRender :title="type" :value="value" v-slot="{ value }">
    <ProgressBar :value="percentage" class="text-red-500" v-tooltip.top="description" :pt:value:class="color"/>
  </DeviceListItemValueRender>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: string,
  value?: number
  max: number
  unit: string
}>(), { max: 100, unit: "%" })

const percentage = computed(() => Math.round((props.value ?? 0) / props.max * 100))

const color = computed(() => {
  if (percentage.value <= 60) {
    return "bg-green-600"
  }

  if (percentage.value <= 70) {
    return "bg-yellow-600"
  }

  if (percentage.value <= 80) {
    return "bg-orange-600"
  }

  return "bg-red-700"
})

const description = computed(() => {
  if (props.max === 100) {
    return `${props.value}${props.unit}`
  }

  return `${props.value}${props.unit} / ${props.max}${props.unit} (${percentage.value}%)`
})
</script>
