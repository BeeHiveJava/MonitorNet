<template>
  <Avatar v-if="logo" :image="logo" shape="circle" class="mr-1" style="height: 0.8em; width: 0.8em" />
  <IconMdiQuestionMark v-else class="mr-1" style="height: 0.8em; width: 0.8em" />
</template>

<script setup lang="ts">
import type { CryptoSymbolProvider } from "@/symbols"

const props = defineProps<{ provider?: CryptoSymbolProvider }>()

const logo = computed(() => {
  if (props.provider?.logo === undefined || props.provider?.logo === null) {
    return undefined
  }

  return `https://s3-symbol-logo.tradingview.com/${props.provider?.logo}.svg`
})
</script>
