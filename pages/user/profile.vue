<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import type { Profile } from "~/composables/useUserData";

const router = useRouter();
const { isAuthenticated, isLoading: authLoading } = useAuth();
const { getProfile, updateProfile } = useUserData();

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

const profileForm = ref<FormInstance>();
const isLoading = ref(true);
const isSaving = ref(false);

const formData = reactive({
  display_name: "",
  username: "",
  bio: "",
});

const rules: FormRules = {
  display_name: [
    { required: true, message: "請輸入顯示名稱", trigger: "blur" },
    { min: 2, max: 50, message: "長度須為 2-50 個字元", trigger: "blur" },
  ],
  username: [
    { required: true, message: "請輸入用戶名稱", trigger: "blur" },
    { min: 3, max: 30, message: "長度須為 3-30 個字元", trigger: "blur" },
    { pattern: /^[a-zA-Z0-9_]+$/, message: "只能包含英文、數字和底線", trigger: "blur" },
  ],
  bio: [
    { max: 200, message: "最多 200 個字元", trigger: "blur" },
  ],
};

// 載入個人資料
const loadProfile = async () => {
  isLoading.value = true;
  try {
    const profile = await getProfile();
    if (profile) {
      formData.display_name = profile.display_name || "";
      formData.username = profile.username || "";
      formData.bio = profile.bio || "";
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  } finally {
    isLoading.value = false;
  }
};

// 儲存個人資料
const handleSave = async (form: FormInstance | undefined) => {
  if (!form) return;

  await form.validate(async (valid) => {
    if (valid) {
      isSaving.value = true;
      try {
        const result = await updateProfile({
          display_name: formData.display_name,
          username: formData.username,
          bio: formData.bio || null,
        });

        if (result.success) {
          ElMessage.success("儲存成功");
          router.push("/user");
        } else {
          ElMessage.error(result.message || "儲存失敗");
        }
      } finally {
        isSaving.value = false;
      }
    }
  });
};

onMounted(() => {
  if (isAuthenticated.value) {
    loadProfile();
  }
});

watch(isAuthenticated, (value) => {
  if (value) {
    loadProfile();
  }
});
</script>

<template>
  <div class="profile-page" v-if="isAuthenticated">
    <div class="page-header">
      <NuxtLink to="/user">
        <el-button text>
          <el-icon><i class="el-icon-arrow-left" /></el-icon>
          返回
        </el-button>
      </NuxtLink>
      <h1>編輯個人資料</h1>
    </div>

    <el-card class="profile-form-card" v-loading="isLoading">
      <el-form
        ref="profileForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="顯示名稱" prop="display_name">
          <el-input
            v-model="formData.display_name"
            placeholder="您的顯示名稱"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="用戶名稱" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="用戶名稱（英文、數字、底線）"
            maxlength="30"
            show-word-limit
          >
            <template #prefix>@</template>
          </el-input>
        </el-form-item>

        <el-form-item label="個人簡介" prop="bio">
          <el-input
            v-model="formData.bio"
            type="textarea"
            :rows="4"
            placeholder="介紹一下自己..."
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item>
          <div class="form-actions">
            <el-button @click="router.push('/user')">取消</el-button>
            <el-button
              type="primary"
              @click="handleSave(profileForm)"
              :loading="isSaving"
            >
              儲存
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.profile-page {
  @apply p-6 min-h-screen;
  @apply max-w-2xl mx-auto;
}

.page-header {
  @apply mb-6;

  h1 {
    @apply text-2xl font-bold text-white mt-4;
  }
}

.profile-form-card {
  @apply bg-white/10 border-0;

  :deep(.el-form-item__label) {
    @apply text-white;
  }

  :deep(.el-input__wrapper),
  :deep(.el-textarea__inner) {
    @apply bg-white/10 border-white/20;
    @apply text-white;

    &::placeholder {
      @apply text-white/40;
    }
  }

  :deep(.el-input__prefix) {
    @apply text-white/60;
  }

  :deep(.el-input__count-inner) {
    @apply bg-transparent text-white/40;
  }
}

.form-actions {
  @apply flex gap-4 justify-end w-full;
}
</style>

