import { MovieSection } from "@/features/movies/ui/MovieSection/MovieSection";
import { Hero } from "../Hero/Hero";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/movies/api/moviesApi";

export const MainPage = () => {
  const { data: popular, isLoading: popLoading } = useGetPopularMoviesQuery();
  const { data: topRated, isLoading: topLoading } = useGetTopRatedMoviesQuery();
  const { data: upcoming, isLoading: upLoading } = useGetUpcomingMoviesQuery();
  const { data: nowPlaying, isLoading: nowLoading } =
    useGetNowPlayingMoviesQuery();
  return (
    <>
      <Hero />
      <div className="container">
        <MovieSection
          title="Popular Movies"
          category="popular"
          movies={popular?.results.slice(0, 6)}
          isLoading={popLoading}
        />
        <MovieSection
          title="Top Rated Movies"
          category="topRated"
          movies={topRated?.results.slice(0, 6)}
          isLoading={popLoading}
        />
        <MovieSection
          title="Upcoming Movies"
          category="upcoming"
          movies={upcoming?.results.slice(0, 6)}
          isLoading={popLoading}
        />
        <MovieSection
          title="Now Playing Movies"
          category="nowPlaying"
          movies={nowPlaying?.results.slice(0, 6)}
          isLoading={popLoading}
        />
      </div>
    </>
  );
};
