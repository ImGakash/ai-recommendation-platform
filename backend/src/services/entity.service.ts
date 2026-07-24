import prisma from "../lib/prisma";

interface EntityPayload {
  tenantId: string;
  entityId: string;
  title: string;
  category: string;
  metadata?: any;
}

export async function createEntity(data: EntityPayload) {
  return await prisma.entity.create({
    data,
  });
}

export async function getAllEntities() {
  return await prisma.entity.findMany();
}