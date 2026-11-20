import { Pagination } from "@/common/components";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import {
  useDiscoverMoviesQuery,
  useGetGenresQuery,
} from "@/features/movies/api/moviesApi";
import {
  resetFilters,
  selectFilters,
  setDebouncedRating,
  setMaxRating,
  setMinRating,
  setPage,
  setSortBy,
  toggleGenre,
} from "@/features/movies/model/filterSlice";
import { MovieGrid } from "@/features/movies/ui/MovieGrid/MovieGrid";
import { ChangeEvent, FormEvent, useEffect } from "react";
import s from "./FilteredPage.module.css";
import { MoviesGridSkeleton } from "@/common/components/Skeleton/MovieCardSkeleton";
export const FilteredPage = () => {
  const dispatch = useAppDispatch();
  const {
    page,
    sortBy,
    minRating,
    maxRating,
    debouncedMinRating,
    debouncedMaxRating,
    selectedGenres,
  } = useAppSelector(selectFilters);
  const { data, isLoading } = useDiscoverMoviesQuery({
    page,
    sort_by: sortBy,
    "vote_average.gte": debouncedMinRating > 0 ? debouncedMinRating : undefined,
    "vote_average.lte":
      debouncedMaxRating < 10 ? debouncedMaxRating : undefined,
    with_genres:
      selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
  });
  const { data: genres, isLoading: isGenresLoading } = useGetGenresQuery();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(setDebouncedRating({ min: minRating, max: maxRating }));
    }, 200);
    return () => clearTimeout(timerId);
  }, [minRating, maxRating, dispatch]);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value));
  };
  const handleMinRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxRating) {
      dispatch(setMinRating(value));
    }
  };

  const handleMaxRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minRating) {
      dispatch(setMaxRating(value));
    }
  };

  const handleGenreToggle = (genreId: number) => {
    dispatch(toggleGenre(genreId));
  };

  const handleReset = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetFilters());
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };
  return (
    <section className={s.filtered}>
      <div className="container">
        <div className={s.filtered__wrapper}>
          <aside className={s.filters}>
            <h4 className={s.title}>Filters / Sort</h4>
            <form onSubmit={handleReset}>
              <div className={s.formGroup}>
                <label className={s.label}>Sort by</label>
                <select
                  className={s.select}
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="popularity.desc">Popularity ↓</option>
                  <option value="popularity.asc">Popularity ↑</option>
                  <option value="vote_average.desc">Rating ↓</option>
                  <option value="vote_average.asc">Rating ↑</option>
                  <option value="primary_release_date.desc">
                    Release Date ↓
                  </option>
                  <option value="primary_release_date.asc">
                    Release Date ↑
                  </option>
                  <option value="original_title.asc">Title (A-Z)</option>
                  <option value="original_title.desc">Title (Z-A)</option>
                </select>
              </div>

              <div className={s.formGroup}>
                <label className={s.label}>
                  Rating: {minRating} — {maxRating}
                </label>
                <div className={s.rangeContainer}>
                  <div className={s.rangeField}>
                    <div className={s.rangeHeader}>
                      <span>Min</span>
                      <span>{minRating}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={minRating}
                      onChange={handleMinRatingChange}
                      className={s.rangeInput}
                    />
                  </div>

                  <div className={s.rangeField}>
                    <div className={s.rangeHeader}>
                      <span>Max</span>
                      <span>{maxRating}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={maxRating}
                      onChange={handleMaxRatingChange}
                      className={s.rangeInput}
                    />
                  </div>
                </div>
              </div>

              <div className={s.formGroup}>
                <label className={s.label}>Genres</label>
                {isGenresLoading ? (
                  <p>Loading genres...</p>
                ) : (
                  <div className={s.genresList}>
                    {genres?.genres.map((genre) => {
                      const isSelected = selectedGenres.includes(genre.id);
                      return (
                        <button
                          type="button"
                          key={genre.id}
                          className={`${s.genreBtn} ${isSelected ? s.genreBtnActive : ""}`}
                          onClick={() => handleGenreToggle(genre.id)}
                        >
                          {genre.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button type="submit" className={s.resetButton}>
                Reset filters
              </button>
            </form>
          </aside>
          <div className={s.movies__catalog}>
            {isLoading && <MoviesGridSkeleton count={12}/>}
            {data?.results && data.results.length > 0 && (
              <>
                <MovieGrid movies={data.results} />
                <Pagination
                  currentPage={page}
                  totalPages={data.total_pages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
