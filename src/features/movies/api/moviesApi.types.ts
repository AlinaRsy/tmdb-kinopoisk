import * as z from 'zod'
export const movieSchema = z.object({
  id: z.number().int().default(0),
  adult: z.boolean().default(true),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number().int()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number().default(0),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean().default(true),
  vote_average: z.number().default(0),
  vote_count: z.number().int().default(0),
})

export const moviesResponseSchema = z.object({
  page: z.number().int().default(0),
  results: z.array(movieSchema),
  total_pages: z.number().int().default(0),
  total_results: z.number().int().default(0),
})

export const searchMoviesParamsSchema = z.object({
  query: z.string().min(1, "Поле query обязательно для заполнения"),
  include_adult: z.boolean().default(false).optional(),
  language: z.string().default('en-US').optional(),
  primary_release_year: z.string().optional(),
  page: z.number().int().default(1).optional(),
  region: z.string().optional(),
  year: z.string().optional(),
});

export const discoverMoviesParamsSchema = z.object({
page: z.number().optional(),
  sort_by: z.string().optional(),
  "vote_average.gte": z.number().optional(),
  "vote_average.lte": z.number().optional(),
  with_genres: z.string().optional(),
})

export type Movie = z.infer<typeof movieSchema>
export type MoviesResponse = z.infer<typeof moviesResponseSchema>
export type SearchMoviesParams = z.infer<typeof searchMoviesParamsSchema>;
export type DiscoverMoviesParams = z.infer<typeof discoverMoviesParamsSchema>;
export type GenresResponse = {
  genres: { id: number; name: string }[];
};