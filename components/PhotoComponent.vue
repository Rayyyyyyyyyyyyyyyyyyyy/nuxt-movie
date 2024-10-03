<script setup lang="ts">
import { TImageDetail, TMovieDetail } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

const props = defineProps({
  movie_detail: {
    type: Object,
    default: {},
  },
  origin_href: {
    type: String,
    default: "http://localhost:3000",
  },
});

const movieDetailRes: TMovieDetail = props.movie_detail
  ? AppUtils.deepCloneData(props.movie_detail)
  : {};

const setImgUrl = (
  arr: TImageDetail[],
  data: (TImageDetail & { fileUrl: string })[] = [],
) => {
  const cloneList = AppUtils.deepCloneData(arr);
  data = cloneList.map((item) => {
    return {
      ...item,
      fileUrl: `${props.origin_href}/proxy/${item.file_path}`,
    };
  });
  return data;
};

const backDropList = setImgUrl(movieDetailRes.images.backdrops);
const posterList = setImgUrl(movieDetailRes.images.posters);
</script>

<template>
  <div class="px-10">
    <PhotoFall
      :fall_title="$t('Backdrops')"
      :image_list="backDropList"
      :col_span="4"
    />
    <PhotoFall
      :fall_title="$t('Posters')"
      :image_list="posterList"
      :col_span="5"
    />
  </div>
</template>

<style scoped></style>
