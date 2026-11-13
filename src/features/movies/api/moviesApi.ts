import { baseApi } from "@/app/baseApi";
import { MoviesResponse, SearchMoviesParams } from "./moviesApi.types";
import { Categories } from "../lib";

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPopularMovies: builder.query<MoviesResponse, void>({
        query: () => "/movie/popular",
      }),
      getTopRatedMovies: builder.query<MoviesResponse, void>({
        query: ()=>'/movie/top_rated',
      }),
      getUpcomingMovies: builder.query<MoviesResponse, void>({
        query: ()=>'/movie/upcoming'
      }),
      getNowPlayingMovies: builder.query<MoviesResponse, void>({
        query: ()=>'/movie/now_playing'
      }),
      getMoviesByCategory: builder.query<MoviesResponse, {category: Categories, page: number}>({
        query: ({category, page})=>({
          method: "get",
          url: `/movie/${category}`,
          params: {page}
        })
      }),
      searchMovies: builder.query<MoviesResponse, SearchMoviesParams>({
        query: (params)=>({
          method: 'get',
          url: '/search/movie',
          params
        })
      })
    };
  },
});

export const { useGetPopularMoviesQuery, useGetNowPlayingMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery, useGetMoviesByCategoryQuery, useSearchMoviesQuery } = moviesApi;
