<template>
  <FloatLabel class="mr-2">
    <Password v-model="token" :inputId="tokenId" :feedback="false" />
    <label :for="tokenId">Token</label>
  </FloatLabel>
  <Button label="clear" @click="clear" severity="warning" :disabled="!store.authenticated" />
</template>

<script setup lang="ts">
import { DomUtils, useAuthStore } from "@/utils"

const store = useAuthStore()
const tokenId = ref(DomUtils.randomElementId("password-id-"))
const token = ref<string>(store.token ?? "")

const clear = () => { token.value = ""; store.logout() }
watchEffect(() => store.login(toValue(token)))
</script>
