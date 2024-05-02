<template>
  <div :id="widgetId" :class="{ flipped: rotation === 'flipped' }" />
</template>

<script setup lang="ts">
import { WidgetUtils } from "@/charts"
import type { DeviceId } from "@/devices"
import { useMonitor, useMonitorStore, type MonitorId } from "@/monitors"
import { DefaultCryptoSymbol, type CryptoSymbol } from "@/symbols"
import { DomUtils } from "@/utils"

const route = useRoute()

const widgetUtils = new WidgetUtils()
const widgetId = ref(DomUtils.randomElementId("widget-id-"))
const widget = ref<Element>()

const deviceId: DeviceId = computed(() => route.params.device as string)
const monitorId: MonitorId = computed(() => Number(route.params.monitor as string))

const monitorStore = useMonitorStore()
const monitor = useMonitor(deviceId, monitorId)

const symbol = computed(() => toValue(monitor)?.symbol ?? DefaultCryptoSymbol)
const rotation = computed(() => toValue(monitor)?.rotation ?? "normal")

const load = async (id: string, symbol: CryptoSymbol) => {
  await until(widgetUtils.isReady).toBe(true)
  widgetUtils.load({ id, symbol })
}

onMounted(() => widget.value = DomUtils.addExternalScript("https://s3.tradingview.com/tv.js"))
onUnmounted(() => DomUtils.removeElement(widget.value))

useInterval(1 * 60 * 1000, { callback: monitorStore.refresh })
useTimeout(100, { callback: async () => await load(toValue(widgetId), toValue(symbol)) })

watch(rotation, (newValue, oldValue) => {
  console.info(`Rotation changed: ${oldValue} => ${newValue}`)
})

watch(symbol, async (newValue, oldValue) => {
  console.info(`Symbol changed: ${oldValue.id} => ${newValue?.id}`)
  await load(toValue(widgetId), newValue)
})
</script>

<style scoped>
div.flipped {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
