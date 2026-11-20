import * as z from "zod";
export const movieSchema = z.object({
  id: z.number().int().default(0),
  adult: z.boolean().default(true),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number().int()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number().default(0),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean().default(true),
  vote_average: z.number().default(0),
  vote_count: z.number().int().default(0),
});

export const moviesResponseSchema = z.object({
  page: z.number().int().default(0),
  results: z.array(movieSchema),
  total_pages: z.number().int().default(0),
  total_results: z.number().int().default(0),
});

export const searchMoviesParamsSchema = z.object({
  query: z.string().min(1, "Поле query обязательно для заполнения"),
  include_adult: z.boolean().default(false).optional(),
  language: z.string().default("en-US").optional(),
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
});

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
});

export const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

export const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const spokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

export const movieDetailsResponseSchema = movieSchema
  .omit({ genre_ids: true })
  .extend({
    backdrop_path: z.string().nullable(),
    belongs_to_collection: z
      .object({
        id: z.number(),
        name: z.string(),
        poster_path: z.string().nullable(),
        backdrop_path: z.string().nullable(),
      })
      .nullable()
      .optional(),
    budget: z.number(),
    genres: z.array(genreSchema),
    homepage: z.string().nullable().optional(),
    imdb_id: z.string().nullable().optional(),
    origin_country: z.array(z.string()).optional(),
    production_companies: z.array(productionCompanySchema),
    production_countries: z.array(productionCountrySchema),
    release_date: z.string(),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(spokenLanguageSchema),
    status: z.string(),
    tagline: z.string().nullable().optional(),
  });

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const creditsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(castMemberSchema),
});

export type Movie = z.infer<typeof movieSchema>;
export type MoviesResponse = z.infer<typeof moviesResponseSchema>;
export type SearchMoviesParams = z.infer<typeof searchMoviesParamsSchema>;
export type DiscoverMoviesParams = z.infer<typeof discoverMoviesParamsSchema>;
export type CastMember = z.infer<typeof castMemberSchema>;
export type CreditsResponse = z.infer<typeof creditsResponseSchema>;
export type GenresResponse = z.infer<typeof genresResponseSchema>;
export type MovieDetailsResponse = z.infer<typeof movieDetailsResponseSchema>;
