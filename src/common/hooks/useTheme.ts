import { useEffect } from "react";
import { useAppSelector } from "@/common/hooks";
import { selectThemeMode } from "@/app/app-slice";

export const useTheme = () => {
  const themeMode = useAppSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("app-theme", themeMode);
  }, [themeMode]);

  return themeMode;
};