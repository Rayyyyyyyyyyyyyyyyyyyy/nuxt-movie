<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from "element-plus";

const router = useRouter();
const { login, isAuthenticated } = useAuth();

// 如果已登入，重導向到首頁
watch(isAuthenticated, (value) => {
  if (value) {
    router.push("/");
  }
}, { immediate: true });

const loginForm = ref();
const state = reactive({
  loginForm: {
    email: "",
    password: "",
  },
  loginRules: {
    email: [
      {
        required: true,
        message: "Please input email address",
        trigger: "blur",
      },
      {
        type: "email",
        message: "Please input correct email address",
        trigger: ["blur", "change"],
      },
    ],
    password: [
      {
        required: true,
        message: "Please enter your password",
        trigger: "blur",
      },
    ],
  } as FormRules,

  signVisible: false,
  isSubmitting: false,
});

const submitLogin = async (refForm: FormInstance) => {
  if (!refForm || state.isSubmitting) return;

  await refForm.validate(async (valid) => {
    if (valid) {
      state.isSubmitting = true;
      try {
        const result = await login(state.loginForm.email, state.loginForm.password);
        if (result.status === "success") {
          ElMessage.success("登入成功");
          await router.push("/");
        } else if (result.message) {
          ElMessage.error(result.message);
        }
      } finally {
        state.isSubmitting = false;
      }
    }
  });
};
</script>

<template>
  <div class="login-page">
    <div class="form-contain">
      <el-form
        ref="loginForm"
        :model="state.loginForm"
        :rules="state.loginRules"
        label-width="110px"
        class="login-form"
      >
        <el-form-item prop="email">
          <template #label>
            <p class="label">Email</p>
          </template>
          <el-input
            v-model="state.loginForm.email"
            placeholder="Please input email address"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <p class="label">Password</p>
          </template>
          <el-input
            v-model="state.loginForm.password"
            type="password"
            placeholder="Please input password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <div class="btn-block">
            <el-button
              @click="submitLogin(loginForm)"
              class="submit-btn"
              :loading="state.isSubmitting"
            >
              Login
            </el-button>

            <el-button
              @click="state.signVisible = true"
              class="text-btn"
              text
              plain
            >
              Sign Up
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <SignFormDialog
    :sign-visible="state.signVisible"
    @closeSignForm="state.signVisible = false"
  />
</template>

<style scoped lang="scss">
.login-page {
  @apply h-screen;
  @apply bg-center bg-no-repeat bg-contain;
  @apply mx-auto;
  width: calc(100vw - 10rem);
  background-image: url("public/images/login.png");

  .form-contain {
    @apply h-full w-1/2 float-right px-10;
    @apply flex justify-end items-center;

    .login-form {
      @apply w-full mx-auto;
      max-width: 500px;

      .label {
        @apply text-xl text-white;
      }

      .btn-block {
        @apply flex items-center w-full;

        .submit-btn {
          @apply bg-success border-transparent text-white w-1/3;
        }
        .text-btn {
          @apply text-success;

          &:hover {
            @apply text-white bg-success;
          }
        }
      }
    }
  }
}
</style>
