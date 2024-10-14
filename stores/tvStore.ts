import { defineStore } from "pinia";
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieITem, TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

export const TvStore = defineStore("tvStore", {
  state: () => ({
    afterSetRateList: [] as TMovieITem[],
    afterSetComingList: [] as TMovieITem[],
    afterSetPlayingList: [] as TMovieITem[],
  }),
  actions: {
    async getRateList(page: number) {
      const rateRes = (await getTMDBApi(EApiPaths.tvPopularList, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      const cloneRateData = AppUtils.deepCloneData(
        rateRes.results,
      ) as TMovieITem[];
      this.afterSetRateList = AppUtils.setRateNum(cloneRateData);
    },

    async getComingList(page: number) {
      const comingRes = (await getTMDBApi(EApiPaths.tvTopRateList, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      const cloneComingData = AppUtils.deepCloneData(
        comingRes.results,
      ) as TMovieITem[];
      this.afterSetComingList = AppUtils.setRateNum(cloneComingData);
    },

    async getNowPlayingList(page: number) {
      const nowPlayingRes = (await getTMDBApi(EApiPaths.tvAriring, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      const cloneNowPlayData = AppUtils.deepCloneData(
        nowPlayingRes.results,
      ) as TMovieITem[];
      this.afterSetPlayingList = AppUtils.setRateNum(cloneNowPlayData);
    },
  },
});
