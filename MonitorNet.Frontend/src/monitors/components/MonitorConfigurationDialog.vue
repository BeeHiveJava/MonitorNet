<template>
  <div class="grid-nogutter">
    <span class="col-12">Symbol</span>
    <CryptoSearch v-model="MonitorDialogActiveSymbol" class="col-12 mt-1" />

    <div class="mb-2" />

    <span class="col-12">Rotation</span>
    <Dropdown v-model="MonitorDialogActiveRotation" :options="['Normal', 'Flipped']" class="col-12 mt-1" />
  </div>
</template>

<script setup lang="ts">
import { MonitorDialogActiveRotation, MonitorDialogActiveSymbol } from "@/monitors"
</script>
