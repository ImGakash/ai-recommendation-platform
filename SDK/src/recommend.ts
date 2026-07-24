// sdk/src/recommend.ts

import { getCurrentUser } from "./user";
import { get } from "./http";

export async function getRecommendations() {

  const userId = getCurrentUser();

  return await get(
    `/recommendations/${userId}`
  );

}