<script setup lang="ts"></script>

<template>
  <slot name="slider"></slot>

  <div class="page-wrapper">
    <slot> </slot>
  </div>
</template>
<style lang="scss" scoped>
.page-wrapper {
  @apply p-10;

  @media screen and (max-width: 1024px) {
    @apply p-4;
  }
}
</style>
