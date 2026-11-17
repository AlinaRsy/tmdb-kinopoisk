import { baseApi } from "@/app/baseApi";
import { Categories } from "../lib";
import { DiscoverMoviesParams, GenresResponse, MoviesResponse, SearchMoviesParams } from "./moviesApi.types";

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
      }),
      discoverMovies: builder.query<MoviesResponse, DiscoverMoviesParams>({
        query: (params)=>({
          method: 'get',
          url: '/discover/movie',
          params
        })
      }),
      getGenres: builder.query<GenresResponse, void>({
        query: ()=>'/genre/movie/list'
      })
    };
  },
});

export const { useGetPopularMoviesQuery, useGetNowPlayingMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery, useGetMoviesByCategoryQuery, useSearchMoviesQuery, useDiscoverMoviesQuery, useGetGenresQuery } = moviesApi;
