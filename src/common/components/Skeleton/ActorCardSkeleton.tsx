import Skeleton from "react-loading-skeleton";
import s from "./ActorCardSkeleton.module.css";

export const ActorCardSkeleton = () => {
  return (
    <div className={s.card} aria-hidden="true">
      <div className={s.avatarWrap}>
        <Skeleton height="100%" borderRadius={12} />
      </div>
      <div className={s.info}>
        <Skeleton height={16} width="80%" borderRadius={6} />
        <Skeleton height={14} width="60%" borderRadius={6} />
      </div>
    </div>
  );
};

type ActorsListSkeletonProps = {
  count?: number;
};

export const ActorsListSkeleton = ({ count = 6 }: ActorsListSkeletonProps) => {
  return (
    <div className={s.list}>
      {Array.from({ length: count }, (_, idx) => (
        <ActorCardSkeleton key={idx} />
      ))}
    </div>
  );
};