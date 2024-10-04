<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { TMovieDetail, TMovieListRes, TRecommendItem } from "~/types/apiType";
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
  prop_type: {
    type: String,
    default: "movie",
  },
});

const state = reactive({
  videoVisible: false,
  videoKey: "",
});

const movieDetailRes: TMovieDetail = props.movie_detail
  ? AppUtils.deepCloneData(props.movie_detail)
  : {};
const result = (await getTMDBApi(
  `${props.prop_type}/${movieDetailRes.id}/recommendations`,
  {
    page: 1,
  },
)) as TMovieListRes<TRecommendItem>;
const cloneMovieList = AppUtils.deepCloneData(
  result.results,
) as TRecommendItem[];
cloneMovieList.forEach((item) => {
  item.posterUrl = `${props.origin_href}/proxy${item.poster_path}`;
  item.moveRate = item.vote_average.toFixed(1) / 2;
});
const router = useRouter();

const movieClickFun = (movieID: string) => {
  router.push(`/${props.prop_type}/${movieID}`);
};
const videoCount = movieDetailRes.videos.results.length;
const videoList = movieDetailRes.videos.results;

const playVideo = (videoKey: string) => {
  state.videoVisible = true;
  state.videoKey = videoKey;
};
</script>

<template>
  <div class="p-10">
    <div class="title">
      {{
        $t("{numberOfVideos} Videos", {
          numberOfVideos: videoCount,
        })
      }}
    </div>
    <div class="video-list">
      <div
        class="video"
        v-for="(item, ind) in videoList"
        :key="ind"
        @click="playVideo(item.key)"
      >
        <NuxtImg
          :src="`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`"
          width="500"
          format="webp"
          alt=""
        />
        <p class="mt-2">{{ item.name }}</p>
        <p class="opacity-60 text-sm">{{ item.type }}</p>
      </div>
    </div>

    <ScrollComponent
      :scroll_list="cloneMovieList"
      :scroll_title="$t('More like this')"
      :show_more="false"
      :show_rate="true"
      :show_nickName="false"
      @imageClickEmit="movieClickFun"
    />
  </div>

  <el-dialog
    v-if="state.videoVisible"
    v-model="state.videoVisible"
    title=""
    class="screen-dialog"
    width="800px"
    destroy-on-close
  >
    <iframe
      width="800px"
      height="550px"
      :src="`https://www.youtube.com/embed/${state.videoKey}?rel=0&showinfo=0&autoplay=0`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
  </el-dialog>
</template>

<style lang="scss" scoped>
.title {
  @apply text-xl text-white mb-6;
}
.video-list {
  @apply text-white mb-10;
  min-height: 300px;
  @apply grid grid-rows-1 grid-cols-4;

  .video {
    @apply cursor-pointer;
  }
}
</style>
