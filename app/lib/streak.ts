"use server";

import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";

export async function updateDailyStreak(minutesSpent: number) {
  console.log("⏱ Minutes spent:", minutesSpent);

  if (minutesSpent < 1) {
    console.log("❌ Not enough time for streak");
    return;
  }

  const session = await requireUser();
  const userId = session.user?.id;

  if (!userId) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const streak = await prisma.streak.findUnique({
    where: { userId },
  });
  console.log("📊 Existing streak:", streak);

  if (!streak) {
     console.log("🔥 Creating first streak");
    await prisma.streak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActive: new Date(),
      },
    });
    return;
  }

  const lastActive = streak.lastActive
    ? new Date(streak.lastActive)
    : null;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Already counted today
  if (lastActive && lastActive >= today) {

       console.log("⚠️ Streak already counted today");
   return;
  }

  // Continued streak
  if (lastActive && lastActive >= yesterday) {

    const newStreak = streak.currentStreak + 1;
    console.log("🔥 Continuing streak");
    await prisma.streak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(streak.longestStreak, newStreak),
        lastActive: new Date(),
      },
    });
  } else {
    // Streak broken
    console.log("💀 Streak broken, resetting");
    await prisma.streak.update({
      where: { userId },
      data: {
        currentStreak: 1,
        longestStreak: Math.max(streak.longestStreak, 1),
        lastActive: new Date(),
      },
    });
  }
}
