<script setup lang="ts">
import { MovieStore } from "~/stores/movieStore";
import { TvStore } from "~/stores/tvStore";

const movieStore = MovieStore();
const tvStore = TvStore();

onMounted(() => {
  movieStore.getNowPlayingList(1);
  tvStore.getPopularList(1);
});
const router = useRouter();

const imageClickFun = (itemID: string) => {
  router.push(`/movie/${itemID}`);
};
const tvImageClickFun = (itemId: string) => {
  router.push(`/tv/${itemId}`);
};
</script>

<template>
  <div class="home-page">
    <ScrollComponent
      :scroll_title="$t('Now Playing Movies')"
      :scroll_list="movieStore.afterSetPlayingList"
      @imageClickEmit="imageClickFun"
      list_type="now_playing"
    />

    <ScrollComponent
      :scroll_title="$t('Popular TV Shows')"
      :scroll_list="tvStore.afterSetPopularList"
      @imageClickEmit="tvImageClickFun"
      list_type="popular"
      page_type="tv"
    />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  @apply p-10;
  @apply flex flex-col;
}
</style>
