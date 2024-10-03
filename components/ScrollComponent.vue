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
  show_more: {
    type: Boolean,
    default: true,
  },
  show_rate: {
    type: Boolean,
    default: true,
  },
  show_nickName: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["imageClickEmit"]);
const goDetail = (itemId: string) => {
  emits("imageClickEmit", itemId);
};
</script>

<template>
  <el-row justify="space-between" align="bottom" class="title-row">
    <div class="title">{{ scroll_title }}</div>
    <div class="show-more" v-if="show_more">{{ $t("Explore more") }}</div>
  </el-row>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <div
        v-for="(item, index) in scroll_list"
        class="scrollbar-demo-item"
        @click="goDetail(item.id)"
        :key="index"
      >
        <NuxtImg
          :src="item.posterUrl"
          alt=""
          format="webp"
          class="scroll-item_image"
        />

        <p class="item-name">{{ item.title }}</p>
        <el-rate
          v-if="show_rate"
          v-model="item.moveRate"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="`${item.vote_average.toFixed(1)}`"
        />
        <p class="nick-name" v-if="show_nickName">{{ item.nickName }}</p>
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
    &:hover {
      @apply transition duration-150 ease-in-out;
      transform: scale(1.1);
    }
  }
  .item-name {
    @apply mt-2;
  }
  .nick-name {
    @apply text-white/60;
  }
}
</style>
