import { baseApi } from "@/app/baseApi";
import { Categories } from "../lib";
import {
  CreditsResponse,
  creditsResponseSchema,
  DiscoverMoviesParams,
  GenresResponse,
  genresResponseSchema,
  MovieDetailsResponse,
  movieDetailsResponseSchema,
  MoviesResponse,
  moviesResponseSchema,
  SearchMoviesParams,
} from "./moviesApi.types";
import { withZodCatch } from "@/common/utils/withZodCatch";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPopularMovies: builder.query<MoviesResponse, void>({
        query: () => "/movie/popular",
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      getTopRatedMovies: builder.query<MoviesResponse, void>({
        query: () => "/movie/top_rated",
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      getUpcomingMovies: builder.query<MoviesResponse, void>({
        query: () => "/movie/upcoming",
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      getNowPlayingMovies: builder.query<MoviesResponse, void>({
        query: () => "/movie/now_playing",
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      getMoviesByCategory: builder.query<
        MoviesResponse,
        { category: Categories; page: number }
      >({
        query: ({ category, page }) => ({
          method: "get",
          url: `/movie/${category}`,
          params: { page },
        }),
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      searchMovies: builder.query<MoviesResponse, SearchMoviesParams>({
        query: (params) => ({
          method: "get",
          url: "/search/movie",
          params,
        }),
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      discoverMovies: builder.query<MoviesResponse, DiscoverMoviesParams>({
        query: (params) => ({
          method: "get",
          url: "/discover/movie",
          params,
        }),
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
      getGenres: builder.query<GenresResponse, void>({
        query: () => "/genre/movie/list",
        extraOptions: withZodCatch(genresResponseSchema),
      }),
      getMovieDetails: builder.query<
        MovieDetailsResponse,
        { movie_id: number | null }
      >({
        query: ({ movie_id }) => ({
          method: "get",
          url: `/movie/${movie_id}`,
        }),
        extraOptions: withZodCatch(movieDetailsResponseSchema),
      }),
      getMovieCredits: builder.query<
        CreditsResponse,
        { movie_id: number | null }
      >({
        query: ({ movie_id }) => `/movie/${movie_id}/credits`,
        extraOptions: withZodCatch(creditsResponseSchema),
      }),
      getSimilarMovies: builder.query<
        MoviesResponse,
        { movie_id: number | null }
      >({
        query: ({ movie_id }) => `/movie/${movie_id}/similar`,
        extraOptions: withZodCatch(moviesResponseSchema),
      }),
    };
  },
});

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetMoviesByCategoryQuery,
  useSearchMoviesQuery,
  useDiscoverMoviesQuery,
  useGetGenresQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetMovieCreditsQuery
} = moviesApi;
