"use server";

import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { revalidatePath } from "next/cache";

export async function toggleLectureProgress(lectureId: string, courseId: string) {
  const session = await requireUser();
  const userId = session.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const existing = await prisma.progress.findUnique({
    where: {
      userId_lectureId: {
        userId,
        lectureId,
      },
    },
  });

  if (existing) {
    await prisma.progress.update({
      where: { id: existing.id },
      data: {
        completed: !existing.completed,
        completedAt: existing.completed ? null : new Date(),
      },
    });
  } else {
    await prisma.progress.create({
      data: {
        userId,
        courseId,
        lectureId,
        completed: true,
        completedAt: new Date(),
      },
    });
  }

  // Revalidate the dashboard and course pages so progress updates reflect
  revalidatePath("/dashboard");
  revalidatePath(`/course/${courseId}`);
}
