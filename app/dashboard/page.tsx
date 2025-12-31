import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await requireUser();

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">
        Welcome back, {session.user?.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold mb-1">
              {course.title}
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              {course.description}
            </p>

            <div className="mb-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-black w-0" />
              </div>
              <p className="text-xs mt-1 text-gray-500">
                0% completed
              </p>
            </div>

            <Link
              href={`/course/${course.id}`}
              className="text-sm font-medium underline"
            >
              Start learning →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
