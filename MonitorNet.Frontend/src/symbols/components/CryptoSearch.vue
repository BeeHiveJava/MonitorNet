<template>
  <InputGroup>
    <InputGroupAddon>{{ label }}</InputGroupAddon>
    <CryptoSearchInput v-if="!readonly" @submit="submit" @cancel="cancel" />
    <CryptoSearchLabel v-else :symbol="model!" class="p-inputtext p-component" style="height: 50px" />
    <Button v-if="readonly" @click="edit">
      <template #icon>
        <IconMdiEdit />
      </template>
    </Button>
  </InputGroup>
</template>

<script setup lang="ts">
import type { CryptoSymbol } from "@/symbols"

const model = defineModel<CryptoSymbol>()
const props = withDefaults(defineProps<{ label: string; readonly?: boolean }>(), { readonly: true })
const readonly = ref(props.readonly)

const edit = () => readonly.value = false
const cancel = () => readonly.value = true
const submit = (symbol: CryptoSymbol) => {
  model.value = symbol
  readonly.value = true
}
</script>
