<script setup lang="ts"></script>

<template>
  <div class="type-select">
    <el-tooltip effect="dark" placement="right">
      <template #content
        ><p class="text-3xl">{{ $t("Movies") }}</p></template
      >

      <NuxtLink v-slot="{ isActive }" to="/movie">
        <nuxt-icon name="movie" />
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" placement="right">
      <template #content
        ><p class="text-3xl">{{ $t("TV Shows") }}</p></template
      >
      <NuxtLink v-slot="{ isActive }" to="/tv">
        <nuxt-icon name="tv" />
      </NuxtLink>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.type-select {
  @apply w-full h-full;
  @apply flex justify-center items-center gap-x-48;
  @apply text-white;

  .nuxt-icon {
    @apply text-9xl;
  }
}
</style>
