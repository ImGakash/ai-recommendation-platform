// sdk/src/types.ts

export interface EventPayload {
  eventType: "view" | "click" | "save" | "purchase";
  entityId: string;
  category: string;
  metadata?: Record<string, any>;
}