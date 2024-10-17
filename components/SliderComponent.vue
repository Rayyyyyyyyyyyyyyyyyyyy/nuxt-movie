<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps({
  carousel_list: {
    type: Array,
    default: [],
  },
});

const url = useRequestURL();
const originHref = url.origin;

const emits = defineEmits(["onItemClickEmit"]);
const goDetail = (itemId: string) => {
  emits("onItemClickEmit", itemId);
};

const state = reactive({
  carouselH: "",
});
const getScreenW = () => {
  if (window.innerWidth < 768) {
    if (window.innerWidth < 640) {
      state.carouselH = "300px";
    } else {
      state.carouselH = "450px";
    }
  } else {
    state.carouselH = "600px";
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
  <el-carousel
    indicator-position="outside"
    :autoplay="false"
    :height="state.carouselH"
  >
    <el-carousel-item
      v-for="(item, index) in carousel_list"
      :key="index"
      @click="goDetail(item.id)"
    >
      <div class="carousel-item">
        <div class="img-box">
          <NuxtImg
            :src="`${originHref}/proxy${item.backdrop_path}`"
            alt=""
            format="webp"
          />
        </div>
        <div class="context">
          <p class="title">{{ item.title || item.name }}</p>
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
  @apply relative cursor-pointer;

  .img-box {
    height: 600px;
    @apply flex items-center justify-center;
    @apply absolute right-0 top-0;
    @apply z-0 w-3/5;
    img {
      @apply w-full;
    }
    @media screen and (max-width: 1024px) {
      @apply w-full;
    }
    @media screen and (max-width: 768px) {
      height: 450px;
    }
    @media screen and (max-width: 640px) {
      height: 300px;
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

    @media screen and (max-width: 1024px) {
      @apply top-0;
      @apply w-full;
      .overview {
        @apply hidden;
      }
    }
    @media screen and (max-width: 768px) {
      .title {
        @apply text-2xl;
      }
      .movie-detail {
        @apply my-0;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  ::v-deep() {
    .el-carousel__indicators--outside {
      @apply hidden;
    }
  }
}
</style>
