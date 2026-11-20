import { CategoriesPage } from "@/pages/Categories/ui/CategoriesPage"
import { FavoritesPage } from "@/pages/Favorites/ui/FavoritesPage"
import { FilteredPage } from "@/pages/Filtered/ui/FilteredPage"
import { MainPage } from "@/pages/Main/ui/MainPage/MainPage"
import { MoviePage } from "@/pages/Movie/ui/MoviePage"
import { NotFoundPage } from "@/pages/NotFound/ui/NotFound"
import { SearchPage } from "@/pages/Search/ui/SearchPage"
import { Route, Routes } from "react-router"
import { Path } from "./paths"



export const Routing = () => {

  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage/>}/>
      <Route path={Path.Search} element={<SearchPage/>}/>
      <Route path={Path.CategoryMovies} element={<CategoriesPage/>}/>
      <Route path={Path.FilteredMovies} element={<FilteredPage/>}/>
      <Route path={Path.Favorites} element={<FavoritesPage/>}/>
      <Route path={Path.Movie} element={<MoviePage/>}/>
      <Route path={Path.NotFound} element={<NotFoundPage/>}/>
    </Routes>
  )
}
