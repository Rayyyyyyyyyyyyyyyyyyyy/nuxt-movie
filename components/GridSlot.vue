<script setup lang="ts">
const props = defineProps({
  page_title: {
    type: String,
    default: "",
  },
});

const state = reactive({
  page: 1,
});
const emits = defineEmits(["fetchListEmit"]);
const loadSearch = () => {
  state.page++;

  emits("fetchListEmit", state.page);
};
</script>

<template>
  <div class="page-wrapper">
    <p class="page-title">{{ page_title }}</p>

    <div
      class="item-list"
      v-infinite-scroll="loadSearch"
      :infinite-scroll-immediate="false"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  @apply p-10;

  .page-title {
    @apply text-white text-3xl mb-4;
  }

  .item-list {
    @apply grid auto-rows-auto grid-cols-5 gap-4;
  }

  @media screen and (max-width: 1024px) {
    @apply p-4;
    .page-title {
      @apply text-2xl;
    }
  }

  @media screen and (max-width: 840px) {
    .page-title {
      @apply text-xl;
    }
    .item-list {
      @apply grid-cols-4;
    }
  }

  @media screen and (max-width: 640px) {
    .item-list {
      @apply grid-cols-3;
    }
  }
  @media screen and (max-width: 520px) {
    .item-list {
      @apply grid-cols-2;
    }
  }
}
</style>
