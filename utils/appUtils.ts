import type { TMovieITem } from "~/types/apiType";

const AppUtils = {
  deepCloneData(data: any) {
    return JSON.parse(JSON.stringify(data));
  },

  transformRate(vote_rate: number) {
    const voteAverage = Number(vote_rate);
    return Number((voteAverage / 2).toFixed(1));
  },

  setRateNum(arr: TMovieITem[]): TMovieITem[] {
    arr.forEach(async (item) => {
      item.moveRate = AppUtils.transformRate(item.vote_average);
    });
    return arr;
  },
};
export default AppUtils;
