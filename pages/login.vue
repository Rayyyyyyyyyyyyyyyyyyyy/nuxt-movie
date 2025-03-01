<script setup lang="ts">
import type { FormInstance } from "element-plus";

const loginForm = ref();
const state = reactive({
  loginForm: {
    email: "",
    pass: "",
  },
});

const submitLogin = async (refForm: FormInstance) => {
  if (!refForm) return;
  await refForm.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
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
        label-width="110px"
        class="login-form"
      >
        >
        <el-form-item
          prop="email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <template #label>
            <p class="label">Email</p>
          </template>
          <el-input
            v-model="state.loginForm.email"
            placeholder="Please input email address"
            clearable
          />
        </el-form-item>
        <el-form-item
          prop="pass"
          :rules="[
            {
              required: true,
              message: 'Please enter your password',
              trigger: 'blur',
            },
          ]"
        >
          <template #label>
            <p class="label">Password</p>
          </template>
          <el-input
            v-model="state.loginForm.pass"
            type="password"
            placeholder="Please input password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitLogin(loginForm)" class="submit-btn">
            login
          </el-button></el-form-item
        >
      </el-form>
    </div>
  </div>
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
      .submit-btn {
        @apply bg-success border-transparent text-white w-1/2;
      }
    }
  }
}
</style>
