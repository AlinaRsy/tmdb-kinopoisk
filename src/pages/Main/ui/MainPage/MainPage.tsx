import { MovieSection } from "@/features/movies/ui/MovieSection/MovieSection";
import { Hero } from "../Hero/Hero";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi";
import { MOVIE_CATEGORIES } from "@/common/constants";
import { Categories } from "@/features/movies/lib";

export const MainPage = () => {
  const { data: popular, isLoading: popularLoading } =
    useGetPopularMoviesQuery();
  const { data: topRated, isLoading: topRatedLoading } =
    useGetTopRatedMoviesQuery();
  const { data: upcoming, isLoading: upcomingLoading } =
    useGetUpcomingMoviesQuery();
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useGetNowPlayingMoviesQuery();

  const categoryDataMap: Record<
    string,
    { data: typeof popular; isLoading: boolean }
  > = {
    popular: { data: popular, isLoading: popularLoading },
    top_rated: { data: topRated, isLoading: topRatedLoading },
    upcoming: { data: upcoming, isLoading: upcomingLoading },
    now_playing: { data: nowPlaying, isLoading: nowPlayingLoading },
  };
  return (
    <>
      <Hero />
      <div className="container">
        {MOVIE_CATEGORIES.map((category) => {
          const currentCategory = categoryDataMap[category.key];
          return (
            <MovieSection
              key={category.key}
              title={category.label}
              category={category.key as Categories}
              movies={currentCategory?.data?.results.slice(0, 6)}
              isLoading={currentCategory?.isLoading}
            />
          );
        })}
       
      </div>
    </>
  );
};
