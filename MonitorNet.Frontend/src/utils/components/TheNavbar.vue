
<template>
  <Menubar :model="routes" class="mb-2">
    <template #itemicon="{item}">
      <component :is="item.icon" class="mr-1"/>
    </template>
    <template #start>
      <Avatar size="large" shape="circle" class="mr-1">
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

function toMenuItem(route: RouteRecordNormalized): MenuItem {
  return {
    key: route.name as string,
    label: route.name as string,
    icon: (route.meta.icon as string) ?? undefined,
    visible: route.meta.navbar !== false,
    active: () => route.name === current.name,
    command: () => router.push(route)
  }
}
</script>
