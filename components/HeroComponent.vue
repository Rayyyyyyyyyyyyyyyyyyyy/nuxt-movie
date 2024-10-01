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
const movieDetailRes: TMovieDetail = props.movie_detail
  ? AppUtils.deepCloneData(props.movie_detail)
  : {};
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
  </div>
</template>

<style lang="scss" scoped>
.hero-block {
  @apply text-white mb-6;
  height: 600px;

  .img-box {
    @apply z-0 w-full h-full;
    img {
      @apply w-full h-full;
      @apply object-contain object-center;
    }
  }
}
</style>
