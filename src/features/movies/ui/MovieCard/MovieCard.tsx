import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { IMG_BASE } from "@/common/constants";
import s from "./MovieCard.module.css";
import { Movie } from "../../api/moviesApi.types";
import { Path } from "@/common/routing";

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  // const dispatch = useAppDispatch();
  // const isFavorite = useAppSelector((state) =>
  //   state.favorites.ids.includes(movie.id)
  // );

  // функция для цвета рейтинга
  const getRatingClass = (rating: number) => {
    if (rating >= 7) return s.ratingGreen;
    if (rating >= 5) return s.ratingYellow;
    return s.ratingRed;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch(toggleFavorite(movie.id));
  };

  return (
    <article className={s.card}>
      <Link to={`${Path.CategoryMovies}`} className={s.link}>
        <div className={s.posterWrapper}>
          {movie.poster_path ? (
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className={s.poster}
            />
          ) : (
            <div className={s.posterPlaceholder}>
              <span>No Poster</span>
            </div>
          )}

          <div className={`${s.rating} ${getRatingClass(movie.vote_average)}`}>
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 0}
          </div>

          <button
            // className={`${s.favoriteBtn} ${isFavorite ? s.isFavorite : ""}`}
            className={`${s.favoriteBtn}`}
            onClick={handleFavoriteClick}
            // aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            // title={isFavorite ? "В избранном" : "В избранное"}
          >
            {/* {isFavorite ? "❤️" : "🤍"} */}
            {"🤍"}
          </button>
        </div>

        <h3 className={s.title} title={movie.title}>
          {movie.title}
        </h3>
      </Link>
    </article>
  );
};
