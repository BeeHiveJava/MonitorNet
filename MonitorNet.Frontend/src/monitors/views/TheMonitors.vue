<template>
  <div class="grid" style="width: 500px">
    <div class="col-12">
      Monitor 1
    </div>
    <div class="col-12">
      <CryptoSearch label="Monitor-1" v-model="model" />
    </div>
  </div>
</template>

<script setup lang="ts">
const model = ref({
  "id": "BTCUSD",
  "logo": "crypto/XTVCBTC",
  "description": "Bitcoin / U.S. dollar",
  "provider": {
    "id": "BITSTAMP",
    "name": "Bitstamp",
    "logo": "provider/bitstamp"
  }
})
</script>
