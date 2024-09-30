<script setup lang="ts">
const props = defineProps({
  scroll_title: {
    type: String,
    default: "",
  },
  scroll_list: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <el-row justify="space-between" align="bottom" class="title-row">
    <div class="title">{{ scroll_title }}</div>
    <div class="show-more">{{ $t("Explore more") }}</div>
  </el-row>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <div v-for="item in scroll_list" :key="item" class="scrollbar-demo-item">
        <NuxtImg
          :src="item.posterUrl"
          alt=""
          format="webp"
          class="scroll-item_image"
        />

        <p class="item-name">{{ item.title }}</p>
        <el-rate
          v-model="item.moveRate"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="`${item.vote_average.toFixed(1)}`"
        />
      </div>
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.title-row {
  @apply mt-6 mb-2;
}
.title {
  @apply text-white;
  @apply text-3xl;
}
.show-more {
  @apply text-white/40;
}
.scrollbar-flex-content {
  @apply flex;
}
.scrollbar-demo-item {
  @apply flex flex-col shrink-0;
  @apply justify-start items-start;
  @apply m-3;
  @apply w-56 h-96 text-white;
  @apply cursor-pointer;

  .scroll-item_image {
    @apply w-56 h-80;
  }
  .item-name {
    @apply mt-2;
  }
}
</style>
