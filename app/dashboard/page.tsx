import CourseSection from "@/components/DashBoard/course";
import DashboardTabs from "@/components/DashBoard/DashboardTabs";
import GuidancePage from "@/app/guidance/page";
import { requireUser } from "../lib/hooks";

export default async function DashboardPage() {
  const user = await requireUser();
  return (
    <div>
      <h1 className="p-7">Welcome, back {user?.user?.name}</h1>
      <DashboardTabs courseSection={<CourseSection />} guidanceSection={<GuidancePage />} />
    </div>
  );
}
