import { createSlice } from "@reduxjs/toolkit";

type FiltersState = {
  page: number;
  sortBy: string;
  minRating: number;
  maxRating: number;
  debouncedMinRating: number;
  debouncedMaxRating: number;
  selectedGenres: number[];
};

const initialState: FiltersState = {
  page: 1,
  sortBy: "popularity.desc",
  minRating: 0,
  maxRating: 10,
  debouncedMinRating: 0,
  debouncedMaxRating: 10,
  selectedGenres: [],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    setMaxRating: (state, action) => {
      state.maxRating = action.payload;
    },
    setDebouncedRating: (state, action) => {
      state.debouncedMinRating = action.payload.min;
      state.debouncedMaxRating = action.payload.max;
      state.page = 1;
    },
    toggleGenre: (state, action) => {
      const genreId = action.payload;
      if (state.selectedGenres.includes(genreId)) {
        state.selectedGenres = state.selectedGenres.filter(
          (id) => id !== genreId,
        );
      } else {
        state.selectedGenres.push(genreId);
      }
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
 selectors: {
    selectFilters: (state) => state,
  },
});
export const {
  setSortBy,
  setMinRating,
  setMaxRating,
  setDebouncedRating,
  toggleGenre,
  setPage,
  resetFilters,
} = filtersSlice.actions;
export const {selectFilters} = filtersSlice.selectors
export const filtersReducer = filtersSlice.reducer;
