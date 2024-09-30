<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({
  carousel_list: {
    type: Array,
    default: [],
  },
});
const router = useRouter();

const goDetail = (movieID: string) => {
  router.push(`/movie/${movieID}`);
};
</script>

<template>
  <el-carousel indicator-position="outside" :autoplay="false" height="600px">
    <el-carousel-item
      v-for="(item, index) in carousel_list"
      :key="index"
      @click="goDetail(item.id)"
    >
      <div class="carousel-item">
        <div class="img-box">
          <NuxtImg :src="item.backdropUrl" alt="" format="webp" />
        </div>
        <div class="context">
          <p class="title">{{ item.title }}</p>
          <div class="movie-detail">
            <el-rate
              v-model="item.moveRate"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="`${item.vote_average} points`"
            />

            <p>
              {{
                $t("{numberOfReviews} Reviews", {
                  numberOfReviews: item.vote_count,
                })
              }}
            </p>
            <p>{{ dayjs(item.release_date).year() }}</p>
          </div>
          <p class="overview">{{ item.overview }}</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<style lang="scss" scoped>
.carousel-item {
  @apply text-white;
  @apply relative;

  .img-box {
    height: 600px;
    @apply flex items-center justify-center;
    @apply absolute right-0 top-0;
    @apply z-0 w-3/5;

    @media screen and (max-width: 1024px) {
      @apply w-full;
    }
  }

  .context {
    @apply absolute top-16 left-0;
    @apply z-10 p-10 w-3/5 text-white/80;
    @apply flex flex-col justify-center items-start;

    .title {
      @apply text-5xl;
    }
    .movie-detail {
      @apply my-4;
    }
  }
}
</style>
