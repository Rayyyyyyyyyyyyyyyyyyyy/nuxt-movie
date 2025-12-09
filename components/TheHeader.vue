<script setup lang="ts">
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isAuthenticated, displayName, logout, isLoading } = useAuth();

const isActive = (linkName: string) => {
  if (linkName === "/") {
    return route.path === "/";
  }
  return route.path.includes(linkName);
};

const userDisplayName = computed(() => displayName.value ?? "User");

const handleLogout = async () => {
  const result = await logout();
  if (result.status === "success") {
    ElMessage.success("登出成功");
    router.push("/");
  } else if (result.message) {
    ElMessage.error(result.message);
  }
};
</script>

<template>
  <div class="the-header">
    <div class="user-profile">
      <!-- 載入中 -->
      <div v-if="isLoading" class="loading-avatar">
        <el-skeleton :rows="0" animated>
          <template #template>
            <el-skeleton-item variant="circle" style="width: 40px; height: 40px" />
          </template>
        </el-skeleton>
      </div>

      <!-- 已登入 -->
      <el-dropdown v-else-if="isAuthenticated" trigger="click" popper-class="user-dropdown">
        <el-avatar :size="40" class="user-avatar">
          {{ userDisplayName.charAt(0).toUpperCase() }}
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item disabled>
              <span class="user-email">{{ userDisplayName }}</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="router.push('/user')">
              <span>我的後台</span>
            </el-dropdown-item>
            <el-dropdown-item @click="router.push('/user/favorites')">
              <span>我的收藏</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">
              <span class="logout-text">登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 未登入 -->
      <el-tooltip v-else effect="dark" content="登入" placement="right">
        <NuxtLink to="/login">
          <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </NuxtLink>
      </el-tooltip>
    </div>

    <div class="route-icons">
      <el-tooltip effect="dark" :content="t('Home')" placement="right">
        <NuxtLink to="/">
          <div :class="{ 'active-icon': isActive('/') }">
            <nuxt-icon name="home" />
          </div>
        </NuxtLink>
      </el-tooltip>

      <el-tooltip effect="dark" :content="t('Movies')" placement="right">
        <NuxtLink to="/movie">
          <div :class="{ 'active-icon': isActive('movie') }">
            <nuxt-icon name="movie" />
          </div>
        </NuxtLink>
      </el-tooltip>

      <el-tooltip effect="dark" :content="t('TV Shows')" placement="right">
        <NuxtLink to="/tv">
          <div :class="{ 'active-icon': isActive('tv') }">
            <nuxt-icon name="tv" />
          </div>
        </NuxtLink>
      </el-tooltip>

      <el-tooltip effect="dark" :content="t('Search')" placement="right">
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
  @apply flex flex-col;

  .user-profile {
    @apply cursor-pointer;
    @apply w-10 h-10 mb-6;
    @apply flex items-center justify-center;

    .user-avatar {
      @apply bg-success text-white cursor-pointer;
    }

    .loading-avatar {
      @apply w-10 h-10;
    }
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
    @apply flex-row;

    .user-profile {
      @apply mb-0 mr-6;
    }

    a + a {
      @apply mt-0 ml-10;
    }
  }
}

.user-email {
  @apply text-gray-500;
}

.logout-text {
  @apply text-red-500;
}
</style>
