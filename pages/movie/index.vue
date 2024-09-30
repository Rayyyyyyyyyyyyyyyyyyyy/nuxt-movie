<script setup lang="ts">
import { getMovieApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";
import { TMovieITem } from "~/types/apiType";

const setBackdropUrl = (arr: TMovieITem[]) => {
  arr.forEach(async (item) => {
    item.backdropUrl = `${location.origin}/proxy${item.backdrop_path}`;
    item.posterUrl = `${location.origin}/proxy${item.poster_path}`;
    item.moveRate = item.vote_average.toFixed(1) / 2;
  });
  return arr;
};

const state = reactive({
  afterSetSliderList: [] as TMovieITem[],
  afterSetRateList: [] as TMovieITem[],
  afterSetComingList: [] as TMovieITem[],
  afterSetPlayingList: [] as TMovieITem[],
});

if (process.client) {
  onMounted(() => {
    state.afterSetSliderList = setBackdropUrl(cloneSliderData);
    state.afterSetRateList = setBackdropUrl(cloneRateData);
    state.afterSetComingList = setBackdropUrl(cloneComingData);
    state.afterSetPlayingList = setBackdropUrl(cloneNowPlayData);
  });
}

const sliderRes = (await getMovieApi(EApiPaths.popularList, {
  page: 1,
})) as TMovieListRes<TMovieITem>;

const cloneSliderData = AppUtils.deepCloneData(
  sliderRes.results,
) as TMovieITem[];

const rateRes = (await getMovieApi(EApiPaths.topRateList, {
  page: 1,
})) as TMovieListRes<TMovieITem>;
const cloneRateData = AppUtils.deepCloneData(rateRes.results) as TMovieITem[];

const comingRes = (await getMovieApi(EApiPaths.upComingList, {
  page: 1,
})) as TMovieListRes<TMovieITem>;
const cloneComingData = AppUtils.deepCloneData(
  comingRes.results,
) as TMovieITem[];

const nowPlayingRes = (await getMovieApi(EApiPaths.nowPlaying, {
  page: 1,
})) as TMovieListRes<TMovieITem>;
const cloneNowPlayData = AppUtils.deepCloneData(
  nowPlayingRes.results,
) as TMovieITem[];
</script>

<template>
  <SliderComponent :carousel_list="state.afterSetSliderList" />
  <div class="p-10">
    <ScrollComponent
      :scroll_title="$t('Top Rated Movies')"
      :scroll_list="state.afterSetRateList"
    />
    <ScrollComponent
      :scroll_title="$t('Upcoming Movies')"
      :scroll_list="state.afterSetComingList"
    />
    <ScrollComponent
      :scroll_title="$t('Now Playing Movies')"
      :scroll_list="state.afterSetPlayingList"
    />
  </div>
</template>
