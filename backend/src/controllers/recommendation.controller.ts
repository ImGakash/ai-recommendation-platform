import { Request, Response } from "express";
import { getRecommendations } from "../services/recommendation.service";

export async function fetchRecommendations(
  req: Request,
  res: Response
) {

  try {

    const { userId } = req.params;

    const recommendations =
      await getRecommendations(userId);

    res.json({
      success: true,
      data: recommendations,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
    });

  }

}