import { useSearchMoviesQuery } from "@/features/movies/api/moviesApi";
import { MovieGrid } from "@/features/movies/ui/MovieGrid/MovieGrid";
import { SearchInput } from "@/features/movies/ui/SearchInput/SearchInput";
import { useSearchParams } from "react-router";
import s from "./SearchPage.module.css";
export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  const { data, isLoading, isError } = useSearchMoviesQuery(
    { query: searchQuery },
    { skip: !searchQuery },
  );
  return (
    <section className="container" style={{width:"100%"}}>
      <div className={s.search__container}>
        <h2>Search Results</h2>

        <SearchInput />

        {searchQuery && <p>Поиск по запросу: "{searchQuery}"</p>}

        {isLoading && <p>Загрузка...</p>}
        {isError && <p>Произошла ошибка</p>}

        {data?.results && <MovieGrid movies={data.results} />}

        {data?.results?.length === 0 && <p>Ничего не найдено</p>}
      </div>
    </section>
  );
};
