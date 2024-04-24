<template>
  <Menubar :model="routes" class="mb-2">
    <template #itemicon="{ item }">
      <component :is="item.meta.icon" class="mr-2" />
    </template>
    <template #start>
      <Avatar size="large" shape="circle" class="mr-2">
        <template #icon>
          <IconMdiBitcoin />
        </template>
      </Avatar>
    </template>
  </Menubar>

</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem"
import type { RouteRecordNormalized } from "vue-router"

const current = useRoute()
const router = useRouter()
const routes = computed(() => router.getRoutes().map(toMenuItem))

const toMenuItem = (route: RouteRecordNormalized): MenuItem => {
  return {
    key: route.name as string,
    label: route.name as string,
    visible: route.meta.navbar !== false,
    class: (route.name === current.name) ? "p-highlight" : "",
    meta: { icon: route.meta.icon },
    command: () => router.push(route)
  }
}
</script>

<style>
/* TODO: https://github.com/primefaces/primevue/issues/5250 */
.p-menubar .p-menuitem:first-child {
  margin-top: 2px;
}
</style>
