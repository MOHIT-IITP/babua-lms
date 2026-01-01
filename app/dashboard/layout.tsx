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
          <div className="w-full md:w-5/6">
            {children}
          </div>
          <div className="w-full md:w-1/6 flex flex-col mt-7 gap-6 pr-8">
            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-violet-200 uppercase tracking-wide">Current Streak</p>
                  <p className="text-3xl font-bold">{streak?.currentStreak ?? 0} days</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-violet-200">Best Streak</span>
                  <span className="font-bold">{streak?.longestStreak ?? 0} days</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
                Learning Stats
              </h3>
              
              {/* Progress Circle */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  {/* Background Circle */}
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      className="text-violet-600 dark:text-violet-500"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 56}`,
                        strokeDashoffset: `${2 * Math.PI * 56 * (1 - (coursesWithProgress.filter(c => c.progressPercent === 100).length / (coursesWithProgress.length || 1)))}`,
                        transition: 'stroke-dashoffset 0.5s ease'
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {coursesWithProgress.filter(c => c.progressPercent === 100).length}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      of {coursesWithProgress.length}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 mb-6">
                Courses Completed
              </p>

              {/* Stats List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                    <svg className="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Enrolled</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{coursesWithProgress.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {coursesWithProgress.filter(c => c.progressPercent > 0 && c.progressPercent < 100).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-violet-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">Keep Going!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Consistency is key. Learning every day builds expertise faster than you think.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}