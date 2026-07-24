let currentUserId: string | null = null;

export function identifyUser(userId: string) {
  currentUserId = userId;
}

export function getCurrentUser() {
  if (!currentUserId) {
    throw new Error("No user identified.");
  }

  return currentUserId;
}