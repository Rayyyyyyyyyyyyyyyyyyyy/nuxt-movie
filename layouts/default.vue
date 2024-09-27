<script setup lang="ts"></script>

<template>
  <div class="page-wrapper">
    <TheHeader />

    <div class="main">
      <div class="main-container">
        <slot />
      </div>

      <TheFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  @apply w-screen h-screen bg-black;
  max-width: 100vw;
  max-height: 100vh;
  @apply flex;

  .main {
    @apply w-full h-full;
    @apply overflow-x-auto overflow-y-auto;
    @apply bg-black;
    @apply flex flex-col;

    .main-container {
      @apply flex-1;
    }
  }
}
</style>
