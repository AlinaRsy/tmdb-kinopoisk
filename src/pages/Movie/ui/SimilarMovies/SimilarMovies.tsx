import { useGetSimilarMoviesQuery } from "@/features/movies/api/moviesApi";
import { MovieGrid } from "@/features/movies/ui/MovieGrid/MovieGrid";
import s from "./SimilarMovies.module.css";
import { MoviesGridSkeleton } from "@/common/components/Skeleton/MovieCardSkeleton";
type Props = {
  movieId: number | null;
};
export const SimilarMovies = ({ movieId }: Props) => {
  const { data: similar, isLoading: isSimilarLoading } =
    useGetSimilarMoviesQuery({ movie_id: movieId });
  const similarMovies = similar?.results ? similar.results.slice(0, 6) : [];

  return (
    <div className={s.similarSection}>
      <h2 className={s.sectionHeader}>Similar Movies</h2>
      {isSimilarLoading ? (
        <MoviesGridSkeleton/>
      ) : similarMovies.length > 0 ? (
        <MovieGrid movies={similarMovies} />
      ) : (
        <p>No similar movies found.</p>
      )}
    </div>
  );
};
