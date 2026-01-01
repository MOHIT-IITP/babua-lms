import CourseSection from "@/components/DashBoard/course";
import DashboardTabs from "@/components/DashBoard/DashboardTabs";
import GuidancePage from "@/app/guidance/page";
import { requireUser } from "../lib/hooks";

export default async function DashboardPage() {
  const user = await requireUser();
  return (
    <div>
      <h1 className="p-7 text-4xl font-bold bg-linear-to-r from-black via-violet-600 to-purple-600 dark:from-white dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
        Welcome back, {user?.user?.name} 👋
      </h1>
      <DashboardTabs courseSection={<CourseSection />} guidanceSection={<GuidancePage />} />
    </div>
  );
}
