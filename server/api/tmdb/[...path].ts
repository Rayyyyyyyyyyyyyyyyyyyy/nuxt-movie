import { defineEventHandler, getQuery } from "h3"; // 根據框架引入相應的函數
import { fetchMovieApi } from "~/utils/fetchMovieApi";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = event.context.params;

  if (!params || !params.path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path parameter is missing",
    });
  }
  return await fetchMovieApi(params.path, query);
});
