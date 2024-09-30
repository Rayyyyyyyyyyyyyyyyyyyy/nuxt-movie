<script setup lang="ts">
const route = useRoute();
const path = route.params.id;
console.log("path", path);
</script>

<template>
  <div class="text-white">
    <h1>Movie ID: {{ path }}</h1>
  </div>
</template>

<style scoped></style>
