<script setup lang="ts">
const route = useRoute();
const personType = route.params.type;
</script>

<template>
  <div>
    <p class="text-white">{{ personType }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
