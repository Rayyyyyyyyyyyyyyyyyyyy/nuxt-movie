<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { Profile, Favorite } from "~/composables/useUserData";

const router = useRouter();
const { isAuthenticated, isLoading: authLoading, displayName, logout } = useAuth();
const { getProfile, getFavorites } = useUserData();

// 重導向未登入用戶
watch(
  [isAuthenticated, authLoading],
  ([authenticated, loading]) => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  },
  { immediate: true }
);

const profile = ref<Profile | null>(null);
const favorites = ref<Favorite[]>([]);
const isLoading = ref(true);

const url = useRequestURL();
const originHref = url.origin;

// 載入用戶資料
const loadUserData = async () => {
  isLoading.value = true;
  try {
    const [profileData, favoritesData] = await Promise.all([
      getProfile(),
      getFavorites(),
    ]);
    profile.value = profileData;
    favorites.value = favoritesData;
  } catch (error) {
    console.error("Error loading user data:", error);
  } finally {
    isLoading.value = false;
  }
};

// 登出
const handleLogout = async () => {
  const result = await logout();
  if (result.status === "success") {
    ElMessage.success("登出成功");
    router.push("/");
  }
};

// 前往電影/電視劇詳情
const goToDetail = (item: Favorite) => {
  router.push(`/${item.media_type}/${item.media_id}`);
};

onMounted(() => {
  if (isAuthenticated.value) {
    loadUserData();
  }
});

watch(isAuthenticated, (value) => {
  if (value) {
    loadUserData();
  }
});
</script>

<template>
  <div class="user-dashboard" v-if="isAuthenticated">
    <!-- 載入中 -->
    <div v-if="isLoading || authLoading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>

    <!-- 用戶資料 -->
    <div v-else class="dashboard-content">
      <!-- 個人資訊卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <span>個人資料</span>
            <NuxtLink to="/user/profile">
              <el-button type="primary" text>編輯</el-button>
            </NuxtLink>
          </div>
        </template>

        <div class="profile-info">
          <el-avatar :size="80" class="user-avatar">
            {{ profile?.display_name?.charAt(0).toUpperCase() || "U" }}
          </el-avatar>
          <div class="user-details">
            <h2>{{ profile?.display_name || displayName }}</h2>
            <p class="username">@{{ profile?.username }}</p>
            <p class="bio" v-if="profile?.bio">{{ profile.bio }}</p>
          </div>
        </div>

        <div class="profile-actions">
          <el-button type="danger" @click="handleLogout">登出</el-button>
        </div>
      </el-card>

      <!-- 收藏列表 -->
      <el-card class="favorites-card">
        <template #header>
          <div class="card-header">
            <span>我的收藏 ({{ favorites.length }})</span>
            <NuxtLink to="/user/favorites" v-if="favorites.length > 4">
              <el-button type="primary" text>查看全部</el-button>
            </NuxtLink>
          </div>
        </template>

        <div v-if="favorites.length === 0" class="empty-favorites">
          <el-empty description="還沒有收藏任何電影或電視劇">
            <NuxtLink to="/movie">
              <el-button type="primary">去探索</el-button>
            </NuxtLink>
          </el-empty>
        </div>

        <div v-else class="favorites-grid">
          <div
            v-for="item in favorites.slice(0, 4)"
            :key="item.id"
            class="favorite-item"
            @click="goToDetail(item)"
          >
            <NuxtImg
              v-if="item.poster_path"
              :src="`${originHref}/proxy${item.poster_path}`"
              :alt="item.title"
              format="webp"
              class="poster"
            />
            <div v-else class="no-poster">
              <span>無圖片</span>
            </div>
            <div class="item-info">
              <p class="title">{{ item.title }}</p>
              <el-tag size="small" :type="item.media_type === 'movie' ? 'primary' : 'success'">
                {{ item.media_type === "movie" ? "電影" : "電視劇" }}
              </el-tag>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 統計資訊 -->
      <el-card class="stats-card">
        <template #header>
          <span>統計</span>
        </template>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-statistic title="收藏電影" :value="favorites.filter(f => f.media_type === 'movie').length" />
          </el-col>
          <el-col :span="12">
            <el-statistic title="收藏電視劇" :value="favorites.filter(f => f.media_type === 'tv').length" />
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-dashboard {
  @apply p-6 min-h-screen;
  @apply text-white;
}

.loading-container {
  @apply p-10;
}

.dashboard-content {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.profile-card,
.favorites-card,
.stats-card {
  @apply bg-white/10 border-0;

  :deep(.el-card__header) {
    @apply border-b border-white/20;
  }
}

.card-header {
  @apply flex justify-between items-center text-white;
}

.profile-info {
  @apply flex items-center gap-6;
}

.user-avatar {
  @apply bg-success text-white text-2xl;
}

.user-details {
  h2 {
    @apply text-xl font-bold text-white m-0;
  }

  .username {
    @apply text-white/60 text-sm m-0;
  }

  .bio {
    @apply text-white/80 mt-2 m-0;
  }
}

.profile-actions {
  @apply mt-6 pt-4 border-t border-white/20;
}

.empty-favorites {
  @apply py-6;
}

.favorites-grid {
  @apply grid grid-cols-2 gap-4;

  @media (min-width: 640px) {
    @apply grid-cols-4;
  }
}

.favorite-item {
  @apply cursor-pointer transition-transform;

  &:hover {
    transform: scale(1.05);
  }

  .poster {
    @apply w-full aspect-[2/3] object-cover rounded-lg;
  }

  .no-poster {
    @apply w-full aspect-[2/3] bg-white/10 rounded-lg;
    @apply flex items-center justify-center text-white/40;
  }

  .item-info {
    @apply mt-2;

    .title {
      @apply text-white text-sm truncate m-0;
    }
  }
}

:deep(.el-statistic__head) {
  @apply text-white/60;
}

:deep(.el-statistic__content) {
  @apply text-white;
}

:deep(.el-empty__description) {
  @apply text-white/60;
}
</style>

