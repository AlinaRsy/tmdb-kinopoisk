import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { ZodError, ZodType } from "zod";
import { errorToast } from "@/common/utils";

export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: ZodError): FetchBaseQueryError => {
    errorToast("Zod error. Details in the console", err.issues);
    return {
      status: "CUSTOM_ERROR",
      error: "Schema validation failed",
    };
  },
});