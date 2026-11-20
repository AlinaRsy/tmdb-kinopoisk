import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi";
import { MovieGrid } from "@/features/movies/ui/MovieGrid/MovieGrid";
import { SearchInput } from "@/features/movies/ui/SearchInput/SearchInput";
import { useSearchParams } from "react-router";
import s from "./SearchPage.module.css";
import { Pagination } from "@/common/components";
import { useEffect, useState } from "react";
import { MoviesGridSkeleton } from "@/common/components/Skeleton/MovieCardSkeleton";
export const SearchPage = () => {
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    setPage(1)
  }, [searchQuery]);

  const { data, isLoading } = useSearchMoviesQuery(
    { query: searchQuery, page: page },
    { skip: !searchQuery },
  );

  const handlePageChange = (newPage: number)=>{
    setPage(newPage)
  }

  const hasQuery = Boolean(searchQuery.trim());
  const movies = hasQuery ? data?.results : [];
  const isNotFound = hasQuery && movies?.length === 0;
  return (
    <section className="container" style={{ width: "100%" }}>
      <div className={s.search__container}>
        <h2>Search Results</h2>

        <SearchInput />

        {hasQuery ? <p>Results for: "{searchQuery}"</p> : <p>Enter a movie title to start searching</p>}

        {isLoading && <MoviesGridSkeleton count={12}/>}

        {movies && movies.length > 0 && <MovieGrid movies={movies} />}

        {isNotFound && <p>No matches found for {searchQuery}</p>}
        {hasQuery && data && data.total_pages>1 && <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={handlePageChange} />}
      </div>
    </section>
  );
};
