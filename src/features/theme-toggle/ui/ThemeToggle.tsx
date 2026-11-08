import { changeThemeModeAC, selectThemeMode } from "@/app/app-slice";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import s from "./ThemeToggle.module.css";

export const ThemeToggle = ()=>{
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  return(
     <button
        className={s.themeBtn}
        onClick={() =>
          dispatch(
            changeThemeModeAC({
              themeMode: themeMode === "light" ? "dark" : "light",
            }),
          )
        }
        aria-label="Toggle theme"
        title={
          themeMode === "light"
            ? "Включить тёмную тему"
            : "Включить светлую тему"
        }
      >
        {themeMode === "light" ? "🌙" : "☀️"}
      </button>
  )
}