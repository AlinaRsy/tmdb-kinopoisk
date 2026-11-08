import s from './Footer.module.css';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <p className={s.text}>
          © {year} Kinopoisk Demo · Data courtesy of TMDB.
        </p>
      </div>
    </footer>
  );
};