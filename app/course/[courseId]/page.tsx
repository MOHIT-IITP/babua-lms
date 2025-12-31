import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import CoursePlayer from "./CoursePlayer";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const session = await requireUser();
  
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      lectures: {
        orderBy: { order: "asc" },
      },
      progress: {
        where: { userId: session.user?.id },
      },
    },
  });

  if (!course) return <div className="p-8">Course not found</div>;

  return (
    <CoursePlayer
      courseId={course.id}
      courseTitle={course.title}
      lectures={course.lectures}
      progress={course.progress}
    />
  );
}
