<template>
  <div class="grid-nogutter">
    <div class="col-12 text-xs font-light">
      {{ title }}
    </div>
    <div class="col-12 text-sm font-medium white-space-nowrap">
      <Transition v-if="value !== undefined" name="fade" mode="out-in">
        <slot :key="transitionKey ?? value" :value="value!" />
      </Transition>
      <Skeleton v-else />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any">
defineProps<{ title: string, value?: T, transitionKey?: any }>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
