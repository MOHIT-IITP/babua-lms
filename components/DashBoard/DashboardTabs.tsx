"use client";

import { useState, ReactNode } from "react";

interface DashboardTabsProps {
  courseSection: ReactNode;
  guidanceSection: ReactNode;
}

export default function DashboardTabs({ courseSection, guidanceSection }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"courses" | "exclusive">("courses");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="w-full mb-5 mt-5 flex items-center justify-center">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-8 py-3 font-semibold transition-all duration-200 rounded-full text-center ${
              activeTab === "courses"
                ? "bg-violet-200 dark:bg-violet-500 text-black shadow-lg"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab("exclusive")}
            className={`px-8 py-3 font-semibold transition-all duration-200 rounded-full text-center ${
              activeTab === "exclusive"
                ? "bg-violet-200 dark:bg-violet-500 text-black shadow-lg"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Exclusive Items
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8">
        {activeTab === "courses" ? (
          courseSection
        ) : (
          guidanceSection
        )}
      </div>
    </div>
  );
}
