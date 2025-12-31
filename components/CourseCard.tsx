import Link from "next/link";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string | null;
    progress: number;
  };
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="border rounded-xl p-5 hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-1">{course.title}</h2>

      <p className="text-sm text-muted-foreground mb-4">
        {course.description ?? "Structured Babua-style learning"}
      </p>

      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <p className="text-xs mt-1 text-gray-600">
          {course.progress}% completed
        </p>
      </div>

      <Link
        href={`/course/${course.id}`}
        className="text-sm font-medium underline"
      >
        {course.progress > 0 ? "Continue →" : "Start learning →"}
      </Link>
    </div>
  );
}
