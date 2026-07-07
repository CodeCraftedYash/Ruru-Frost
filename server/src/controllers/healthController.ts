import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse";

//checks if the server is live or not

export function healthController(req: Request, res: Response) {
  ApiResponse.success(res, "Server is running");
}
