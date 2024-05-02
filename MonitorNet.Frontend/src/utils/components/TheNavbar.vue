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
import { useAuthStore } from "../composables"

const current = useRoute()
const router = useRouter()
const routes = computed(() => router.getRoutes().filter(route => route.meta.navbar !== false).map(toMenuItem))

const store = useAuthStore()

const toMenuItem = (route: RouteRecordNormalized): MenuItem => {
  return {
    key: route.name as string,
    label: route.name as string,
    visible: isMenuItemVisible(route),
    class: (route.name === current.name) ? "p-highlight" : "",
    meta: { icon: route.meta.icon },
    command: () => router.push(route)
  }
}

const isMenuItemVisible = (route: RouteRecordNormalized) => {
  if (toValue(route.meta.navbar) === false) {
    return false
  }

  return route.meta.anonymous === true || toValue(store.authenticated) === true
}
</script>

<style>
/* TODO: https://github.com/primefaces/primevue/issues/5250 */
.p-menubar .p-menuitem:first-child {
  margin-top: 2px;
}
</style>
