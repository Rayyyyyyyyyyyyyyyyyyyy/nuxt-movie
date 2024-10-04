import { hash as ohash } from "ohash";
import { LRUCache } from "lru-cache";

const promiseCache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 小時
});

export async function _getTMDBApi(url: string, params: any): Promise<any> {
  const nuxtApp = useNuxtApp();

  // 確保語言參數存在
  if (params.language == null) {
    const locale = nuxtApp.$i18n.locale;
    params.language = unref(locale);
  }

  // 調用 `/api/movie` 路由來進行 API 請求
  return await $fetch(`/api/tmdb/${url}`, {
    params,
  });
}

export function getTMDBApi(url: string, params: any): Promise<any> {
  const hash = ohash([url, params]);
  const state = useState<any>(hash, () => null);

  // 如果已經有緩存的數據，直接返回
  if (state.value) return Promise.resolve(state.value);

  // 如果緩存中沒有該請求，則發起請求並緩存結果
  if (!promiseCache.has(hash)) {
    const movieApiPromise = _getTMDBApi(url, params)
      .then((res) => {
        state.value = res;
        return res;
      })
      .catch((e) => {
        promiseCache.delete(hash); // 請求失敗時刪除緩存
        throw e;
      });

    promiseCache.set(hash, movieApiPromise); // 緩存請求的 Promise
  }

  return promiseCache.get(hash)!; // 返回緩存的 Promise
}
