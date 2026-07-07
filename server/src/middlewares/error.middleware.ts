import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors/AppError";
import { ApiResponse } from "../utils/apiResponse";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    ApiResponse.error(
        res,
        err.statusCode,
        err.message
    )
    return;
  }
  console.error({
    message: err.message,
    stack: err.stack,
  });

  ApiResponse.error(
    res,
    500,
    "Internal Server Error"
  )
}