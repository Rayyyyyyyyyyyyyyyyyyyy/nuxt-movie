<script setup lang="ts">
import { MovieStore } from "~/stores/movieStore";

const route = useRoute();
const personType = route.params.type;
const i18n = useI18n();
const movieStore = MovieStore();

const pageTitle = computed(() => {
  if (personType === "now_playing") return i18n.t("Now Playing Movies");
  if (personType === "top_rated") return i18n.t("Top Rated Movies");
  if (personType === "upcoming") return i18n.t("Upcoming Movies");
});

const itemList = computed(() => {
  if (personType === "now_playing") return movieStore.afterSetPlayingList;
  if (personType === "top_rated") return movieStore.afterSetRateList;
  if (personType === "upcoming") return movieStore.afterSetComingList;
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
  if (personType === "now_playing") movieStore.getNowPlayingList(state.page);
  if (personType === "top_rated") movieStore.getRateList(state.page);
  if (personType === "upcoming") movieStore.getComingList(state.page);
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
