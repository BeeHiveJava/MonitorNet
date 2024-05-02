<template>
  <TheNavbar v-if="$route.meta.navbar !== false" />
  <RouterView />
  <ConfirmDialog v-if="$route.meta.navbar !== false" />
  <DynamicDialog v-if="$route.meta.navbar !== false" />
</template>

<style>
body {
  background-color: var(--surface-ground);
}
</style>
