import { configureStore } from "@reduxjs/toolkit";
import { appReducer, appSlice } from "./app-slice";
import { baseApi } from "./baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filtersReducer, filtersSlice } from "@/features/movies/model/filterSlice";
import { favoritesReducer, favoritesSlice } from "@/features/favorites/model/favoritesSlice";

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [filtersSlice.name]: filtersReducer,
    [favoritesSlice.name]: favoritesReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch