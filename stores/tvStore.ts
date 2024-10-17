import { defineStore } from "pinia";
import { getTMDBApi } from "~/path/to/api";
import { EApiPaths } from "~/consts/apiConst";
import type { TMovieITem, TMovieListRes } from "~/types/apiType";
import AppUtils from "~/utils/appUtils";

export const TvStore = defineStore("tvStore", {
  state: () => ({
    afterSetPopularList: [] as TMovieITem[],
    afterSetRateList: [] as TMovieITem[],
    afterSetAriringList: [] as TMovieITem[],
  }),
  actions: {
    async getPopularList(page: number) {
      const popularRes = (await getTMDBApi(EApiPaths.tvPopularList, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      if (popularRes.results.length == 0) return;

      const cloneData = AppUtils.deepCloneData(
        popularRes.results,
      ) as TMovieITem[];

      if (page === 1) {
        this.afterSetPopularList = AppUtils.setRateNum([...cloneData]);
      } else {
        const cloneList = AppUtils.deepCloneData(this.afterSetPopularList);
        this.afterSetPopularList = AppUtils.setRateNum([
          ...cloneList,
          ...cloneData,
        ]);
      }
    },

    async getRateList(page: number) {
      const rateRes = (await getTMDBApi(EApiPaths.tvTopRateList, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      const cloneData = AppUtils.deepCloneData(rateRes.results) as TMovieITem[];
      if (page === 1) {
        this.afterSetRateList = AppUtils.setRateNum([...cloneData]);
      } else {
        const cloneList = AppUtils.deepCloneData(this.afterSetRateList);
        this.afterSetRateList = AppUtils.setRateNum([
          ...cloneList,
          ...cloneData,
        ]);
      }
    },

    async getAiringTodayList(page: number) {
      const ariringRes = (await getTMDBApi(EApiPaths.tvAriring, {
        page: page,
      })) as TMovieListRes<TMovieITem>;
      const cloneData = AppUtils.deepCloneData(
        ariringRes.results,
      ) as TMovieITem[];
      if (page === 1) {
        this.afterSetAriringList = AppUtils.setRateNum([...cloneData]);
      } else {
        const cloneList = AppUtils.deepCloneData(this.afterSetAriringList);
        this.afterSetAriringList = AppUtils.setRateNum([
          ...cloneList,
          ...cloneData,
        ]);
      }
    },
  },
});
