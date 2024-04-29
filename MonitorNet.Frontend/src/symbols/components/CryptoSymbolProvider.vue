<template>
  <div class="flex align-items-center text-xs font-light">
    <CryptoSymbolProviderLogo :provider="provider" :provider-style="providerStyle" />
    {{ provider?.id ?? 'Unknown' }}
  </div>
</template>

<script setup lang="ts">
import type { CryptoSymbolProvider } from "@/symbols"
defineProps<{ provider?: CryptoSymbolProvider; providerStyle?: string }>()
</script>
