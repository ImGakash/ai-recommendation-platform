import prisma from "../lib/prisma";
import { updateUserProfile } from "./profile.service";

export async function processEvent(event: {
  userId: string;
  tenantId: string;
  eventType: string;
  entityId: string;
  category: string;
  metadata?: any;
}) {

  // Ensure entity exists in catalog for recommendation querying
  try {
    await prisma.entity.upsert({
      where: { entityId: event.entityId },
      update: {
        category: event.category,
        title: event.metadata?.title || event.entityId,
        metadata: event.metadata || {},
      },
      create: {
        tenantId: event.tenantId,
        entityId: event.entityId,
        title: event.metadata?.title || event.entityId,
        category: event.category,
        metadata: event.metadata || {},
      },
    });
  } catch (e) {
    // ignore entity upsert error if non-critical
  }

  const savedEvent = await prisma.event.create({
    data: event,
  });

  await updateUserProfile(
    event.userId,
    event.category,
    event.eventType
  );

  return savedEvent;
}