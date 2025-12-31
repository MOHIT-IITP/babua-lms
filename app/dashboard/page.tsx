import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome back, {session.user?.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesWithProgress.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >
           <div className="flex items-center justify-between mb-1">
  <h2 className="text-lg font-semibold">
    {course.title}
  </h2>

  {course.progressPercent === 100 && (
<span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded">
  Completed
</span>
  )}
</div>

            <p className="text-sm text-muted-foreground mb-4">
              {course.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all"
                  style={{ width: `${course.progressPercent}%` }}
                />
              </div>
              <p className="text-xs mt-1 text-gray-600">
                {course.completedLectures}/{course.totalLectures} lectures completed
              </p>
            </div>

            <Link
              href={`/course/${course.id}`}
              className="text-sm font-medium underline"
            >
              {course.progressPercent > 0 ? "Continue →" : "Start learning →"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
