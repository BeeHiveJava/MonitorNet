<template>
  <div class="grid-nogutter w-25rem">
    <span class="col-12">Symbol</span>
    <CryptoSearch v-model="MonitorDialogActiveSymbol" class="col-12 mt-1" />

    <div class="mb-2" />

    <span class="col-12">Rotation</span>
    <Dropdown :options="['Normal', 'Flipped']" class="col-12 mt-1" />
  </div>
</template>

<script setup lang="ts">
import { MonitorDialogActiveSymbol } from "@/monitors"
</script>
