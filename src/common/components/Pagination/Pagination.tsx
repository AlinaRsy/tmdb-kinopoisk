import { getPaginationPages } from "@/common/utils";
import s from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {

  const maxPages = Math.min(totalPages, 500);

  if (maxPages <= 1) return null;

  const pages = getPaginationPages(currentPage, maxPages);

  return (
    <nav className={s.pagination}>
      <button
        className={s.btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
      <div className={s.pagesList}>
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className={s.dots}>
                ...
              </span>
            );
          }
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              className={`${s.pageBtn} ${isCurrent ? s.active : ""}`}
              onClick={() => onPageChange(+page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className={s.btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
      >
        →
      </button>
    </nav>
  );
};