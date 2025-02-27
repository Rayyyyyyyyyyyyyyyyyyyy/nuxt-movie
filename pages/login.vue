<script setup lang="ts">

const state = reactive({
  loginForm: {
    email: '',
    pass: ''
  }
})
</script>

<template>

  <div class="login-page">
    <div class="form-contain">
      <el-form :model="state.loginForm" label-width="auto"
      class="login-form">
      >
        <el-form-item>
          <template #label>
            <p class="label">Email</p>
          </template>
          <el-input v-model="state.loginForm.email"/>
        </el-form-item>
        <el-form-item >
          <template #label>
            <p class="label">Password</p>
          </template>
          <el-input v-model="state.loginForm.pass"/>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<style scoped lang="scss">
.login-page {
  @apply  h-screen;
  @apply bg-center bg-no-repeat bg-contain;
  @apply mx-auto;
  width: calc(100vw - 10rem);
  background-image: url("public/images/login.png");

  .form-contain {
    @apply h-full w-1/2 float-right px-10;
    @apply flex justify-end items-center ;


    .login-form {
      @apply w-full mx-auto;
      max-width: 500px;

      .label {
        @apply text-xl text-white;
      }
    }

  }
}
</style>
