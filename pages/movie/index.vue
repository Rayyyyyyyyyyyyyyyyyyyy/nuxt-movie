<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";
import { TMovieITem } from "~/types/apiType";
import { MovieStore } from "~/stores/movieStore";

const movieStore = MovieStore();

const state = reactive({
  afterSetSliderList: [] as TMovieITem[],
});

const getSliderList = async () => {
  const sliderRes = (await getTMDBApi(EApiPaths.popularList, {
    page: 1,
  })) as TMovieListRes<TMovieITem>;

  const cloneSliderData = AppUtils.deepCloneData(
    sliderRes.results,
  ) as TMovieITem[];
  state.afterSetSliderList = AppUtils.setRateNum(cloneSliderData);
};

onMounted(() => {
  getSliderList();

  movieStore.getRateList(1);
  movieStore.getComingList(1);
  movieStore.getNowPlayingList(1);
});

const router = useRouter();

const imageClickFun = (movieID: string) => {
  router.push(`/movie/${movieID}`);
};
</script>

<template>
  <Gridindex>
    <template #slider>
      <SliderComponent
        :carousel_list="state.afterSetSliderList"
        @onItemClickEmit="imageClickFun"
      />
    </template>
    <ScrollComponent
      :scroll_title="$t('Now Playing Movies')"
      :scroll_list="movieStore.afterSetPlayingList"
      @imageClickEmit="imageClickFun"
      list_type="now_playing"
    />
    <ScrollComponent
      :scroll_title="$t('Top Rated Movies')"
      :scroll_list="movieStore.afterSetRateList"
      @imageClickEmit="imageClickFun"
      list_type="top_rated"
    />
    <ScrollComponent
      :scroll_title="$t('Upcoming Movies')"
      :scroll_list="movieStore.afterSetComingList"
      @imageClickEmit="imageClickFun"
      list_type="upcoming"
    />
  </Gridindex>
</template>
