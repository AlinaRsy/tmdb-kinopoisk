import { Link } from "react-router";
import { Path } from "@/common/routing";
import s from "./NotFound.module.css";

export const NotFoundPage = () => {
  return (
    <section className="container">
      <div className={s.container}>
        <h1 className={s.errorCode}>404</h1>
        <h2 className={s.title}>Page not found</h2>
        <p className={s.description}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link to={Path.Main} className={s.homeButton}>
          Back to Main
        </Link>
      </div>
    </section>
  );
};