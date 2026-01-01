import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";

import Link from "next/link";

export default async function CourseSection() {
    const session = await requireUser();
    const userId = session.user?.id;

 const courses = await prisma.course.findMany({
  include: {
    lectures: {
      select: {
        id: true,
        title: true,
        order: true,
      },
      orderBy: { order: "asc" },
    },
    progress: {
      where: { userId },
      select: {
        lectureId: true,
        completed: true,
        completedAt: true,
      },
      orderBy: {
        completedAt: "desc",
      },
    },
  },
  orderBy: { createdAt: "asc" },
});


const coursesWithProgress = courses.map((course) => {
  const totalLectures = course.lectures.length;

  const completedProgress = course.progress.filter(p => p.completed);
  const completedLectures = completedProgress.length;

  const progressPercent =
    totalLectures === 0
      ? 0
      : Math.round((completedLectures / totalLectures) * 100);

  // ✅ LAST WATCHED
  const lastProgress = completedProgress[0];
  const lastLecture = course.lectures.find(
    (l) => l.id === lastProgress?.lectureId
  );

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    totalLectures,
    completedLectures,
    progressPercent,
    difficulty: course.difficulty,
    lastWatchedTitle: lastLecture?.title ?? null,
  };
});


  return (
    <div className="px-8 pb-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          My Courses
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Track your progress and continue where you left off
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coursesWithProgress.map((course, idx) => (
          <Link
            key={course.id}
            href={`/course/${course.id}`}
            className="block group"
            style={{ animation: `fadeInUp 0.4s ${0.1 * idx}s both` }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-violet-400 dark:hover:border-violet-600 transition-all duration-300">
              
              {/* Course Header Section */}
              <div className="p-6 pb-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>

                  {/* Title & Badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        course?.difficulty === "BEGINNER"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : course?.difficulty === "INTERMEDIATE"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}>
                        {course?.difficulty}
                      </span>
                      {course.progressPercent === 100 && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {course.description || "Master essential concepts with hands-on learning"}
                </p>
                
                {/* Last Watched */}
                {course.lastWatchedTitle && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <svg className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-500 dark:text-gray-400">
                      Last watched:
                    </span>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                      {course.lastWatchedTitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Stats & Progress Section */}
              <div className="p-6 pt-5">
                {/* Stats Row */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{course.totalLectures} lectures</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{course.completedLectures} completed</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Course Progress
                    </span>
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                      {course.progressPercent}%
                    </span>
                  </div>
                  <div className="relative h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${course.progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300">
                    {course.progressPercent === 0 ? "Start learning" : course.progressPercent === 100 ? "Review course" : "Continue learning"}
                  </span>
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
