import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";

import Link from "next/link";

export default async function CourseSection() {
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

  return (
    <div className="p-8 min-h-screen transition-colors duration-700">
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
      </div>
    </div>
  );
}
