import { prisma } from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import CoursePlayer from "./CoursePlayer";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const session = await requireUser();
  const userId = session.user?.id;
 
  // params is async in Next 15; unwrap before use
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      lectures: {
        orderBy: { order: "asc" },
      },
      progress: {
        where: { userId },
      },
    },
  });

  if (!course) {
    return <div className="p-8">Course not found</div>;
  }

  // 🔑 Determine resume lecture
  const completedLectureIds = new Set(
    course.progress.filter(p => p.completed).map(p => p.lectureId)
  );

  // first incomplete lecture
  const resumeLecture =
    course.lectures.find(l => !completedLectureIds.has(l.id)) ??
    course.lectures[course.lectures.length - 1];

  return (
    <CoursePlayer
      courseId={course.id}
      courseTitle={course.title}
      lectures={course.lectures}
      progress={course.progress}
      initialLectureId={resumeLecture.id}
    />
  );
}
