import { MovieGrid } from '@/features/movies/ui/MovieGrid/MovieGrid'
import s from './FavoritesPage.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectFavorites } from '@/features/favorites/model/favoritesSlice'
export const FavoritesPage = ()=>{
  const favoritesMovies = useAppSelector(selectFavorites);
  return(
    <section className={s.favorites}>
      <div className="container">
        <p></p>
        <div className={s.favorites__container}>
          <h2 className={s.title}>
            Favorites 
          </h2>
          {
            favoritesMovies.length ? <MovieGrid movies={favoritesMovies}/> : <p>Add movies to favorites to see them on this page.</p>
          }
          
        </div>

      </div>
    </section>
  )
}