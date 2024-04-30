<template>
  <div class="grid-nogutter">
    <CryptoSymbolProvider :provider="symbol?.provider" class="col-12" />
    <CryptoSymbol :symbol="symbol" class="col-12" />
  </div>
</template>

<script setup lang="ts">
import type { CryptoSymbol } from "@/symbols"
defineProps<{ symbol?: CryptoSymbol }>()
</script>
