import Navbar from "@/components/Navbar";
import React from "react";
import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();
  const userId = session.user?.id;

  const courses = await prisma.course.findMany({
    include: {
      lectures: { select: { id: true } },
      progress: {
        where: { userId, completed: true },
        select: { lectureId: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const coursesWithProgress = courses.map((course) => {
    const totalLectures = course.lectures.length;
    const completedLectures = course.progress.length;
    const progressPercent =
      totalLectures === 0
        ? 0
        : Math.round((completedLectures / totalLectures) * 100);
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      totalLectures,
      completedLectures,
      progressPercent,
    };
  });
  const streak = await prisma.streak.findUnique({ where: { userId } });

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e0e7ff] via-[#f0fdfa] to-[#c7d2fe] dark:from-[#18181b] dark:via-[#232946] dark:to-[#1a1a2e] transition-colors duration-700">
      <main>
        <Navbar />
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-4/6">
            {children}
          </div>
          <div className="w-full md:w-2/6 flex flex-col mt-7 gap-6">
            <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-white via-blue-50 to-blue-100 dark:from-blue-900/60 dark:via-blue-950/70 dark:to-blue-950/80 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.1s both' }}>
              <p className="text-xs text-blue-700 dark:text-blue-200 font-medium mb-1 flex items-center gap-1">Current Streak</p>
              <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">{streak?.currentStreak ?? 0}</p>
            </div>
            <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-white via-blue-50 to-blue-100 dark:from-blue-900/60 dark:via-blue-950/70 dark:to-blue-950/80 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.2s both' }}>
              <p className="text-xs text-blue-700 dark:text-blue-200 font-medium mb-1">Longest Streak</p>
              <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">{streak?.longestStreak ?? 0}</p>
            </div>
            <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-white via-blue-50 to-blue-100 dark:from-blue-900/60 dark:via-blue-950/70 dark:to-blue-950/80 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.3s both' }}>
              <p className="text-xs text-blue-700 dark:text-blue-200 font-medium mb-1">Courses</p>
              <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">{coursesWithProgress.length}</p>
            </div>
            <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-white via-blue-50 to-blue-100 dark:from-blue-900/60 dark:via-blue-950/70 dark:to-blue-950/80 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.4s both' }}>
              <p className="text-xs text-blue-700 dark:text-blue-200 font-medium mb-1">Completed</p>
              <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">{coursesWithProgress.filter(c => c.progressPercent === 100).length}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}