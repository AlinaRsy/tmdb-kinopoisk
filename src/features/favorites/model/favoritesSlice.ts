import { FAVORITES_KEY } from "@/common/constants";
import { Movie } from "@/features/movies/api/moviesApi.types";
import { createSlice } from "@reduxjs/toolkit";

const getMoviesFromStorage = (): Movie[]=>{
  const movies = localStorage.getItem(FAVORITES_KEY);
  return movies ? JSON.parse(movies) : [];
}

const setMoviesToStorage = (movies: Movie[])=>{
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies))
}

type FavoritesState = {
  items: Movie[]
}
const initialState: FavoritesState = {
  items: getMoviesFromStorage()
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorites: (state, action)=>{
      const isExist = state.items.some((item)=>item.id===action.payload.id);
      if(isExist){
        state.items = state.items.filter((item)=>item.id!==action.payload.id);
      }else{
        state.items.push(action.payload)
      }
      setMoviesToStorage(state.items);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      setMoviesToStorage(state.items);
    },
  },
  selectors: {
    selectFavorites: (state)=>state.items,
    selectIsFavorite: (state, movieId)=>state.items.some((item)=>item.id===movieId)
  }
})

export const {toggleFavorites,removeFavorite} = favoritesSlice.actions;
export const {selectFavorites,selectIsFavorite} = favoritesSlice.selectors;
export const favoritesReducer = favoritesSlice.reducer;