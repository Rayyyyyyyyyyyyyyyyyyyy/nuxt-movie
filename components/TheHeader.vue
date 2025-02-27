<script setup lang="ts">
const route = useRoute();
const isActive = (linkName: string) => {
  return route.path.includes(linkName);
};
</script>

<template>
  <div class="the-header">
    <div class="user-profile">

      <el-tooltip effect="dark" content="登入" placement="right">
        <NuxtLink to="/login">
          <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </NuxtLink>
      </el-tooltip>


    </div>

    <div class="route-icons">
      <el-tooltip effect="dark" :content="$t('Home')" placement="right">
        <NuxtLink to="/">
          <div :class="{ 'active-icon': isActive('/home') }">
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

  </div>
</template>

<style lang="scss" scoped>
.the-header {
  @apply p-4 bg-white/20;
  @apply text-white;

  .user-profile {
    @apply cursor-pointer;
    @apply w-10 h-10 flex-1;
  }

  .route-icons {
    @apply h-full;
    @apply flex-col flex-1;
    @apply flex items-center justify-center;

  }
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
