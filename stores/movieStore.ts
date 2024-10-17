import { defineStore } from "pinia";
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieITem, TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

export const MovieStore = defineStore("movieStore", {
  state: () => ({
    afterSetComingList: [] as TMovieITem[],
    afterSetRateList: [] as TMovieITem[],
    afterSetPlayingList: [] as TMovieITem[],
  }),
  actions: {
    async getRateList(page: number) {
      const rateRes = (await getTMDBApi(EApiPaths.topRateList, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      if (rateRes.results.length == 0) return;
      const cloneRateData = AppUtils.deepCloneData(
        rateRes.results,
      ) as TMovieITem[];
      if (page === 1) {
        this.afterSetRateList = AppUtils.setRateNum([...cloneRateData]);
      } else {
        const cloneRateList = AppUtils.deepCloneData(this.afterSetRateList);
        this.afterSetRateList = AppUtils.setRateNum([
          ...cloneRateList,
          ...cloneRateData,
        ]);
      }
    },

    async getComingList(page: number) {
      const comingRes = (await getTMDBApi(EApiPaths.upComingList, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      if (comingRes.results.length == 0) return;
      const cloneComingData = AppUtils.deepCloneData(
        comingRes.results,
      ) as TMovieITem[];
      if (page === 1) {
        this.afterSetComingList = AppUtils.setRateNum([...cloneComingData]);
      } else {
        const cloneComingList = AppUtils.deepCloneData(this.afterSetComingList);
        this.afterSetComingList = AppUtils.setRateNum([
          ...cloneComingList,
          ...cloneComingData,
        ]);
      }
    },

    async getNowPlayingList(page: number) {
      const nowPlayingRes = (await getTMDBApi(EApiPaths.nowPlaying, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      if (nowPlayingRes.results.length == 0) return;
      const cloneNowPlayData = AppUtils.deepCloneData(
        nowPlayingRes.results,
      ) as TMovieITem[];
      if (page === 1) {
        this.afterSetPlayingList = AppUtils.setRateNum([...cloneNowPlayData]);
      } else {
        const clonePlayList = AppUtils.deepCloneData(this.afterSetPlayingList);
        this.afterSetPlayingList = AppUtils.setRateNum([
          ...clonePlayList,
          ...cloneNowPlayData,
        ]);
      }
    },
  },
});
