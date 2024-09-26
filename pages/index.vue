<script setup lang="ts"></script>

<template>
  <div class="page-wrapper">
    <div class="aside aside-context" data-aos="flip-up">
      <div class="my-nane">Gordon</div>
      <div class="title">Front-end engineer</div>

      <el-button class="work-btn">See my work</el-button>
    </div>
    <div class="aside bg-primary/20 ondui" data-aos="zoom-out"></div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  @apply w-full h-screen;
  @apply mx-auto overflow-x-auto overflow-y-auto;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
  @apply flex;

  .aside {
    @apply flex-1 h-full;
    @apply p-10;
  }
  .aside-context {
    @apply bg-bg;
    @apply flex flex-col items-start justify-center;
    .my-nane {
      @apply text-7xl font-extrabold text-primary;
    }
    .title {
      @apply text-3xl mt-4 font-normal text-primary-light;
    }
    .work-btn {
      @apply mt-20 w-1/2 bg-secondary text-white;
    }
  }
  .ondui {
    background: url("assets/images/ondui-foot.jpg");
    @apply bg-contain bg-no-repeat bg-bottom;
  }
}
</style>
