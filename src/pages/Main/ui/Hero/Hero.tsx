import { SearchInput } from "@/features/movies/ui/SearchInput/SearchInput";
import s from "./Hero.module.css";
import { useGetPopularMoviesQuery } from "@/features/movies/api/moviesApi";
import { useMemo } from "react";
import { IMG_BASE } from "@/common/constants";

export const Hero = () => {
  const {data, isLoading} = useGetPopularMoviesQuery();

  const randomMovie = useMemo(()=>{
    const withBackdrop  = data?.results.filter((movie)=>movie.backdrop_path) ?? null;
    if (!withBackdrop) return;
    return withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
  }, [data])

  const bgStyle = randomMovie?.backdrop_path
    ? { backgroundImage: `url(${IMG_BASE}${randomMovie.backdrop_path})` }
    : undefined;

  return (
    <section className={s.hero} style={bgStyle}>
      <div className={s.overlay} />
      <div className={s.content}>
        <h1 className={s.title}>Welcome</h1>
        <p className={s.subtitle}>Browse highlighted titles from TMDB</p>
        <SearchInput />
      </div>
    </section>
  );
};