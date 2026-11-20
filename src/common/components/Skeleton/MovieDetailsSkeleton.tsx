import Skeleton from "react-loading-skeleton";
import { ActorsListSkeleton } from "./ActorCardSkeleton";
import s from "./MovieDetailsSkeleton.module.css";

export const MovieDetailsSkeleton = () => {
  return (
    <div className={s.page} aria-hidden="true">
      <div className={s.content}>
        <div className={s.posterWrap}>
          <Skeleton height="100%" borderRadius={14} />
        </div>

        <div className={s.details}>
          <Skeleton height={36} width="65%" borderRadius={8} />
          <Skeleton height={20} width="45%" borderRadius={6} />

          <div className={s.genres}>
            <Skeleton height={28} width={84} borderRadius={999} />
            <Skeleton height={28} width={96} borderRadius={999} />
            <Skeleton height={28} width={76} borderRadius={999} />
          </div>

          <div className={s.stats}>
            <Skeleton height={22} width={110} borderRadius={6} />
            <Skeleton height={22} width={110} borderRadius={6} />
            <Skeleton height={22} width={110} borderRadius={6} />
          </div>

          <div className={s.overview}>
            <Skeleton count={3} height={16} borderRadius={6} />
            <Skeleton height={16} width="72%" borderRadius={6} />
          </div>
        </div>
      </div>

      <div className={s.castSection}>
        <Skeleton height={24} width={180} borderRadius={6} />
        <ActorsListSkeleton count={6} />
      </div>
    </div>
  );
};