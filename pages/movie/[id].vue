<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import type { TMovieDetail } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

const route = useRoute();
const movieId = route.params.id;

const url = useRequestURL();
const originHref = url.origin;

const state = reactive({
  activeName: "overView",
  detailData: {} as TMovieDetail,
  movieID: "",
});

if (import.meta.client) {
  if (state.movieID !== movieId) {
    const heroId = document.querySelector("#heroBlock");
    if (heroId) {
      heroId.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
}

const movieDetailRes = (await getTMDBApi(`movie/${movieId}`, {
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

<style lang="scss" scoped></style>
