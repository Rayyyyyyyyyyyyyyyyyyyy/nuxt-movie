import { defineEventHandler, getQuery, createError } from "h3";
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
