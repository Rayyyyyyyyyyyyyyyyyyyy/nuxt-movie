<script setup lang="ts">
import AppUtils from "~/utils/appUtils";
import {
  type TActorCast,
  type TActorCrew,
  TExternal,
  type TGenresItem,
  TMovieDetail,
  TMovieListRes,
  type TOption,
  TRecommendItem,
} from "~/types/apiType";
import dayjs from "dayjs";
import { useRuntimeConfig } from "#imports";
import { getMovieApi } from "~/path/to/api";

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
const transformRunTime = (runMin: number) => {
  let hours = Math.floor(runMin / 60); // 取得整數小時
  let remainingMinutes = runMin % 60; // 取得剩餘的分鐘

  return hours + "h " + remainingMinutes + "min";
};

const setComma = (amountInt: number) => {
  if (amountInt === 0) {
    return "";
  }
  return "$" + amountInt.toLocaleString();
};

const state = reactive({
  directer: {} as TActorCrew,
  genresList: [] as TGenresItem[],
  mapList: [] as TOption[],
  actorList: [] as TActorCast[],
});
const getCreator = () => {
  const directing = movieDetailRes.credits.crew.find(
    (item) => item.department === "Directing",
  );
  state.directing = directing;
  if (directing) {
    return directing.name;
  } else {
    return "";
  }
};
const getGenres = () => {
  state.genresList = movieDetailRes.genres;
  return movieDetailRes.genres;
};

const getLangFullName = (lang: string) => {
  const config = useRuntimeConfig();
  const i18nOption = AppUtils.deepCloneData(
    config.public.i18n.configLocales,
  ) as {
    code: string;
    name: string;
    files: string[];
  }[];
  const originLangObj = i18nOption.find((item) => item.code == lang);
  if (originLangObj) {
    return originLangObj.name;
  } else {
    return lang;
  }
};
const getProductionCompanies = () => {
  const nameList = movieDetailRes.production_companies.map((item) => item.name);
  return nameList.join();
};

const leftTagClickFun = () => {};
const rightTagClickFun = () => {};

enum ELink {
  twitter_id = "https://x.com/",
  facebook_id = "https://www.facebook.com/",
  instagram_id = "https://www.instagram.com/",
  imdb_id = "https://www.imdb.com/title/",
}

const setMovieLink = () => {
  const cloneObj = AppUtils.deepCloneData(
    movieDetailRes.external_ids,
  ) as TExternal;
  Object.keys(cloneObj).forEach((name, ind) => {
    if (name !== "wikidata_id" && Object.values(cloneObj)[ind]) {
      state.mapList.push({
        label: name.split("_")[0],
        value: `${ELink[name]}${Object.values(cloneObj)[ind]}`,
      });
    }
  });
};
setMovieLink();

const setMovieActorName = () => {
  const cloneObj = AppUtils.deepCloneData(
    movieDetailRes.credits.cast,
  ) as TActorCast[];
  cloneObj.forEach((item) => {
    item.nickName = item.original_name;
    item.title = item.name;
    item.posterUrl = `${props.origin_href}/proxy${item.profile_path}`;
  });
  state.actorList = cloneObj;
};
setMovieActorName();

const result = (await getMovieApi(
  `movie/${movieDetailRes.id}/recommendations`,
  {
    page: 1,
  },
)) as TMovieListRes<TRecommendItem[]>;
const cloneMovieList = AppUtils.deepCloneData(
  result.results,
) as TRecommendItem[];
cloneMovieList.forEach((item) => {
  item.posterUrl = `${props.origin_href}/proxy${item.poster_path}`;
  item.moveRate = item.vote_average.toFixed(1) / 2;
});

const router = useRouter();
const movieClickFun = (movieID: string) => {
  router.push(`/movie/${movieID}`);
};

const actorClickFun = (actorId: string) => {
  console.log("actorId", actorId);
};
</script>

<template>
  <div class="movie-detail">
    <div class="salon-img">
      <NuxtImg
        :src="`${origin_href}/proxy${movieDetailRes.poster_path}`"
        alt=""
        format="webp"
      />
    </div>

    <div class="detail-link">
      <div class="detail">
        <DetailRow
          :label_1="$t('Release Date')"
          :label_2="$t('Runtime')"
          :value_1="dayjs(movieDetailRes.release_date).format('YYYY-MM-DD')"
          :value_2="transformRunTime(movieDetailRes.runtime)"
        />
        <DetailRow
          :label_1="$t('Director')"
          :label_2="$t('Budget')"
          :value_1="getCreator()"
          :value_2="setComma(movieDetailRes.budget)"
          :use_left_tag="true"
          @leftTagClickEmit="leftTagClickFun"
        />
        <DetailRow
          :label_1="$t('Revenue')"
          :label_2="$t('Genre')"
          :value_1="setComma(movieDetailRes.revenue)"
          :tag_list="getGenres()"
          :use_right_tag="true"
        />
        <DetailRow
          :label_1="$t('Status')"
          :label_2="$t('Language')"
          :value_1="movieDetailRes.status"
          :value_2="getLangFullName(movieDetailRes.original_language)"
        />
        <DetailRow
          :label_1="$t('Production')"
          :value_1="getProductionCompanies()"
        />
      </div>
      <div class="link">
        <NuxtLink
          target="_blank"
          v-for="(item, ind) in state.mapList"
          :key="ind"
          :to="item.value"
        >
          <nuxt-icon :name="item.label" filled />
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="p-10">
    <ScrollComponent
      :scroll_list="state.actorList"
      :scroll_title="$t('Cast')"
      :show_more="false"
      :show_rate="false"
      :show_nickName="true"
      @imageClickEmit="actorClickFun"
    />
    <ScrollComponent
      :scroll_list="cloneMovieList"
      :scroll_title="$t('More like this')"
      :show_more="false"
      :show_rate="true"
      :show_nickName="false"
      @imageClickEmit="movieClickFun"
    />
  </div>
</template>

<style lang="scss" scoped>
.movie-detail {
  @apply flex items-start p-10 w-4/5 mx-auto;
  height: 560px;

  @media screen and (max-width: 1440px) {
    @apply w-full;
  }

  .salon-img {
    @apply w-80;
    @apply border-4 border-primary/100;
    @apply rounded;
  }
  .detail-link {
    @apply w-full h-full flex-1;
    @apply flex flex-col;
    @apply justify-between items-start;
    @apply pl-10;
  }

  .detail {
    @apply flex-1 w-full;
    @apply flex flex-col;
  }

  .link {
    @apply flex items-center justify-between gap-4 mt-2;

    .nuxt-icon {
      @apply text-3xl cursor-pointer;
      @apply fill-white;
    }
  }
}
</style>
