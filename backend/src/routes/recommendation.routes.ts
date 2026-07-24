import { Router } from "express";
import { fetchRecommendations } from "../controllers/recommendation.controller";

const router = Router();

router.get("/:userId", fetchRecommendations);

export default router;