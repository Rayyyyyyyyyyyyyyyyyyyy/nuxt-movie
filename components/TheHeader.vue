<script setup lang="ts">
const route = useRoute();
const isActive = (linkName: string) => {
  return route.path.includes(linkName);
};
</script>

<template>
  <div class="the-header">
    <el-tooltip effect="dark" :content="$t('Home')" placement="right">
      <NuxtLink to="/">
        <div :class="{ 'active-icon': isActive('home') }">
          <nuxt-icon name="home" />
        </div>
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" :content="$t('Movies')" placement="right">
      <NuxtLink to="/movie">
        <div :class="{ 'active-icon': isActive('movie') }">
          <nuxt-icon name="movie" />
        </div>
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" :content="$t('TV Shows')" placement="right">
      <NuxtLink to="/tv">
        <div :class="{ 'active-icon': isActive('tv') }">
          <nuxt-icon name="tv" />
        </div>
      </NuxtLink>
    </el-tooltip>

    <el-tooltip effect="dark" :content="$t('Search')" placement="right">
      <NuxtLink to="/search">
        <div :class="{ 'active-icon': isActive('search') }">
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

  @media screen and (max-width: 768px) {
    a + a {
      @apply mt-0 ml-10;
    }
    @apply flex-row;
  }
}
</style>
