<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";
import { TMovieITem } from "~/types/apiType";

let originHref = "http://localhost:3000";

if (import.meta.client) {
  originHref = location.origin;
}
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
  const sliderRes = (await getTMDBApi(EApiPaths.tvOnAir, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;

  const cloneSliderData = AppUtils.deepCloneData(
    sliderRes.results,
  ) as TMovieITem[];
  state.afterSetSliderList = setBackdropUrl(cloneSliderData);
};
getSliderList();

const getRateList = async () => {
  const rateRes = (await getTMDBApi(EApiPaths.tvPopularList, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;
  const cloneRateData = AppUtils.deepCloneData(rateRes.results) as TMovieITem[];
  state.afterSetRateList = setBackdropUrl(cloneRateData);
};
getRateList();

const getComingList = async () => {
  const comingRes = (await getTMDBApi(EApiPaths.tvTopRateList, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;
  const cloneComingData = AppUtils.deepCloneData(
    comingRes.results,
  ) as TMovieITem[];
  state.afterSetComingList = setBackdropUrl(cloneComingData);
};
getComingList();

const getNowPlayingList = async () => {
  const nowPlayingRes = (await getTMDBApi(EApiPaths.tvAriring, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;
  const cloneNowPlayData = AppUtils.deepCloneData(
    nowPlayingRes.results,
  ) as TMovieITem[];
  state.afterSetPlayingList = setBackdropUrl(cloneNowPlayData);
};
getNowPlayingList();

const router = useRouter();

const imageClickFun = (itemId: string) => {
  router.push(`/tv/${itemId}`);
};
</script>

<template>
  <SliderComponent
    :carousel_list="state.afterSetSliderList"
    @onItemClickEmit="imageClickFun"
  />
  <div class="p-10">
    <ScrollComponent
      :scroll_title="$t('Popular TV Shows')"
      :scroll_list="state.afterSetRateList"
      @imageClickEmit="imageClickFun"
    />
    <ScrollComponent
      :scroll_title="$t('Top Rated TV Shows')"
      :scroll_list="state.afterSetComingList"
      @imageClickEmit="imageClickFun"
    />
    <ScrollComponent
      :scroll_title="$t('TV Shows Airing Today')"
      :scroll_list="state.afterSetPlayingList"
      @imageClickEmit="imageClickFun"
    />
  </div>
</template>
