export interface EventPayload {
  userId: string;
  tenantId: string;
  eventType: "view" | "click" | "save" | "purchase";
  entityId: string;
  category: string;
  metadata?: Record<string, any>;
}