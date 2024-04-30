<template>
  <div class="flex align-items-center text-sm">
    <CryptoSymbolLogo :symbol="symbol" :symbol-style="symbolStyle" />
    {{ symbol?.id ?? 'Unknown' }}
  </div>
</template>

<script setup lang="ts">
import type { CryptoSymbol } from "@/symbols"
defineProps<{ symbol?: CryptoSymbol; symbolStyle?: string }>()
</script>
