// sdk/src/track.ts

import type { EventPayload } from "./types";
import { getCurrentUser } from "./user";
import { getConfig } from "./config";
import { post } from "./http";

export async function trackEvent(
  event: EventPayload
) {
  const config = getConfig();

  return await post("/events", {
    userId: getCurrentUser(),
    tenantId: config.apiKey,
    ...event,
  });

}