<template>
  <Button :disabled="device === undefined" @click="menu?.toggle" severity="contrast">
    <template #icon>
      <IconMdiHamburgerMenu />
    </template>
  </Button>

  <Menu ref="menu" :model="items" :popup="true">
    <template #itemicon="{ item }">
      <component :is="item.meta.icon" class="mr-2" />
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { useDevice, useDeviceMenu } from "@/devices"
import type Menu from "primevue/menu"

const props = defineProps<{ id?: string }>()
const device = useDevice(props.id)

const menu = ref()
const items = useDeviceMenu(device)
</script>
