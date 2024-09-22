<script setup lang="ts">
const state = reactive({
  activeName: "",
});
const onAvatarClick = () => {
  state.activeName = "";
};
</script>

<template>
  <div class="pager-herder">
    <NuxtLink to="/">
      <el-avatar
        data-aos="fade-right"
        :size="50"
        class="cursor-pointer"
        @click="onAvatarClick"
        src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
      />
    </NuxtLink>

    <el-tabs class="header-tabs" v-model="state.activeName" data-aos="fade-up">
      <el-tab-pane name="about">
        <template #label>
          <NuxtLink to="/about">About Me</NuxtLink>
        </template>
      </el-tab-pane>
      <el-tab-pane name="project">
        <template #label>
          <NuxtLink to="/project">Projects</NuxtLink>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Skills" name="skill">
        <template #label>
          <NuxtLink to="/skill">Skills</NuxtLink>
        </template>
      </el-tab-pane>
      <el-tab-pane label="Get in touch" name="touch">
        <template #label>
          <NuxtLink to="/touch">Get in touch</NuxtLink>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.pager-herder {
  @apply flex items-center h-20;
  @apply w-full p-4 bg-white;

  .header-tabs {
    @apply w-full;
    @apply ml-4;

    ::v-deep() {
      .el-tabs__header {
        @apply mb-0;
        .el-tabs__nav-wrap {
          &:after {
            @apply h-0;
          }
          .el-tabs__nav-scroll {
            @apply flex justify-center;
            .el-tabs__nav {
              @apply float-none;
            }
          }
        }
      }
    }
  }
}
</style>
