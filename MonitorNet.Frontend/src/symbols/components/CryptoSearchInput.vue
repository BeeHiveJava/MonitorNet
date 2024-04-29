<template>
  <AutoComplete
    v-model="model"
    v-bind:input-id="inputId"
    v-bind:suggestions="symbols"
    v-bind:option-label="() => ''"
    v-on:complete="complete"
    v-on:item-select="select"
    style="height: 50px">
    <template #option="{ option }">
      <CryptoSearchLabel :symbol="option" />
    </template>
  </AutoComplete>
  <Button @click="cancel" severity="danger">
    <template #icon>
      <IconMdiClose />
    </template>
  </Button>
  <Button @click="submit" severity="primary" :disabled="model.length <= 0">
    <template #icon>
      <IconMdiCheck />
    </template>
  </Button>
</template>

<script setup lang="ts">
import { useSymbolSearch, type CryptoSymbol } from "@/symbols"
import type { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from "primevue/autocomplete"

const model = ref("")
const emits = defineEmits<{
  submit: [symbol: CryptoSymbol]
  cancel: []
}>()

const input = ref("")
const inputId = ref(`input-id-${Math.random()}`)
const symbols = useSymbolSearch(input)

const complete = (event: AutoCompleteCompleteEvent) => input.value = event.query
const select = (event: AutoCompleteItemSelectEvent) => emits("submit", event.value)

const submit = () => emits("submit", toCryptoSymbol(model.value))
const cancel = () => emits("cancel")

onMounted(async () => {
  const element = await until(() => document.getElementById(inputId.value)).toBeTruthy()
  element?.focus()
})

const toCryptoSymbol = (data: string): CryptoSymbol => {
  const segments = data.split(":")
  const provider = segments[1] ? { id: segments[1] } : undefined
  return { id: segments[0], provider }
}
</script>
