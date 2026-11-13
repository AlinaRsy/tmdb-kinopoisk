import { Path } from "@/common/routing";
import { Movie } from "../../api/moviesApi.types";
import { Link } from "react-router";
import s from "./MoviesSection.module.css";
import { MovieCard } from "../MovieCard/MovieCard";
import { Categories } from "../../lib";
type Props = {
  title: string;
  category: Categories;
  movies?: Movie[];
  isLoading?: boolean;
};
export const MovieSection = ({ title, category, movies, isLoading }: Props) => {
  return (
    <section className={s.section}>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <Link className={s.link} to={`categories/${category}`}>
          View More →
        </Link>
      </div>

      <div className={s.grid}>
        {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
};
