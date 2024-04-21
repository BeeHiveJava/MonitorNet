<template>
  <DeviceListItemValueRender :title="type" :value="value" v-slot="{ value }">
    <ProgressBar :value="percentage" v-tooltip.top="description" :pt:value:class="color" style="height: 16px">
      <div />
    </ProgressBar>
  </DeviceListItemValueRender>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string,
  value?: number
  max: number
  unit: string
}>()

const percentage = computed(() => round(((props.value ?? 0) / props.max) * 100))

const description = computed(() => {
  const value = round(props.value ?? 0)
  const max = round(props.max)

  const unit = props.unit ?? "%"
  return unit === "%" || unit === "C" ? `${value}${unit}` : `${value}${unit} / ${max}${unit} (${percentage.value}%)`
})

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

function round(value: number) {
  return Math.round((value + Number.EPSILON) * 10) / 10
}
</script>
