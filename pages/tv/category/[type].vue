<script setup lang="ts">
import { TvStore } from "~/stores/tvStore";

const route = useRoute();
const personType = route.params.type;
const i18n = useI18n();
const tvStore = TvStore();

const pageTitle = computed(() => {
  if (personType === "popular") return i18n.t("Popular TV Shows");
  if (personType === "top_rated") return i18n.t("Top Rated TV Shows");
  if (personType === "airing_today") return i18n.t("TV Shows Airing Today");
});

const itemList = computed(() => {
  if (personType === "popular") return tvStore.afterSetPopularList;
  if (personType === "top_rated") return tvStore.afterSetRateList;
  if (personType === "airing_today") return tvStore.afterSetAriringList;
});

const state = reactive({
  page: 1,
});
onMounted(() => {
  if (itemList.value.length == 0) {
    fetchListData();
  }
});
const fetchListData = () => {
  if (personType === "popular") tvStore.getPopularList(state.page);
  if (personType === "top_rated") tvStore.getRateList(state.page);
  if (personType === "airing_today") tvStore.getAiringTodayList(state.page);
};

const loadSearch = (emitPage) => {
  state.page = emitPage;
  fetchListData();
};
</script>

<template>
  <GridSlot @fetchListEmit="loadSearch" :page_title="pageTitle">
    <MovieCard
      :movie_detail="item"
      v-for="(item, ind) in itemList"
      :key="ind"
    />
  </GridSlot>
</template>

<style scoped lang="scss"></style>
