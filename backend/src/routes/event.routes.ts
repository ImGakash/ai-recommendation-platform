import { Router } from "express";
import { trackEvent } from "../controllers/event.controllers";

const router = Router();

router.post("/", trackEvent);

export default router;