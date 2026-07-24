import type { SDKConfig } from "./config";
import { setConfig } from "./config";
import { identifyUser } from "./user";
import { trackEvent } from "./track";
import { getRecommendations } from "./recommend";
import type { EventPayload } from "./types";

export class AIRecommendationSDK {
  /**
   * Initialize SDK
   */
  init(config: SDKConfig) {
    setConfig(config);
  }

  /**
   * Set current user
   */
  identifyUser(userId: string) {
    identifyUser(userId);
  }

  /**
   * Track user behavior
   */
  async trackEvent(event: Omit<EventPayload, "userId">) {
    return await trackEvent(event);
  }

  /**
   * Fetch recommendations
   */
  async getRecommendations() {
    return await getRecommendations();
  }
}