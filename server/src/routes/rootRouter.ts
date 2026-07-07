import { Router } from "express";
import healthRoutes from "./healthRoutes";

const rootRouter = Router();

rootRouter.use("/", healthRoutes); 

export default rootRouter;