<script setup lang="ts">
import dayjs from "dayjs";
import AppUtils from "~/utils/appUtils";
import type { TMovieITem } from "~/types/apiType";
import { getMoviePosterUrl } from "~/composables/useTmdbImg";

const props = defineProps({
  hero_movie: {
    type: Object,
    default: {},
  },
});
const heroMovie: TMovieITem = props.hero_movie
  ? AppUtils.deepCloneData(props.hero_movie)
  : {};
const backdropUrl = ref("");

onMounted(async () => {
  backdropUrl.value = await getMoviePosterUrl(heroMovie.backdrop_path);
});

const heroRate = heroMovie.vote_average.toFixed(1) / 2;
</script>

<template>
  <div class="hero-block">
    <NuxtImg :src="backdropUrl" alt="" class="hero-bg" />
    <div class="context">
      <p class="title">{{ heroMovie.title }}</p>
      <div class="movie-detail">
        <el-rate v-model="heroRate" disabled />
        <p>
          {{
            $t("{numberOfReviews} Reviews", {
              numberOfReviews: heroMovie.vote_count,
            })
          }}
        </p>
        <p>{{ dayjs(heroMovie.release_date).year() }}</p>
      </div>
      <p class="overview">{{ heroMovie.overview }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.hero-block {
  @apply h-5/6 text-white;
  @apply relative;

  .hero-bg {
    @apply absolute right-0 top-0;
    @apply z-0 w-3/5;

    @media screen and (max-width: 1024px) {
      @apply w-full;
    }
  }
  .context {
    @apply absolute top-0 left-0;
    @apply z-10 p-10 w-3/5;
    @apply flex flex-col  justify-center items-start;

    .title {
      @apply text-5xl;
    }
    .movie-detail {
      @apply my-4;
    }
  }
}
</style>
