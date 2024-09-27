<script setup lang="ts"></script>

<template>
  <div class="the-header">
    <el-tooltip effect="dark" :content="$t('Home')" placement="right">
      <NuxtLink v-slot="{ isActive }" to="/">
        <div :class="{ 'active-icon': isActive }">
          <nuxt-icon name="home" />
        </div>
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" :content="$t('Movies')" placement="right">
      <NuxtLink v-slot="{ isActive }" to="/movie">
        <div :class="{ 'active-icon': isActive }">
          <nuxt-icon name="movie" />
        </div>
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" :content="$t('TV Shows')" placement="right">
      <NuxtLink v-slot="{ isActive }" to="/tv">
        <div :class="{ 'active-icon': isActive }">
          <nuxt-icon name="tv" />
        </div>
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" :content="$t('Search')" placement="right">
      <NuxtLink v-slot="{ isActive }" to="/search">
        <div :class="{ 'active-icon': isActive }">
          <nuxt-icon name="search" />
        </div>
      </NuxtLink>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.the-header {
  @apply p-4 bg-white/20;
  @apply flex-col;
  @apply flex items-center justify-center;
  @apply text-white;

  a + a {
    @apply mt-10;
  }
  .nuxt-icon {
    @apply text-2xl;
  }
  .active-icon {
    @apply text-success;
  }
}
</style>
