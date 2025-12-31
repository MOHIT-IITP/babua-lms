import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import Navbar from "@/components/Navbar";

import Link from "next/link";

export default async function DashboardPage() {
    const session = await requireUser();
    const userId = session.user?.id;

    const courses = await prisma.course.findMany({
        include: {
            lectures: {
                select: { id: true },
            },
            progress: {
                where: {
                    userId,
                    completed: true,
                },
                select: {
                    lectureId: true,
                },
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
  const streak = await prisma.streak.findUnique({
  where: { userId },
});


  return (
    <div>
        <Navbar/>
    <div className="p-8 min-h-screen bg-linear-to-br from-[#e0e7ff] via-[#f0fdfa] to-[#c7d2fe] dark:from-[#18181b] dark:via-[#232946] dark:to-[#1a1a2e] transition-colors duration-700">
      <h1 className="text-3xl font-bold mb-8 tracking-tight drop-shadow-lg">
        <span className="bg-linear-to-r from-black to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">Welcome back, </span>
        <span className="bg-linear-to-r from-black to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent font-extrabold">{session.user?.name}</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Courses (4/6) */}
        <div className="w-full md:w-4/6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesWithProgress.map((course, idx) => (
              <div
                key={course.id}
                className="relative border-0 rounded-2xl p-6 shadow-xl bg-linear-to-br from-white/80 to-indigo-100 dark:from-[#232946]/80 dark:to-[#1a1a2e]/80 backdrop-blur-md hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                style={{ animation: `fadeInUp 0.5s ${0.1 * idx + 0.1}s both` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-200 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h2>
                  {course.progressPercent === 100 && (
                    <span className="text-xs font-semibold text-green-800 bg-green-200 dark:text-green-200 dark:bg-green-800/30 px-2 py-0.5 rounded shadow-sm ">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 line-clamp-3">
                  {course.description}
                </p>
                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-indigo-400 via-indigo-600 to-green-400 dark:from-indigo-500 dark:via-indigo-400 dark:to-green-300 transition-all duration-700 animate-progress"
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    {course.completedLectures}/{course.totalLectures} lectures completed
                  </p>
                </div>
                <Link
                  href={`/course/${course.id}`}
                  className="inline-block text-sm font-semibold underline underline-offset-4 text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white transition-colors duration-200"
                >
                  {course.progressPercent > 0 ? "Continue →" : "Start learning →"}
                </Link>
                {/* Animated background accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20 blur-2xl animate-pulse z-0" />
              </div>
            ))}
          </div>
        </div>
        {/* Right: Streak Cards (2/6) */}
        <div className="w-full md:w-2/6 flex flex-col gap-6">
          <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-yellow-100 via-orange-200 to-pink-100 dark:from-yellow-900/40 dark:via-orange-900/30 dark:to-pink-900/30 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.04] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.1s both' }}>
            <p className="text-xs text-yellow-700 dark:text-yellow-200 font-medium mb-1 flex items-center gap-1">
              Current Streak <span className="animate-fire">🔥</span>
            </p>
            <p className="text-3xl font-extrabold text-yellow-900 dark:text-yellow-100">
              {streak?.currentStreak ?? 0}
            </p>
          </div>
          <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-indigo-100 via-blue-100 to-cyan-100 dark:from-indigo-900/40 dark:via-blue-900/30 dark:to-cyan-900/30 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.04] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.2s both' }}>
            <p className="text-xs text-indigo-700 dark:text-indigo-200 font-medium mb-1">Longest Streak</p>
            <p className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-100">
              {streak?.longestStreak ?? 0}
            </p>
          </div>
          <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-green-100 via-lime-100 to-emerald-100 dark:from-green-900/40 dark:via-lime-900/30 dark:to-emerald-900/30 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.04] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.3s both' }}>
            <p className="text-xs text-green-700 dark:text-green-200 font-medium mb-1">Courses</p>
            <p className="text-3xl font-extrabold text-green-900 dark:text-green-100">
              {coursesWithProgress.length}
            </p>
          </div>
          <div className="relative rounded-xl p-5 shadow-lg bg-linear-to-br from-purple-100 via-pink-100 to-fuchsia-100 dark:from-purple-900/40 dark:via-pink-900/30 dark:to-fuchsia-900/30 backdrop-blur-md animate-fade-in streak-card overflow-hidden group hover:scale-[1.04] hover:shadow-2xl transition-all duration-300" style={{ animation: 'fadeInUp 0.5s 0.4s both' }}>
            <p className="text-xs text-purple-700 dark:text-purple-200 font-medium mb-1">Completed</p>
            <p className="text-3xl font-extrabold text-purple-900 dark:text-purple-100">
              {coursesWithProgress.filter(c => c.progressPercent === 100).length}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
