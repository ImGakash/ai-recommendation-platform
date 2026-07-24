import { Router } from "express";
import {
  addEntity,
  fetchEntities,
} from "../controllers/entity.controller";

const router = Router();

router.post("/", addEntity);

router.get("/", fetchEntities);

export default router;