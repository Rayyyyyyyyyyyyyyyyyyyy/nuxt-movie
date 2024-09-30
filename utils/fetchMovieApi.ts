// server/utils/fetchMovieApi.ts

import { useRuntimeConfig, createError } from "#imports";

export async function fetchMovieApi(path: string, query: any) {
  const config = useRuntimeConfig();
  const apiKey = config.public.tmdbApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "No API key provided",
    });
  }

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path parameter is missing",
    });
  }

  try {
    // 發送 API 請求
    return await $fetch(path, {
      baseURL: config.public.baseURL,
      headers: { Accept: "application/json" },
      params: {
        api_key: apiKey,
        ...query,
      },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch movie data",
    });
  }
}
