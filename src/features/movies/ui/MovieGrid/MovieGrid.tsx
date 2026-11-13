import { Movie } from '../../api/moviesApi.types'
import { MovieCard } from '../MovieCard/MovieCard'
import s from './MovieGrid.module.css'
type Props = {
  movies: Movie[]
}
export const MovieGrid = ({movies}:Props)=>{
  return(
     <div className={s.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}