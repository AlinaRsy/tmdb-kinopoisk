import { Path } from "@/common/routing";
import { ThemeToggle } from "@/features/theme-toggle/ui/ThemeToggle";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/images/logo.svg";
import s from "./Header.module.css";
const NAV_ITEMS = [
  { path: Path.Main, label: "Main" },
  { path: Path.CategoryMovies, label: "Category Movies" },
  { path: Path.FilteredMovies, label: "Filtered Movies" },
  { path: Path.Search, label: "Search" },
  { path: Path.Favorites, label: "Favorites" },
];

export const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__inner}>
          <Link to="/" className={s.logo}>
            <img src={logo} alt="tmdb-kinopoisk" className={s.logoImg} />
          </Link>

          <nav className={s.nav}>
            {NAV_ITEMS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `${s.link} ${isActive ? s.linkActive : ""}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
