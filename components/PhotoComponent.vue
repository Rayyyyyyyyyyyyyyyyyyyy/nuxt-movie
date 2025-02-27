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
  const cloneList = AppUtils.deepCloneData(arr) as TImageDetail[];
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

const state = reactive({
  backdropsSpan: "4",
  postersSpan: "5",
});
const getScreenW = () => {
  if (window.innerWidth < 1024) {
    state.backdropsSpan = "3";
    state.postersSpan = "4";
    if (window.innerWidth < 768) {
      state.backdropsSpan = "2";
      state.postersSpan = "3";
    }
    if (window.innerWidth < 640) {
      state.backdropsSpan = "2";
      state.postersSpan = "2";
    }
    if (window.innerWidth < 450) {
      state.backdropsSpan = "1";
      state.postersSpan = "1";
    }
  } else {
    state.backdropsSpan = "4";
    state.postersSpan = "5";
  }
};
onMounted(() => {
  getScreenW();
  setTimeout(() => {
    window.addEventListener("resize", getScreenW);
  }, 300);
});
</script>

<template>
  <div class="px-10">
    <PhotoFall
      :fall_title="$t('Backdrops')"
      :image_list="backDropList"
      :col_span="state.backdropsSpan"
    />
    <PhotoFall
      :fall_title="$t('Posters')"
      :image_list="posterList"
      :col_span="state.postersSpan"
    />
  </div>
</template>

<style scoped></style>
