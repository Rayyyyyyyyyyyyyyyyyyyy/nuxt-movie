<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";
import { TMovieITem } from "~/types/apiType";

const url = useRequestURL();
const originHref = url.origin;

const setBackdropUrl = (arr: TMovieITem[]) => {
  arr.forEach(async (item) => {
    item.backdropUrl = `${originHref}/proxy${item.backdrop_path}`;
    item.posterUrl = `${originHref}/proxy${item.poster_path}`;
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

const getSliderList = async () => {
  const sliderRes = (await getTMDBApi(EApiPaths.popularList, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;

  const cloneSliderData = AppUtils.deepCloneData(
    sliderRes.results,
  ) as TMovieITem[];
  state.afterSetSliderList = setBackdropUrl(cloneSliderData);
};
getSliderList();

const getRateList = async () => {
  const rateRes = (await getTMDBApi(EApiPaths.topRateList, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;
  const cloneRateData = AppUtils.deepCloneData(rateRes.results) as TMovieITem[];
  state.afterSetRateList = setBackdropUrl(cloneRateData);
};
getRateList();

const getComingList = async () => {
  const comingRes = (await getTMDBApi(EApiPaths.upComingList, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;
  const cloneComingData = AppUtils.deepCloneData(
    comingRes.results,
  ) as TMovieITem[];
  state.afterSetComingList = setBackdropUrl(cloneComingData);
};
getComingList();

const getNowPlayingList = async () => {
  const nowPlayingRes = (await getTMDBApi(EApiPaths.nowPlaying, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;
  const cloneNowPlayData = AppUtils.deepCloneData(
    nowPlayingRes.results,
  ) as TMovieITem[];
  state.afterSetPlayingList = setBackdropUrl(cloneNowPlayData);
};
getNowPlayingList();

const router = useRouter();

const imageClickFun = (movieID: string) => {
  router.push(`/movie/${movieID}`);
};
</script>

<template>
  <SliderComponent
    :carousel_list="state.afterSetSliderList"
    @onItemClickEmit="imageClickFun"
  />
  <div class="p-10">
    <ScrollComponent
      :scroll_title="$t('Top Rated Movies')"
      :scroll_list="state.afterSetRateList"
      @imageClickEmit="imageClickFun"
    />
    <ScrollComponent
      :scroll_title="$t('Upcoming Movies')"
      :scroll_list="state.afterSetComingList"
      @imageClickEmit="imageClickFun"
    />
    <ScrollComponent
      :scroll_title="$t('Now Playing Movies')"
      :scroll_list="state.afterSetPlayingList"
      @imageClickEmit="imageClickFun"
    />
  </div>
</template>
