import prisma from "../lib/prisma";

export async function getRecommendations(userId: string) {

  // Get user's interests
  const profiles = await prisma.profile.findMany({
    where: {
      userId,
    },
    orderBy: {
      score: "desc",
    },
  });

  if (profiles.length === 0) {
    return [];
  }

  // Top 3 categories
  const topCategories = profiles
    .slice(0, 3)
    .map((profile) => profile.category);

  // Find matching entities
  const recommendations = await prisma.entity.findMany({
    where: {
      category: {
        in: topCategories,
      },
    },
  });

  if (recommendations.length === 0) {
    return profiles.slice(0, 3).map((p) => ({
      category: p.category,
      score: p.score,
      reason: `High user interest score (${p.score}) in ${p.category}`,
    }));
  }

  return recommendations;
}