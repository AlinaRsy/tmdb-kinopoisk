export const getPaginationPages = (currentPage: number, totalPages: number): (number | '...')[] => {

  const maxPages = Math.min(totalPages, 500);
  if (maxPages <= 1) return [];
  if (maxPages <= 7) {
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }

  const delta = 1; 
  const range: number[] = [];
  const rangeWithDots: (number | '...')[] = [];

  for (let i = 1; i <= maxPages; i++) {
    if (
      i === 1 ||
      i === maxPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  let prev: number | undefined;

  for (const i of range) {
    if (prev) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (i - prev !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
};