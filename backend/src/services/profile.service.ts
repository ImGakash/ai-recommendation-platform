import prisma from "../lib/prisma";

const EVENT_WEIGHTS: Record<string, number> = {
  view: 1,
  click: 3,
  save: 5,
  purchase: 10,
};

export async function updateUserProfile(
  userId: string,
  category: string,
  eventType: string
) {
  const score = EVENT_WEIGHTS[eventType] || 0;

  const existingProfile = await prisma.profile.findUnique({
    where: {
      userId_category: {
        userId,
        category,
      },
    },
  });

  if (existingProfile) {
    await prisma.profile.update({
      where: {
        userId_category: {
          userId,
          category,
        },
      },
      data: {
        score: existingProfile.score + score,
      },
    });
  } else {
    await prisma.profile.create({
      data: {
        userId,
        category,
        score,
      },
    });
  }
}