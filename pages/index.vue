<script setup lang="ts">
import { getMovieApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieListRes } from "~/types/apiType";

const config = useRuntimeConfig();

const res = (await getMovieApi(EApiPaths.popularList, {
  page: 1,
})) as TMovieListRes;
const heroMovie = res.results[0];
const carouselMovies = res.results.filter((item, ind) => ind > 0);
</script>

<template>
  <Hero :hero_movie="heroMovie" />
</template>
