<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/devices">Go to Devices</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router"
</script>
