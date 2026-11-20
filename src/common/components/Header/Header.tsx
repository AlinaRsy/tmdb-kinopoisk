import { Path } from "@/common/routing/paths";
import { ThemeToggle } from "@/features/theme-toggle/ui/ThemeToggle";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../../../assets/images/logo.svg";
import s from "./Header.module.css";
const NAV_ITEMS = [
  { path: Path.Main, label: "Main" },
  { path: "/categories/popular", label: "Category Movies" },
  { path: Path.FilteredMovies, label: "Filtered Movies" },
  { path: Path.Search, label: "Search" },
  { path: Path.Favorites, label: "Favorites" },
];

export const Header = () => {
  const location = useLocation();
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__inner}>
          <Link to="/" className={s.logo}>
            <img src={logo} alt="tmdb-kinopoisk" className={s.logoImg} />
          </Link>

          <nav className={s.nav}>
            {NAV_ITEMS.map(({ path, label }) => {
              const isCategoriesRoute =
                path.startsWith("/categories") &&
                location.pathname.startsWith("/categories");

              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => {
                    const active = isCategoriesRoute || isActive;
                    return `${s.link} ${active ? s.linkActive : ""}`;
                  }}
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
