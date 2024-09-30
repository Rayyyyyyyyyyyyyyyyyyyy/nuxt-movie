<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({
  carousel_list: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <el-carousel indicator-position="outside" :autoplay="false" height="600px">
    <el-carousel-item v-for="item in carousel_list" :key="item">
      <div class="hero-block">
        <div class="img-box">
          <NuxtImg
            :src="item.backdropUrl"
            alt=""
            class="hero-bg"
            format="webp"
          />
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
.hero-block {
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
