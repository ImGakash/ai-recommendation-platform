export interface SDKConfig {
  apiKey: string;
  endpoint: string;
}

let config: SDKConfig | null = null;

export function setConfig(newConfig: SDKConfig) {
  config = newConfig;
}

export function getConfig() {
  if (!config) {
    throw new Error("SDK not initialized.");
  }

  return config;
}