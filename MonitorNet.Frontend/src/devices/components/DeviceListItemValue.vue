<template>
  <div class="grid-nogutter">
    <div class="col-12 text-xs font-light">
      {{ title }}
    </div>
    <div class="col-12 text-sm font-medium white-space-nowrap">
      <span v-if="value !== undefined">
        <slot :value="value!"></slot>
      </span>
      <Skeleton v-else />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any">
defineProps<{ title: string, value?: T }>()
</script>
