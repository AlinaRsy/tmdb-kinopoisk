import { ActorsListSkeleton } from "@/common/components/Skeleton/ActorCardSkeleton";
import { IMG_BASE } from "@/common/constants";
import {
  useGetMovieCreditsQuery
} from "@/features/movies/api/moviesApi";
import s from "./Cast.module.css";
type Props = {
  movieId: number | null;
};
export const Cast = ({movieId}:Props) => {

  const { data: credits, isLoading: isCastsLoading } = useGetMovieCreditsQuery({
    movie_id: movieId,
  });


  const topCast = credits?.cast ? credits.cast.slice(0, 6) : [];

  return (
    <div className={s.castSection}>
      <h2 className={s.sectionHeader}>Cast</h2>
      {isCastsLoading ? (
        <ActorsListSkeleton/>
      ) : topCast.length > 0 ? (
        <div className={s.castGrid}>
          {topCast.map((actor) => (
            <div key={actor.id} className={s.castCard}>
              <img
                src={
                  actor.profile_path
                    ? `${IMG_BASE}${actor.profile_path}`
                    : "https://placehold.co/150x225/333/FFF?text=No+Photo"
                }
                alt={actor.name}
                className={s.actorPhoto}
              />
              <div className={s.actorInfo}>
                <h4 className={s.actorName}>{actor.name}</h4>
                <p className={s.characterName}>{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};
