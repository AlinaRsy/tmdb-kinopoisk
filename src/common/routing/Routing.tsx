import { CategoriesPage } from "@/pages/Categories/ui/CategoriesPage"
import { MainPage } from "@/pages/Main/ui/MainPage/MainPage"
import { SearchPage } from "@/pages/Search/ui/SearchPage"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  CategoryMovies: '/categories/:category',
  FilteredMovies: '/filtered',
  Search: '/search',
  Favorites: '/favorites',
  NotFound: "*",
} as const

export const Routing = () => {

  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage/>}/>
      <Route path={Path.Search} element={<SearchPage/>}/>
      <Route path={Path.CategoryMovies} element={<CategoriesPage/>}/>
    </Routes>
  )
}
