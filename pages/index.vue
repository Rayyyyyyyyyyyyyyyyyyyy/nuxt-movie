<script setup lang="ts">
const config = useRuntimeConfig();
// const { data, pending, error } = await useFetch(
//   `https://api.themoviedb.org/3/movie/popular?api_key=${config.public.tmdbApiKey}`,
//   {
//     params: {
//       language: "zh-CN", // 语言参数
//       page: 1, // 页面参数
//     },
//   },
// );
</script>

<template>
  <div class="page-wrapper">
    <!--    <div>-->
    <!--      <div v-if="pending">Loading...</div>-->
    <!--      <div v-if="error">Error: {{ error.message }}</div>-->
    <!--      <div v-if="data">-->
    <!--        <h1>Popular Movies</h1>-->
    <!--        <ul>-->
    <!--          <li v-for="movie in data.results" :key="movie.id">-->
    <!--            {{ movie.title }}-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper {
  @apply w-full bg-black;
  @apply mx-auto overflow-x-auto overflow-y-auto;
  height: calc(100vh - 80px);
  max-width: 100vw;
  @apply flex;
}
</style>
