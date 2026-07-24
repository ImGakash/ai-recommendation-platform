import { Request, Response } from "express";
import {
  createEntity,
  getAllEntities,
} from "../services/entity.service";

export async function addEntity(
  req: Request,
  res: Response
) {
  try {
    const entity = await createEntity(req.body);

    res.status(201).json({
      success: true,
      data: entity,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to create entity",
    });

  }
}

export async function fetchEntities(
  req: Request,
  res: Response
) {

  const entities = await getAllEntities();

  res.json({
    success: true,
    data: entities,
  });

}