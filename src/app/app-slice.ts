import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";
const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem("app-theme");
  if (saved === "dark" || saved === "light") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: getInitialTheme() as ThemeMode,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create)=>({
     changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
});
export const {selectThemeMode} = appSlice.selectors;
export const {changeThemeModeAC} = appSlice.actions;
export const appReducer = appSlice.reducer;

