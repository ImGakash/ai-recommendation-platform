import { AIRecommendationSDK } from "../../../SDK/src/index";
import type { EventPayload } from "../../../SDK/src/types";

export interface LogEntry {
  id: string;
  timestamp: string;
  type: "init" | "user" | "event" | "recommendation" | "error";
  title: string;
  details: Record<string, any>;
}

type LogListener = (logs: LogEntry[]) => void;

class SDKManager {
  private sdk: AIRecommendationSDK;
  private logs: LogEntry[] = [];
  private listeners: Set<LogListener> = new Set();
  public isInitialized: boolean = false;
  public currentUserId: string | null = null;
  public currentEndpoint: string = "http://localhost:5000";
  public currentApiKey: string = "demo_tenant_key_prod_99";

  constructor() {
    this.sdk = new AIRecommendationSDK();
  }

  public subscribe(listener: LogListener) {
    this.listeners.add(listener);
    listener([...this.logs]);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const updated = [...this.logs];
    this.listeners.forEach((fn) => fn(updated));
  }

  public addLog(type: LogEntry["type"], title: string, details: Record<string, any>) {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      title,
      details,
    };
    this.logs = [newLog, ...this.logs].slice(0, 50); // Keep last 50 logs
    this.notify();
  }

  public clearLogs() {
    this.logs = [];
    this.notify();
  }

  public initSDK(endpoint: string = this.currentEndpoint, apiKey: string = this.currentApiKey) {
    try {
      this.currentEndpoint = endpoint;
      this.currentApiKey = apiKey;
      this.sdk.init({ endpoint, apiKey });
      this.isInitialized = true;
      this.addLog("init", "SDK Initialized", { endpoint, apiKey });
    } catch (err: any) {
      this.addLog("error", "SDK Initialization Failed", { error: err?.message || String(err) });
      throw err;
    }
  }

  public identifyUser(userId: string) {
    if (!this.isInitialized) {
      this.initSDK();
    }
    this.sdk.identifyUser(userId);
    this.currentUserId = userId;
    this.addLog("user", `User Identified: ${userId}`, { userId });
  }

  public async trackEvent(payload: Omit<EventPayload, "userId">) {
    if (!this.isInitialized) {
      this.initSDK();
    }
    if (!this.currentUserId) {
      this.identifyUser("demo_user_alex");
    }

    try {
      this.addLog("event", `Tracking Event: ${payload.eventType.toUpperCase()}`, {
        userId: this.currentUserId,
        ...payload,
      });

      const response = await this.sdk.trackEvent(payload);
      this.addLog("event", `Event Tracked Successfully`, { response });
      return response;
    } catch (err: any) {
      this.addLog("error", `Failed to Track Event`, { error: err?.message || String(err) });
      throw err;
    }
  }

  public async getRecommendations() {
    if (!this.isInitialized) {
      this.initSDK();
    }
    if (!this.currentUserId) {
      this.identifyUser("demo_user_alex");
    }

    try {
      this.addLog("recommendation", `Fetching AI Recommendations`, { userId: this.currentUserId });
      const response = await this.sdk.getRecommendations();
      this.addLog("recommendation", `Received Recommendations`, { response });
      return response;
    } catch (err: any) {
      this.addLog("error", `Failed to Fetch Recommendations`, { error: err?.message || String(err) });
      throw err;
    }
  }
}

export const sdkManager = new SDKManager();
