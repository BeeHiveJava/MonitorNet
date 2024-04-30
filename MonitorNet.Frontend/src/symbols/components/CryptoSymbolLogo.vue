<template>
  <Avatar v-if="logo" :image="logo" shape="circle" class="mr-1" style="height: 1em; width: 1em" />
  <IconMdiQuestionMark v-else class="mr-1" style="height: 1em; width: 1em" />
</template>

<script setup lang="ts">
import type { CryptoSymbol } from "@/symbols"

const props = defineProps<{ symbol?: CryptoSymbol }>()

const logo = computed(() => {
  if (props.symbol?.logo === undefined || props.symbol?.logo === null) {
    return undefined
  }

  return `https://s3-symbol-logo.tradingview.com/${props.symbol.logo}.svg`
})
</script>
