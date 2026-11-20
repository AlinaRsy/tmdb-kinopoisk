import { IMG_BASE } from "@/common/constants";
import { useGetMovieDetailsQuery } from "@/features/movies/api/moviesApi";
import { useNavigate, useParams } from "react-router";
import { Cast } from "./Cast/Cast";
import s from "./MoviePage.module.css";
import { SimilarMovies } from "./SimilarMovies/SimilarMovies";
import { MovieDetailsSkeleton } from "@/common/components/Skeleton/MovieDetailsSkeleton";
export const MoviePage = () => {
  const { id } = useParams();
  const movieId = id ? +id : null;
  const navigate = useNavigate();

  const { data: movie, isLoading: isMovieLoading } = useGetMovieDetailsQuery({
    movie_id: movieId,
  });

  if (isMovieLoading) {
    return (
      <div className="container">
        <MovieDetailsSkeleton />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container">
        <p>Movie not found.</p>
      </div>
    );
  }

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "";

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getRatingClass = (rating: number) => {
    if (rating >= 7) return s.ratingGreen;
    if (rating >= 5) return s.ratingYellow;
    return s.ratingRed;
  };
  return (
    <section className={s.movie}>
      <div className="container">
        <button className={s.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={s.movie__container}>
          <div className={s.mainInfo}>
            <div className={s.posterWrapper}>
              {movie.poster_path ? (
                <img
                  src={`${IMG_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  className={s.poster}
                />
              ) : (
                <div className={s.posterPlaceholder}>No Poster</div>
              )}
            </div>

            <div className={s.details}>
              <h1 className={s.title}>{movie.title}</h1>

              <div className={s.meta}>
                {releaseYear && <span className={s.year}>{releaseYear}</span>}
                {movie.runtime ? (
                  <span className={s.runtime}>
                    {formatRuntime(movie.runtime)}
                  </span>
                ) : null}
                {movie.vote_average ? (
                  <div
                    className={`${s.rating} ${getRatingClass(movie.vote_average)}`}
                  >
                    ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 0}
                  </div>
                ) : null}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className={s.genres}>
                  {movie.genres.map((genre: { id: number; name: string }) => (
                    <span key={genre.id} className={s.genreTag}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              <p className={s.overview}>
                {movie.overview || "No description available."}
              </p>
            </div>
          </div>

          <Cast movieId={movieId} />
          <SimilarMovies movieId={movieId} />
        </div>
      </div>
    </section>
  );
};
