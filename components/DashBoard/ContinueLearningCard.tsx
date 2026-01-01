import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContinueLearningCard({
  courseId,
  courseTitle,
  lectureId,
  lectureTitle,
  lectureOrder,
}: {
  courseId: string;
  courseTitle: string;
  lectureId: string;
  lectureTitle: string;
  lectureOrder: number;
}) {
  return (
    <div className="rounded-2xl p-6 shadow-lg bg-linear-to-br from-white to-violet-100 dark:from-[#1e1e2e] dark:to-[#2a2a40]">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
        Continue Learning
      </p>

      <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
        {courseTitle}
      </h3>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Lecture {lectureOrder}: {lectureTitle}
      </p>

      <Link href={`/course/${courseId}?lectureId=${lectureId}`}>
        <Button>
          Resume →
        </Button>
      </Link>
    </div>
  );
}
