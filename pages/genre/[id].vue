<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TGenresItem } from "~/types/apiType";
import { TMovieITem, TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

const route = useRoute();
const genreId = route.params.id;
let originHref = "http://localhost:3000";

const state = reactive({
  page: 1,
  genreName: "",
  movieList: [] as TMovieITem[],
});

if (import.meta.client) {
  originHref = location.origin;
}

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
    item.moveRate = item.vote_average.toFixed(1) / 2;
  });
  state.movieList = [...state.movieList, ...cloneList];
};
getGenreMovie(state.page);

const loadMoreMovie = () => {
  state.page++;
  getGenreMovie(state.page);
};
</script>

<template>
  <div class="p-10">
    <div class="genre-title">
      <p>{{ $t("Movies") }}{{ $t("Genre") }}:</p>
      <p class="ml-2">
        {{ state.genreName }}
      </p>
    </div>

    <div
      class="movie-list"
      v-infinite-scroll="loadMoreMovie"
      :infinite-scroll-immediate="false"
    >
      <div class="movie-item" v-for="(item, ind) in state.movieList" :key="ind">
        <MovieCard :origin_href="originHref" :movie_detail="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.genre-title {
  @apply flex items-center;
  @apply text-white;
  @apply text-2xl;
}
.movie-list {
  @apply grid auto-rows-auto grid-cols-5 gap-4;
  @apply mt-4;

  .movie-item {
    @apply text-white;
  }
}
</style>
