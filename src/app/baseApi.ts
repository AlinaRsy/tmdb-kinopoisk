import { handleErrors } from "@/common/utils/handleErrors";
import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { ZodError, ZodType } from "zod";

type ZodExtraOptions = {
  responseSchema?: ZodType;
  catchSchemaFailure?: (err: ZodError) => FetchBaseQueryError;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = await rawBaseQuery(args, api, extraOptions);
    if (result.error) {
      handleErrors(result.error);
      return result;
    }

    const zodOptions = extraOptions as ZodExtraOptions | undefined;

    if (zodOptions?.responseSchema && result.data !== undefined) {
      const parsed = zodOptions.responseSchema.safeParse(result.data);

      if (!parsed.success) {
        console.error("Zod validation issues:", parsed.error.issues);

        if (zodOptions.catchSchemaFailure) {
          return { error: zodOptions.catchSchemaFailure(parsed.error) };
        }

        return {
          error: {
            status: "CUSTOM_ERROR",
            error: "Schema validation failed",
          } satisfies FetchBaseQueryError,
        };
      }

      return { ...result, data: parsed.data };
    }

    return result;
  },
  endpoints: () => ({}),
});
