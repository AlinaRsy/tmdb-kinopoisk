import { NavLink, useParams } from "react-router";
import s from "./CategoriesPage.module.css";
import { MOVIE_CATEGORIES } from "@/common/constants";
import { MovieGrid } from "@/features/movies/ui/MovieGrid/MovieGrid";
import { useGetMoviesByCategoryQuery } from "@/features/movies/api/moviesApi";
import { Categories } from "@/features/movies/lib";
import { useEffect, useState } from "react";
import { Pagination } from "@/common/components";
import { MoviesGridSkeleton } from "@/common/components/Skeleton/MovieCardSkeleton";
export const CategoriesPage = () => {
  const { category = "popular" } = useParams<{ category: Categories }>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [category]);
  const { data, isLoading } = useGetMoviesByCategoryQuery({ category, page });

  const currentCategory =
    MOVIE_CATEGORIES.find((c) => c.key === category)?.label ||
    "Select category";

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <section className="container">
      <div className={s.categories__container}>
        <div className={s.categories}>
          {MOVIE_CATEGORIES.map((category) => (
            <NavLink
              className={({ isActive }) =>
                `${s.tab} ${isActive ? s.activeTab : ""}`
              }
              to={`/categories/${category.key}`}
              key={category.key}
            >
              {category.label}
            </NavLink>
          ))}
        </div>
        <h2 className={s.title}>{currentCategory}</h2>
        {isLoading ? (
          <MoviesGridSkeleton count={12} />
        ) : (
          data && (
            <>
              <MovieGrid movies={data.results} />
              <Pagination
                currentPage={page}
                totalPages={data.total_pages}
                onPageChange={handlePageChange}
              />
            </>
          )
        )}
      </div>
    </section>
  );
};
