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

const movieDetailRes = computed(() => {
  return props.movie_detail ? AppUtils.deepCloneData(props.movie_detail) : {};
}) as TMovieDetail;
</script>

<template>
  <div class="movie-detail">
    <div class="salon-img">
      <NuxtImg
        :src="`${origin_href}/proxy${movieDetailRes.poster_path}`"
        alt=""
        format="webp"
      />
    </div>

    <div class="detail">
      <div class="title">{{ $t("Storyline") }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-detail {
  @apply flex items-start p-10;

  .salon-img {
    @apply w-80;
    @apply border-4 border-primary/100;
    @apply rounded;
  }

  .detail {
    @apply text-white;
    @apply flex flex-col;
    @apply pl-10;

    .title {
      @apply text-4xl;
    }
  }
}
</style>
