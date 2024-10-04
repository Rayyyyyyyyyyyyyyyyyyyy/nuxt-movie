<script setup lang="ts">
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import {
  TExternal,
  TOption,
  TPersonCastITem,
  TPersonCrewITem,
  TPersonnel,
  TProfileITem,
} from "~/types/apiType";
import AppUtils from "~/utils/appUtils";
import { ELink, showIconLinkList } from "~/consts/AppConst";
import dayjs from "dayjs";

const route = useRoute();
const personId = route.params.id;
let originHref = "http://localhost:3000";
const url = useRequestURL();

if (import.meta.client) {
  originHref = url.origin;
}

const state = reactive({
  activeName: "know",
  mapList: [] as TOption[],
});

const genreRes: TPersonnel = await getTMDBApi(
  `${EApiPaths.personDetail}${personId}`,
  {
    append_to_response: "images,combined_credits,external_ids",
    include_image_language: "en",
  },
);

const setMovieLink = () => {
  const cloneObj = AppUtils.deepCloneData(genreRes.external_ids) as TExternal;
  let optionList = [] as TOption[];

  Object.keys(cloneObj).forEach((name, ind) => {
    if (showIconLinkList.includes(name) && Object.values(cloneObj)[ind]) {
      optionList.push({
        label: name.split("_")[0],
        value: `${ELink[name]}${Object.values(cloneObj)[ind]}`,
      });
    }
  });
  optionList.forEach((item) => {
    if (item.label == "imdb") {
      const baseImdbUrl = AppUtils.deepCloneData(item.value);
      item.value = baseImdbUrl.replace("title", "name");
    }
  });
  state.mapList = optionList;
};
setMovieLink();

const sortData = (arr) => {
  const gotUrPathData = arr.filter((item) => item.poster_path);
  gotUrPathData.forEach((item) => {
    item.moveRate = item.vote_average.toFixed(1) / 2;
  });
  return gotUrPathData.sort(
    (x, y) => new Date(y.release_date) - new Date(x.release_date),
  );
};

const castList = sortData(
  AppUtils.deepCloneData(genreRes.combined_credits.cast),
) as TPersonCastITem[];
const crewList = sortData(
  AppUtils.deepCloneData(genreRes.combined_credits.crew),
) as TPersonCrewITem[];

const router = useRouter();
const goCastDetail = (rowItem: TPersonCastITem) => {
  if (rowItem.media_type == "movie") {
    router.push(`/movie/${rowItem.id.toString()}`);
  } else {
    router.push(`/tv/${rowItem.id.toString()}`);
  }
};
const goCrewDetail = (rowItem: TPersonCrewITem) => {
  if (rowItem.media_type == "movie") {
    router.push(`/movie/${rowItem.id.toString()}`);
  } else {
    router.push(`/tv/${rowItem.id.toString()}`);
  }
};

const cloneList = AppUtils.deepCloneData(
  genreRes.images.profiles,
) as TProfileITem[];
const profileList = cloneList.map((item) => {
  return {
    ...item,
    fileUrl: `${originHref}/proxy/${item.file_path}`,
  };
});
</script>

<template>
  <div class="content">
    <div class="profile">
      <div class="avatar">
        <NuxtImg
          :src="`${originHref}/proxy${genreRes.profile_path}`"
          alt=""
          format="webp"
        />
      </div>

      <div class="profile-detail">
        <p class="name">{{ genreRes.name }}</p>
        <p class="detail">
          {{ genreRes.biography ? genreRes.biography : $t("(no biography)") }}
        </p>
        <div class="detail-row">
          <div class="label">{{ $t("Known For") }}</div>
          <div class="value">{{ genreRes.known_for_department }}</div>
        </div>
        <div class="detail-row">
          <div class="label">{{ $t("Place of birth") }}</div>
          <div class="value">{{ genreRes.place_of_birth }}</div>
        </div>
        <div class="detail-row">
          <div class="label">{{ $t("Birthday") }}</div>
          <div class="value">{{ genreRes.birthday }}</div>
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

    <el-tabs v-model="state.activeName" class="tab-content">
      <el-tab-pane :label="$t('Known For')" name="know">
        <div class="know-list">
          <div class="know-item" v-for="(item, ind) in castList" :key="ind">
            <MovieCard
              :origin_href="originHref"
              :movie_detail="item"
              item_type="cast"
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Credits')" name="credits">
        <div class="credit">
          <div class="credit-item" v-if="castList.length">
            <div class="title">{{ $t("Acting Credits") }}</div>

            <div
              class="short-movie-detail"
              v-for="(item, ind) in castList"
              :key="ind"
              @click="goCastDetail(item)"
            >
              <div class="year">{{ dayjs(item.release_date).year() }}</div>
              <div class="name">{{ item.title }}</div>
              <div class="who">
                {{
                  $t("as {character}", {
                    character: item.character,
                  })
                }}
              </div>
            </div>
          </div>
          <div class="credit-item" v-if="crewList.length">
            <div class="title">{{ $t("Production Credits") }}</div>

            <div
              class="short-movie-detail"
              v-for="(item, ind) in crewList"
              :key="ind"
              @click="goCrewDetail(item)"
            >
              <div class="year">
                {{
                  item.release_date !== ""
                    ? dayjs(item.release_date).year()
                    : "Unknown year"
                }}
              </div>
              <div class="name">{{ item.title || item.name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Person Photos')" name="photo">
        <div class="photo-tab-value">
          <div class="title">
            <p class="text-xl">{{ $t("Person Photos") }}</p>
            <p class="sub-title">
              {{
                $t("{numberOfImages} Images", {
                  numberOfImages: profileList.length,
                })
              }}
            </p>
          </div>
          <div class="photo-list">
            <NuxtImg
              v-for="(item, ind) in profileList"
              :key="ind"
              :src="item.fileUrl"
              alt=""
              format="webp"
              class="image-item"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.content {
  @apply p-10 text-white;
  @apply flex flex-col;

  .profile {
    @apply w-full mx-auto mb-10;
    @apply grid grid-rows-1 grid-cols-2;

    .avatar {
      @apply w-full flex justify-end;
      img {
        @apply w-72 mr-4 object-contain;
      }
    }
    .profile-detail {
      @apply flex flex-col w-4/5;

      .name {
        @apply text-3xl mb-4;
      }
      .detail {
        @apply opacity-60 text-sm;
      }

      .detail-row {
        @apply mt-4;

        .value {
          @apply opacity-60;
        }
      }
      .link {
        @apply flex items-center  gap-4 mt-10;

        .nuxt-icon {
          @apply text-3xl cursor-pointer;
          @apply fill-white;
        }
      }
    }
  }
}
.know-list {
  @apply grid auto-rows-auto grid-cols-4 mt-4;
}
.credit {
  @apply text-white;

  .credit-item {
    @apply mt-4;
    @apply flex flex-col;

    .title {
      @apply text-xl mb-4;
    }
    .short-movie-detail + .short-movie-detail {
      @apply mt-4;
    }
    .short-movie-detail {
      @apply bg-primary-dark p-4 cursor-pointer;

      .who {
        @apply opacity-60;
      }
    }
  }
}
.photo-tab-value {
  @apply p-4 text-white;

  .title {
    @apply flex items-end;

    .sub-title {
      @apply opacity-60 ml-2 text-sm;
    }
  }
  .photo-list {
    @apply grid auto-rows-auto grid-cols-4 gap-4;

    .image-item {
      &:hover {
        @apply transition duration-150 ease-in-out;
        transform: scale(1.1);
      }
    }
  }
}
</style>
