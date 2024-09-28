// ~/composables/useTmdb.js

export const getMoviePosterUrl = async (movieId: string) => {
  const config = useRuntimeConfig();
  const API_KEY = config.public.tmdbApiKey;
  const BASE_URL = "https://image.tmdb.org/t/p/";

  const res = await $fetch(`${BASE_URL}w500${movieId}`, {
    responseType: "blob",
  });
  // @ts-ignore
  return URL.createObjectURL(res);
};
