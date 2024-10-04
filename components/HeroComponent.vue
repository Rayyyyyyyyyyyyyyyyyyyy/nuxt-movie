<script setup lang="ts">
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
const movieDetailRes = props.movie_detail
  ? AppUtils.deepCloneData(props.movie_detail)
  : {};
</script>

<template>
  <div class="hero-block" id="heroBlock">
    <div class="img-box">
      <div class="black-box"></div>
      <NuxtImg
        :src="`${origin_href}/proxy${movieDetailRes.backdrop_path}`"
        alt=""
        format="webp"
      />
    </div>

    <div class="movie-outline" data-aos="fade-up">
      <p class="title">{{ movieDetailRes.title || movieDetailRes.name }}</p>
      <div class="rate-point">
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
      </div>

      <p class="title">{{ $t("Storyline") }}</p>
      <p class="overview">{{ movieDetailRes.overview }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-block {
  @apply text-white mb-6;
  height: 600px;
  @apply relative;

  .img-box {
    @apply z-0 w-full h-full;
    @apply absolute top-0 right-0;

    .black-box {
      @apply absolute top-0 right-0;
      @apply w-full h-full;
      @apply bg-gradient-to-r from-black from-50%;
    }

    img {
      @apply w-full h-full;
      @apply object-contain object-right;
    }
  }
  .movie-outline {
    @apply absolute left-0 top-0;
    @apply p-10 h-full w-1/2;
    @apply flex flex-col justify-center items-start;

    .title {
      @apply text-3xl;
    }
    .rate-point {
      @apply flex items-center mb-2;

      .rate-count {
        @apply ml-4;
      }
    }

    .overview {
      @apply my-4 text-white/70;
      @apply whitespace-pre-line;
    }
  }
}
</style>
