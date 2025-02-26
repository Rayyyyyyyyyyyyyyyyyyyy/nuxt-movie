<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TGenresItem } from "~/types/apiType";
import {type TMovieITem, type TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

const route = useRoute();
const genreId = route.params.id;

const state = reactive({
  page: 1,
  genreName: "",
  movieList: [] as TMovieITem[],
});
const url = useRequestURL();

const originHref = url.origin;

const genreRes = (await getTMDBApi(EApiPaths.generMovieList, {})) as {
  genres: TGenresItem[];
};
const genreList = genreRes.genres;
const nowGenre = genreList.find((item) => item.id.toString() === genreId);
if (nowGenre) {
  state.genreName = nowGenre.name;
}
const getGenreMovie = async (page: number) => {
  const res = (await getTMDBApi(EApiPaths.movieGener, {
    page: page,
    with_genres: genreId,
  })) as TMovieListRes<TMovieITem>;
  const cloneList = AppUtils.deepCloneData(res.results) as TMovieITem[];
  cloneList.forEach((item) => {
    item.moveRate = AppUtils.transformRate(item.vote_average);
  });
  state.movieList = [...state.movieList, ...cloneList];
};
getGenreMovie(state.page);

const loadMoreMovie = () => {
  state.page++;
  getGenreMovie(state.page);
};

const i18n = useI18n();

const pageTitle = i18n.t("Movies") + i18n.t("Genre") + ":" + state.genreName;
</script>

<template>
  <GridSlot @fetchListEmit="loadMoreMovie" :page_title="pageTitle">
    <MovieCard
      :movie_detail="item"
      v-for="(item, ind) in state.movieList"
      :key="ind"
  /></GridSlot>
</template>

<style scoped lang="scss"></style>
