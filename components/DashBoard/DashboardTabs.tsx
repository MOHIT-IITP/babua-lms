"use client";

import { useState, ReactNode } from "react";

interface DashboardTabsProps {
  courseSection: ReactNode;
}

export default function DashboardTabs({ courseSection }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"courses" | "exclusive">("courses");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="w-full mb-8 flex items-center justify-center">
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
          <div className="flex items-center justify-center min-h-[400px] bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                Exclusive Items
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Coming Soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
