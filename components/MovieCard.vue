<script setup lang="ts">
import AppUtils from "~/utils/appUtils";

const props = defineProps({
  movie_detail: {
    type: Object,
    default: {},
  },
  item_type: {
    type: String,
    default: "movie",
  },
});

const url = useRequestURL();
const originHref = url.origin;

const movieDetailRes = props.movie_detail
  ? AppUtils.deepCloneData(props.movie_detail)
  : {};

const router = useRouter();
const onCardClick = () => {
  if (movieDetailRes.media_type) {
    if (movieDetailRes.media_type === "movie") {
      router.push(`/movie/${movieDetailRes.id}`);
    } else {
      router.push(`/tv/${movieDetailRes.id}`);
    }
  } else {
    if (props.item_type === "movie") {
      router.push(`/movie/${movieDetailRes.id}`);
    } else {
      router.push(`/tv/${movieDetailRes.id}`);
    }
  }
};
</script>

<template>
  <el-tooltip class="box-item" effect="dark" placement="top-start">
    <template #content
      ><p class="text-xl">
        {{ movieDetailRes.title || movieDetailRes.name }}
      </p></template
    >
    <div class="movie-card" @click="onCardClick">
      <NuxtImg
        :src="`${originHref}/proxy${movieDetailRes.poster_path}`"
        alt=""
        format="webp"
      />

      <div class="name-rate">
        <p class="name">{{ movieDetailRes.title || movieDetailRes.name }}</p>

        <el-rate
          v-model="movieDetailRes.moveRate"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="`${movieDetailRes.vote_average} points`"
        />
      </div>
    </div>
  </el-tooltip>
</template>

<style scoped>
.movie-card {
  @apply w-full cursor-pointer p-4;

  &:hover {
    @apply transition duration-150 ease-in-out;
    transform: scale(1.1);
  }

  img {
    @apply w-full  object-contain;
    height: 300px;
  }
  .name-rate {
    @apply mt-2;
    @apply flex flex-col;

    .name {
      @apply truncate text-base text-white;
    }
  }
}
</style>
