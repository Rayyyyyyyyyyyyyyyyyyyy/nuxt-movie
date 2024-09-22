<script setup lang="ts"></script>

<template>
  <div class="container">
    <h1 data-aos="fade-left" data-aos-delay="500">这个标题会向上淡入</h1>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @apply w-full h-full;
  @apply p-4 mx-auto overflow-x-auto overflow-y-auto;
  max-height: 100vh;
  @apply bg-primary-light;

  .position_parents {
    @apply relative;
  }
}
</style>
