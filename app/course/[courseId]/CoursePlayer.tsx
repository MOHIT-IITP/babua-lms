"use client";

import { useEffect, useRef } from "react";
import { updateDailyStreak } from "@/app/lib/streak";

import { useState, useTransition } from "react";
import { toggleLectureProgress } from "./action";
import { Button } from "@/components/ui/button";
import Link from "next/link";


type Lecture = {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  order: number;
};

type Progress = {
  lectureId: string;
  completed: boolean;
};

export default function CoursePlayer({
  courseId,
  courseTitle,
  lectures,
  progress,
  initialLectureId,
}: {
  courseId: string;
  courseTitle: string;
  lectures: Lecture[];
  progress: Progress[];
  initialLectureId: string;
})  {
  const [activeLecture, setActiveLecture] = useState(
  lectures.find(l => l.id === initialLectureId) ?? lectures[0]
);
  const [isPending, startTransition] = useTransition();

  // ✅ LOCAL state (THIS FIXES EVERYTHING)
  const [completedSet, setCompletedSet] = useState<Set<string>>(
    new Set(progress.filter(p => p.completed).map(p => p.lectureId))
  );

  const toggle = (lectureId: string) => {
    // 1️⃣ Optimistic UI update
    setCompletedSet(prev => {
      const next = new Set(prev);
      next.has(lectureId) ? next.delete(lectureId) : next.add(lectureId);
      return next;
    });

    // 2️⃣ Persist in DB
    startTransition(async () => {
      await toggleLectureProgress(lectureId, courseId);
    });
  };
  // eslint-disable-next-line react-hooks/purity
  const startTimeRef = useRef<number>(Date.now());

useEffect(() => {
  return () => {
    const minutesSpent = Math.floor(
      (Date.now() - startTimeRef.current) / 60000
    );

    if (minutesSpent >= 1) {
      updateDailyStreak(minutesSpent);
    }
  };
}, []);


  const completedCount = completedSet.size;
  const totalCount = lectures.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex  h-[100vh] bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 dark:from-violet-950 dark:via-gray-900 dark:to-purple-950">
      {/* LEFT - Sidebar */}
      <aside className="w-80 h-full  bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 p-5 overflow-y-auto shadow-xl">
        {/* Course Title */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white tracking-tight">
            {courseTitle}
          </h2>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>{completedCount} of {totalCount} completed</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lecture List */}
        <ul className="space-y-2">
          {lectures.map((lecture) => {
            const isActive = lecture.id === activeLecture.id;
            const isDone = completedSet.has(lecture.id);

            return (
              <li
                key={lecture.id}
                onClick={() => setActiveLecture(lecture)}
                className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                  ${isActive 
                    ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {/* Custom Checkbox */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(lecture.id);
                  }}
                  className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                    ${isDone 
                      ? "bg-emerald-500 border-emerald-500" 
                      : isActive 
                        ? "border-white/50 hover:border-white" 
                        : "border-gray-300 dark:border-gray-600 hover:border-violet-500"
                    }
                    ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  {isDone && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Lecture Info */}
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-sm font-medium block truncate ${
                      isDone && !isActive ? "line-through opacity-60" : ""
                    }`}
                  >
                    {lecture.order}. {lecture.title}
                  </span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* RIGHT - Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* <div className="border border-red-600 p-4">
          <p>Debug: description = `{activeLecture.description ?? "NULL/UNDEFINED"}`</p>
          <p>Type: {typeof activeLecture.description}</p>
        </div> */}
        <div className="max-w-5xl mx-auto">
          {/* Video Title */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                Lecture {activeLecture.order}
              </span>
              {completedSet.has(activeLecture.id) && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Completed
                </span>
              )}
            </div>
            <div className="flex flex-row justify-between ">

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {activeLecture.title}
            </h1>
            <Link  href={"/dashboard"}>
            <Button className="cursor-pointer" >BACK</Button>
            </Link>
            </div>
          </div>

          {/* Video Player Container */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 mb-8 shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
            <iframe
              key={activeLecture.id}
              src={activeLecture.videoUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Description Card */}
          {activeLecture.description && (
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                About this lecture
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {activeLecture.description}
              </p>
            </div>
          )}

          {/* Mark as Complete Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => toggle(activeLecture.id)}
              disabled={isPending}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2
                ${completedSet.has(activeLecture.id)
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  : "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                }
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {completedSet.has(activeLecture.id) ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Incomplete
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mark as Complete
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
