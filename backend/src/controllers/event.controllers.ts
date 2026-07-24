import { Request, Response } from "express";
import { processEvent } from "../services/event.service";
export async function trackEvent(
  req: Request,
  res: Response
) {

  try {
    const tenantId = (req.headers["x-api-key"] as string) || req.body.tenantId || "default_tenant";
    const event = await processEvent({
      ...req.body,
      tenantId,
    });

    res.status(201).json({
      success: true,
      data: event,
    });

  } catch (error: any) {

    console.error("Error processing event:", error);

    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });

  }

}