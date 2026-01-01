import CourseSection from "@/components/DashBoard/course";
import DashboardTabs from "@/components/DashBoard/DashboardTabs";
import GuidancePage from "@/app/guidance/page";
import { requireUser } from "../lib/hooks";
import { prisma } from "@/app/lib/db";
import ContinueLearningCard from "@/components/DashBoard/ContinueLearningCard";

export default async function DashboardPage() {
  const session = await requireUser();
  const userId = session.user?.id;

  // 🔁 CONTINUE LEARNING LOGIC
// 1️⃣ Get user's latest activity
const latestProgress = await prisma.progress.findFirst({
  where: { userId },
  orderBy: { completedAt: "desc" },
  include: {
    course: {
      include: {
        lectures: { orderBy: { order: "asc" } },
        progress: {
          where: { userId },
        },
      },
    },
  },
});

let resumeCourse = null;
let resumeLecture = null;

if (latestProgress) {
  resumeCourse = latestProgress?.course;

  const completedSet = new Set(
    resumeCourse.progress
      .filter(p => p.completed)
      .map(p => p.lectureId)
  );

  resumeLecture =
    resumeCourse.lectures.find(
      l => !completedSet.has(l.id)
    ) ?? resumeCourse.lectures[resumeCourse.lectures.length - 1];
} else {
  // 2️⃣ Fallback: user never watched anything
  const firstCourse = await prisma.course.findFirst({
    include: {
      lectures: { orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });

  if (firstCourse) {
    resumeCourse = firstCourse;
    resumeLecture = firstCourse.lectures[0];
  }
}


  return (
    <div>
      <h1 className="p-7 text-4xl font-bold bg-linear-to-r from-black via-violet-600 to-purple-600 dark:from-white dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
        Welcome back, {session.user?.name} 👋
      </h1>

      {/* ✅ CONTINUE LEARNING OR GET STARTED */}
      {resumeCourse && resumeLecture ? (
        <ContinueLearningCard
          courseId={resumeCourse.id}
          courseTitle={resumeCourse.title}
          lectureId={resumeLecture.id}
          lectureTitle={resumeLecture.title}
          lectureOrder={resumeLecture.order}
        />
      ) : (
        <div className="mx-7 mb-8 rounded-2xl p-8 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-violet-500 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Start Your Learning Journey! 🚀
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose a course below to begin mastering new skills
              </p>
            </div>
          </div>
        </div>
      )}


      <DashboardTabs
        courseSection={<CourseSection />}
        guidanceSection={<GuidancePage />}
      />
    </div>
  );
}
