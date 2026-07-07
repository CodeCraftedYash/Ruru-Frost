import { Router } from "express";
import { healthController } from "../controllers/healthController";

const router = Router();

// Define your endpoints here
router.get("/health", healthController);

export default router;