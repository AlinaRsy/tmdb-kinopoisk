import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { errorToast } from "./errorToast"
import { isErrorWithProperty } from "./isErrorWithProperty"

export const handleErrors = (error: FetchBaseQueryError) => {
  if (!error) return

  switch (error.status) {
    case "FETCH_ERROR":
    case "PARSING_ERROR":
    case "CUSTOM_ERROR":
    case "TIMEOUT_ERROR":
      errorToast(error.error)
      break

    case 400:
    case 401:
    case 403:
    case 404:
    case 429:
      if (
        isErrorWithProperty(error.data, "status_message") &&
        typeof error.data.status_message === "string"
      ) {
        errorToast(error.data.status_message)
      } else {
        errorToast(JSON.stringify(error.data))
      }
      break

    default:
      if (typeof error.status === "number" && error.status >= 500 && error.status < 600) {
        errorToast("Server error occurred. Please try again later.", error)
      } else {
        errorToast("Some error occurred")
      }
  }
}