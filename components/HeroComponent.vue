<script setup lang="ts">
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
const movieDetailRes = props.movie_detail
  ? AppUtils.deepCloneData(props.movie_detail)
  : {};

const state = reactive({
  heroH: "",
  showTooltips: false,
});
const getScreenW = () => {
  const fullH = window.innerHeight;
  if (window.innerWidth < 1024) {
    state.showTooltips = true;
    state.heroH = `${fullH / 4}px`;
  } else {
    state.heroH = "600px";
    state.showTooltips = false;
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
  <div class="hero-block" id="heroBlock" :style="{ height: state.heroH }">
    <div class="img-box">
      <div class="black-box"></div>
      <NuxtImg
        :src="`${origin_href}/proxy${movieDetailRes.backdrop_path}`"
        alt=""
        format="webp"
      />
    </div>

    <div class="movie-outline" data-aos="fade-up">
      <p class="title">{{ movieDetailRes.title || movieDetailRes.name }}</p>
      <div class="rate-point">
        <el-rate
          v-if="movieDetailRes.moveRate"
          v-model="movieDetailRes.moveRate"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="`${movieDetailRes.vote_average} points`"
        />

        <p class="rate-count">
          {{
            $t("{numberOfReviews} Reviews", {
              numberOfReviews: movieDetailRes.vote_count,
            })
          }}
        </p>
      </div>

      <div v-if="movieDetailRes.overview !== '' && !state.showTooltips">
        <p class="title">{{ $t("Storyline") }}</p>
        <p class="overview">{{ movieDetailRes.overview }}</p>
      </div>

      <el-tooltip
        v-if="state.showTooltips"
        effect="dark"
        placement="bottom"
        popper-class="overview-tooltip"
      >
        <template #content>
          <div v-if="movieDetailRes.overview !== ''">
            <p class="title">{{ $t("Storyline") }}</p>
            <p class="overview">{{ movieDetailRes.overview }}</p>
          </div>
        </template>
        <nuxt-icon name="search" class="text-xl" />
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-block {
  @apply text-white mb-6;
  @apply relative;

  .img-box {
    @apply z-0 w-full h-full;
    @apply absolute top-0 right-0;

    .black-box {
      @apply absolute top-0 right-0;
      @apply w-full h-full;
      @apply bg-gradient-to-r from-black from-50%;
    }

    img {
      @apply w-full h-full;
      @apply object-contain object-right;
    }
  }
  .movie-outline {
    @apply absolute left-0 top-0;
    @apply p-10 h-full w-1/2;
    @apply flex flex-col justify-center items-start;

    .title {
      @apply text-3xl;
    }
    .rate-point {
      @apply flex items-center mb-2;

      .rate-count {
        @apply ml-4;
      }
    }

    .overview {
      @apply my-4 text-white/70;
      @apply whitespace-pre-line;
    }
  }
}
@media screen and (max-width: 1024px) {
  .hero-block {
    .movie-outline {
      @apply w-full top-4;
    }
  }
}
@media screen and (max-width: 840px) {
  .hero-block {
    .movie-outline {
      .title {
        @apply text-2xl;
      }
      .rate-count {
        @apply text-sm;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .hero-block {
    .movie-outline {
      .title {
        @apply text-xl;
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .hero-block {
    .movie-outline {
      .title {
        @apply text-xl #{!important};
      }

      .rate-point {
        @apply flex-col items-start text-sm;

        .rate-count {
          @apply block ml-0 w-full;
        }
      }
    }
  }
}
</style>
