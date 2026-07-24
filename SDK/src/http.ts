// sdk/src/http.ts

import { getConfig } from "./config";

export async function post(url: string, body: any) {
  const config = getConfig();

  const response = await fetch(`${config.endpoint}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey
    },
    body: JSON.stringify(body)
  });

  return response.json();
}

export async function get(url: string) {
  const config = getConfig();

  const response = await fetch(`${config.endpoint}${url}`);

  return response.json();
}