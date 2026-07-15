import { NextResponse } from "next/server";
import { ApiError } from "./api-error";

/**
 * Converts application errors into
 * consistent JSON responses.
 */
export function handleApiError(error: unknown) {

  console.error(error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    {
      status: 500,
    }
  );

}