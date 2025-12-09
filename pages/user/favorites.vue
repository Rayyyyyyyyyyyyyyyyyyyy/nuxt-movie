<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type { Favorite } from "~/composables/useUserData";

const router = useRouter();
const { isAuthenticated, isLoading: authLoading } = useAuth();
const { getFavorites, removeFavorite } = useUserData();

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

const favorites = ref<Favorite[]>([]);
const isLoading = ref(true);
const activeTab = ref("all");

const url = useRequestURL();
const originHref = url.origin;

// 篩選後的收藏
const filteredFavorites = computed(() => {
  if (activeTab.value === "all") return favorites.value;
  return favorites.value.filter((f) => f.media_type === activeTab.value);
});

// 載入收藏
const loadFavorites = async () => {
  isLoading.value = true;
  try {
    favorites.value = await getFavorites();
  } catch (error) {
    console.error("Error loading favorites:", error);
  } finally {
    isLoading.value = false;
  }
};

// 移除收藏
const handleRemove = async (item: Favorite) => {
  try {
    await ElMessageBox.confirm(
      `確定要移除「${item.title}」嗎？`,
      "移除收藏",
      {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );

    const result = await removeFavorite(item.media_id, item.media_type);
    if (result.success) {
      favorites.value = favorites.value.filter((f) => f.id !== item.id);
      ElMessage.success("已移除收藏");
    } else {
      ElMessage.error(result.message || "移除失敗");
    }
  } catch {
    // 用戶取消
  }
};

// 前往詳情頁
const goToDetail = (item: Favorite) => {
  router.push(`/${item.media_type}/${item.media_id}`);
};

// 獲取標籤類型
const getTagType = (mediaType: string) => {
  switch (mediaType) {
    case "movie":
      return "primary";
    case "tv":
      return "success";
    case "person":
      return "warning";
    default:
      return "info";
  }
};

// 獲取標籤文字
const getTagLabel = (mediaType: string) => {
  switch (mediaType) {
    case "movie":
      return "電影";
    case "tv":
      return "電視劇";
    case "person":
      return "演員";
    default:
      return mediaType;
  }
};

// 獲取圖片路徑
const getImagePath = (item: Favorite) => {
  return item.poster_path || item.profile_path;
};

onMounted(() => {
  if (isAuthenticated.value) {
    loadFavorites();
  }
});

watch(isAuthenticated, (value) => {
  if (value) {
    loadFavorites();
  }
});
</script>

<template>
  <div class="favorites-page" v-if="isAuthenticated">
    <div class="page-header">
      <NuxtLink to="/user">
        <el-button text class="back-btn">
          ← 返回
        </el-button>
      </NuxtLink>
      <h1>我的收藏</h1>
    </div>

    <!-- 篩選標籤 -->
    <el-tabs v-model="activeTab" class="filter-tabs">
      <el-tab-pane label="全部" name="all">
        <template #label>
          <span>全部 ({{ favorites.length }})</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="電影" name="movie">
        <template #label>
          <span>電影 ({{ favorites.filter((f) => f.media_type === "movie").length }})</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="電視劇" name="tv">
        <template #label>
          <span>電視劇 ({{ favorites.filter((f) => f.media_type === "tv").length }})</span>
        </template>
      </el-tab-pane>
      <el-tab-pane label="演員" name="person">
        <template #label>
          <span>演員 ({{ favorites.filter((f) => f.media_type === "person").length }})</span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 載入中 -->
    <div v-if="isLoading" class="loading-container">
      <el-skeleton :rows="3" animated />
    </div>

    <!-- 空狀態 -->
    <div v-else-if="filteredFavorites.length === 0" class="empty-container">
      <el-empty :description="activeTab === 'all' ? '還沒有收藏' : `沒有收藏的${activeTab === 'movie' ? '電影' : '電視劇'}`">
        <NuxtLink :to="activeTab === 'tv' ? '/tv' : '/movie'">
          <el-button type="primary">去探索</el-button>
        </NuxtLink>
      </el-empty>
    </div>

    <!-- 收藏列表 -->
    <div v-else class="favorites-grid">
      <div
        v-for="item in filteredFavorites"
        :key="item.id"
        class="favorite-card"
      >
        <div class="poster-container" @click="goToDetail(item)">
          <NuxtImg
            v-if="getImagePath(item)"
            :src="`${originHref}/proxy${getImagePath(item)}`"
            :alt="item.title"
            format="webp"
            class="poster"
          />
          <div v-else class="no-poster">
            <span>無圖片</span>
          </div>
          <div class="overlay">
            <el-button type="primary" circle>
              <el-icon><i class="el-icon-view" /></el-icon>
            </el-button>
          </div>
        </div>

        <div class="card-info">
          <h3 class="title" @click="goToDetail(item)">{{ item.title }}</h3>
          <div class="meta">
            <el-tag size="small" :type="getTagType(item.media_type)">
              {{ getTagLabel(item.media_type) }}
            </el-tag>
            <span v-if="item.vote_average" class="rating">
              ⭐ {{ item.vote_average.toFixed(1) }}
            </span>
          </div>
          <el-button
            type="danger"
            size="small"
            text
            @click="handleRemove(item)"
          >
            移除收藏
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorites-page {
  @apply p-6 min-h-screen;
}

.page-header {
  @apply mb-6;

  .back-btn {
    @apply text-white/60;
  }

  h1 {
    @apply text-2xl font-bold text-white mt-4;
  }
}

.filter-tabs {
  @apply mb-6;

  :deep(.el-tabs__item) {
    @apply text-white/60;

    &.is-active {
      @apply text-success;
    }
  }

  :deep(.el-tabs__active-bar) {
    @apply bg-success;
  }

  :deep(.el-tabs__nav-wrap::after) {
    @apply bg-white/20;
  }
}

.loading-container,
.empty-container {
  @apply py-10;
}

.favorites-grid {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

.favorite-card {
  @apply bg-white/5 rounded-lg overflow-hidden;
  @apply transition-transform;

  &:hover {
    transform: translateY(-4px);

    .overlay {
      @apply opacity-100;
    }
  }
}

.poster-container {
  @apply relative cursor-pointer;

  .poster {
    @apply w-full aspect-[2/3] object-cover;
  }

  .no-poster {
    @apply w-full aspect-[2/3] bg-white/10;
    @apply flex items-center justify-center text-white/40;
  }

  .overlay {
    @apply absolute inset-0 bg-black/50;
    @apply flex items-center justify-center;
    @apply opacity-0 transition-opacity;
  }
}

.card-info {
  @apply p-4;

  .title {
    @apply text-white font-medium truncate cursor-pointer m-0;
    @apply hover:text-success transition-colors;
  }

  .meta {
    @apply flex items-center gap-2 mt-2;

    .rating {
      @apply text-white/60 text-sm;
    }
  }
}

:deep(.el-empty__description) {
  @apply text-white/60;
}
</style>

