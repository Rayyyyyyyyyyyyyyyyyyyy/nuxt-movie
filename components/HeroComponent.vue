<script setup lang="ts">
import dayjs from "dayjs";
import AppUtils from "~/utils/appUtils";
import { TMovieDetail } from "~/types/apiType";

const props = defineProps({
  movie_detail: {
    type: Object,
    default: {},
  },
  origin_href: {
    type: String,
    default: "http://localhost:3000",
  },
});
const movieDetailRes = computed(() => {
  return props.movie_detail ? AppUtils.deepCloneData(props.movie_detail) : {};
}) as TMovieDetail;
</script>

<template>
  <div class="hero-block">
    <div class="img-box">
      <NuxtImg
        :src="`${origin_href}/proxy${movieDetailRes.backdrop_path}`"
        alt=""
        format="webp"
      />
    </div>
    <div class="context">
      <p class="title">{{ movieDetailRes.title }}</p>
      <div class="movie-detail">
        <el-rate
          v-if="movieDetailRes.moveRate"
          v-model="movieDetailRes.moveRate"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="`${movieDetailRes.vote_average} points`"
        />

        <p class="rate-count">
          {{
            $t("{numberOfReviews} Reviews", {
              numberOfReviews: movieDetailRes.vote_count,
            })
          }}
        </p>
        <p>{{ dayjs(movieDetailRes.release_date).format("YYYY-MM-DD") }}</p>
      </div>
      <p class="overview">{{ movieDetailRes.overview }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-block {
  height: 450px;
  @apply text-white;
  @apply relative;

  .img-box {
    @apply absolute right-0 top-0;
    @apply z-0 w-3/5;
  }
  .context {
    @apply absolute top-16 left-0;
    @apply z-10 p-10 w-3/5 text-white/80;
    @apply flex flex-col justify-center items-start;

    .title {
      @apply text-5xl;
    }
    .movie-detail {
      @apply my-2 flex items-center;
      @apply text-white/50;

      .rate-count {
        @apply mx-4;
      }
    }
  }
}
</style>
