<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";
import { TMovieITem } from "~/types/apiType";
import { MovieStore } from "~/stores/movieStore";
import { TvStore } from "~/stores/tvStore";

const tvStore = TvStore();

const state = reactive({
  afterSetSliderList: [] as TMovieITem[],
});

const getSliderList = async () => {
  const sliderRes = (await getTMDBApi(EApiPaths.tvOnAir, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;

  const cloneSliderData = AppUtils.deepCloneData(
    sliderRes.results,
  ) as TMovieITem[];
  state.afterSetSliderList = AppUtils.setRateNum(cloneSliderData);
};

onMounted(() => {
  getSliderList();
  tvStore.getPopularList(1);
  tvStore.getRateList(1);
  tvStore.getAiringTodayList(1);
});

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
      :scroll_list="tvStore.afterSetPopularList"
      @imageClickEmit="imageClickFun"
      list_type="popular"
      page_type="tv"
    />
    <ScrollComponent
      :scroll_title="$t('Top Rated TV Shows')"
      :scroll_list="tvStore.afterSetRateList"
      @imageClickEmit="imageClickFun"
      list_type="top_rated"
      page_type="tv"
    />
    <ScrollComponent
      :scroll_title="$t('TV Shows Airing Today')"
      :scroll_list="tvStore.afterSetAriringList"
      @imageClickEmit="imageClickFun"
      list_type="airing_today"
      page_type="tv"
    />
  </div>
</template>
