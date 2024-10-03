<script setup lang="ts">
import { getMovieApi } from "~/path/to/api";
import type { TActorCast, TMovieDetail } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

const route = useRoute();
const movieId = route.params.id;

let originHref = "http://localhost:3000";

const state = reactive({
  activeName: "overView",
  detailData: {} as TMovieDetail,
  movieID: "",
});

if (import.meta.client) {
  originHref = location.origin;

  if (state.movieID !== movieId) {
    const heroId = document.querySelector("#heroBlock");
    if (heroId) {
      heroId.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
}

const movieDetailRes = (await getMovieApi(`movie/${movieId}`, {
  append_to_response:
    "videos,credits,images,external_ids,release_dates,combined_credits",
  include_image_language: "en",
})) as TMovieDetail;
const cloneDetailData = AppUtils.deepCloneData(movieDetailRes) as TMovieDetail;
cloneDetailData["moveRate"] = movieDetailRes.vote_average.toFixed(1) / 2;
</script>

<template>
  <HeroComponent :movie_detail="cloneDetailData" :origin_href="originHref" />

  <el-tabs v-model="state.activeName" class="tab-content" id="tab_id">
    <el-tab-pane :label="$t('Overview')" name="overView">
      <DetailComponent
        :movie_detail="cloneDetailData"
        :origin_href="originHref"
      />
    </el-tab-pane>
    <el-tab-pane :label="$t('Videos')" name="videos">
      <VideoComponent
        :movie_detail="cloneDetailData"
        :origin_href="originHref"
      />
    </el-tab-pane>
    <el-tab-pane :label="$t('Media Photos')" name="photos">
      <PhotoComponent
        :movie_detail="cloneDetailData"
        :origin_href="originHref"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.tab-content {
  ::v-deep() {
    .el-tabs__nav-wrap {
      &:after {
        @apply bg-transparent;
      }

      .el-tabs__nav-scroll {
        @apply flex justify-center items-center;

        .el-tabs__item {
          @apply text-3xl;
        }

        .el-tabs__active-bar {
          @apply bg-white;
        }

        .is-active {
          @apply text-white;
        }
      }
    }
  }
}
</style>
