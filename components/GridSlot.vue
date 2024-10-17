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
  <div class="p-10">
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
.page-title {
  @apply text-white text-3xl mb-4;
}

.item-list {
  @apply grid auto-rows-auto grid-cols-4 gap-4;
}
</style>
