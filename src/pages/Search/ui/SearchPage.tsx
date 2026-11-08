import { useSearchMoviesQuery } from '@/features/movies/api/moviesApi';
import { SearchInput } from '@/features/movies/ui/SearchInput/SearchInput';
import { useSearchParams } from 'react-router';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('query') || '';

  const { data, isLoading, isError } = useSearchMoviesQuery(
    { query: searchQuery },
    { skip: !searchQuery }
  );
  return (
    <div>
      <h1>Результаты поиска</h1>
      
      <SearchInput />

      {searchQuery && <p>Поиск по запросу: "{searchQuery}"</p>}

      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Произошла ошибка</p>}

      {data?.results && (
        <div className="movies-grid">
          {data.results.map((movie) => (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}

      {data?.results?.length === 0 && <p>Ничего не найдено</p>}
    </div>
  );
};