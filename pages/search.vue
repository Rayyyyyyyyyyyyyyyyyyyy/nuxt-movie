<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import { TMovieITem, TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

const state = reactive({
  keyword: "",
  page: 1,
  itemList: [],
  loading: false,
  noMore: false,
});
let originHref = "http://localhost:3000";

if (import.meta.client) {
  originHref = location.origin;
}

const doFetchKeyword = async (isSearch: boolean = true) => {
  if (!state.noMore) {
    state.loading = true;

    const res = (await getTMDBApi(EApiPaths.search, {
      query: state.keyword,
      page: state.page,
      include_adult: false,
    })) as TMovieListRes<TMovieITem>;
    if (res.results.length > 0) {
      const cloneList = AppUtils.deepCloneData(res.results);
      cloneList.forEach((item) => {
        if (item.vote_average) {
          item.moveRate = item.vote_average.toFixed(1) / 2;
        }
      });
      const gotPhotoItemList = cloneList.filter((item) => item.poster_path);
      if (isSearch) {
        state.itemList = gotPhotoItemList;
      } else {
        state.itemList = [...state.itemList, ...gotPhotoItemList];
      }
    } else {
      state.noMore = true;
    }

    state.loading = false;
  }
};
const getSearchValue = () => {
  state.page = 1;
  state.itemList = [];
  state.noMore = false;
  doFetchKeyword();
};

const loadSearch = () => {
  state.page++;
  doFetchKeyword(false);
};
</script>

<template>
  <div class="search">
    <div class="search-bar">
      <div class="search-icon">
        <nuxt-icon name="search" />
      </div>

      <el-input
        class="search-input"
        size="large"
        v-model="state.keyword"
        @input="getSearchValue"
      ></el-input>
    </div>
    <div
      v-loading="state.loading"
      element-loading-background="rgba(122, 122, 122, 1)"
      class="search-content"
      v-infinite-scroll="loadSearch"
      :infinite-scroll-immediate="false"
    >
      <div
        class="content-item"
        v-for="(item, ind) in state.itemList"
        :key="ind"
      >
        <MovieCard :origin_href="originHref" :movie_detail="item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  @apply w-full;
  @apply flex flex-col;

  .search-bar {
    @apply w-full relative;

    .search-icon {
      @apply absolute top-6 left-6 text-white z-10 ;
      @apply text-3xl;
    }

    .search-input {
      ::v-deep() {
        .el-input__wrapper {
          @apply bg-primary-dark h-20;

          .el-input__inner {
            @apply text-white text-2xl ml-14;
          }
        }
      }
    }
  }
  .search-content {
    min-height: calc(100vh - 368px);
    @apply p-10;
    @apply grid auto-rows-auto grid-cols-4 gap-4;
  }
}
</style>
