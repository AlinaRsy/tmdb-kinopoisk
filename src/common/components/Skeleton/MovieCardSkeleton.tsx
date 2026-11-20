import Skeleton from "react-loading-skeleton";
import s from "./MovieCardSkeleton.module.css";

export const MovieCardSkeleton = () => {
  return (
    <div className={s.card} aria-hidden="true">
      <div className={s.posterWrap}>
        <Skeleton width="100%" height="100%" borderRadius={12} />
      </div>
      <div className={s.body}>
        <Skeleton width="85%" height={18} borderRadius={6} />
        <div className={s.meta}>
          <Skeleton height={16} width={48} borderRadius={6} />
          <Skeleton height={16} width={60} borderRadius={6} />
        </div>
      </div>
    </div>
  );
};

type MoviesGridSkeletonProps = {
  count?: number;
};

export const MoviesGridSkeleton = ({ count = 6 }: MoviesGridSkeletonProps) => {
  return (
    <div className={s.grid}>
      {Array.from({ length: count }, (_, idx) => (
        <MovieCardSkeleton key={idx} />
      ))}
    </div>
  );
};