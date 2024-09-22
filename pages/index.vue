<script setup lang="ts"></script>

<template>
  <div class="page-wrapper">
    <div class="aside bg-white">1</div>
    <div class="aside bg-primary/20">2</div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  @apply w-full h-screen;
  @apply mx-auto overflow-x-auto overflow-y-auto;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
  @apply flex;

  .aside {
    @apply flex-1 h-full;
    @apply p-10;
  }
}
</style>
