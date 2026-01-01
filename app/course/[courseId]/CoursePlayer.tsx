"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { updateDailyStreak } from "@/app/lib/streak";
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
}) {
  const [activeLecture, setActiveLecture] = useState(
    lectures.find(l => l.id === initialLectureId) ?? lectures[0]
  );

  const [isPending, startTransition] = useTransition();

  // ✅ Completed lectures state
  const [completedSet, setCompletedSet] = useState<Set<string>>(
    new Set(progress.filter(p => p.completed).map(p => p.lectureId))
  );

  // 🔒 LOCK LOGIC
  const maxCompletedOrder = Math.max(
    0,
    ...lectures
      .filter(l => completedSet.has(l.id))
      .map(l => l.order)
  );

  const maxUnlockedOrder = maxCompletedOrder + 1;

  // ✅ Only allow forward completion
  const completeLecture = (lectureId: string, lectureOrder: number) => {
    if (lectureOrder > maxUnlockedOrder) return;
    if (completedSet.has(lectureId)) return;

    setCompletedSet(prev => {
      const next = new Set(prev);
      next.add(lectureId);
      return next;
    });

    startTransition(async () => {
      await toggleLectureProgress(lectureId, courseId);
    });
  };

  // ⏱️ Streak tracking
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    return () => {
      const minutesSpent = Math.floor(
        (Date.now() - (startTimeRef.current ?? 0)) / 60000
      );

      if (minutesSpent >= 1) {
        updateDailyStreak(minutesSpent);
      }
    };
  }, []);

  const completedCount = completedSet.size;
  const totalCount = lectures.length;
  const progressPercent =
    totalCount > 0
      ? Math.round((completedCount / totalCount) * 100)
      : 0;

  return (
    <div className="flex h-[100vh] bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      {/* LEFT SIDEBAR */}
      <aside className="w-80 bg-white/80 border-r p-5 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">{courseTitle}</h2>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span>
              {completedCount} / {totalCount} completed
            </span>
            <span className="font-semibold text-emerald-600">
              {progressPercent}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lecture List */}
        <ul className="space-y-2">
          {lectures.map((lecture) => {
            const isActive = lecture.id === activeLecture.id;
            const isDone = completedSet.has(lecture.id);
            const isLocked = lecture.order > maxUnlockedOrder;

            return (
              <li
                key={lecture.id}
                onClick={() => {
                  if (isLocked) return;
                  setActiveLecture(lecture);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition
                  ${isActive ? "bg-violet-600 text-white" : "hover:bg-gray-100"}
                  ${isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {/* Checkbox */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    completeLecture(lecture.id, lecture.order);
                  }}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center
                    ${isDone ? "bg-emerald-500 border-emerald-500" : "border-gray-300"}
                  `}
                >
                  {isDone && (
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      fill="none"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <span className="text-sm truncate">
                  {lecture.order}. {lecture.title}
                </span>

                {isLocked && (
                  <span className="ml-auto text-xs text-gray-400">
                    Locked
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {activeLecture.title}
            </h1>
            <Link href="/dashboard">
              <Button>Back</Button>
            </Link>
          </div>

          {/* Video */}
          <div className="aspect-video mb-6 bg-black rounded-xl overflow-hidden">
            <iframe
              key={activeLecture.id}
              src={activeLecture.videoUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Description */}
          {activeLecture.description && (
            <div className="bg-white rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-2">
                About this lecture
              </h3>
              <p className="text-gray-700">
                {activeLecture.description}
              </p>
            </div>
          )}

          {/* Complete Button */}
          <div className="flex justify-end">
            <button
              onClick={() =>
                completeLecture(activeLecture.id, activeLecture.order)
              }
              disabled={completedSet.has(activeLecture.id)}
              className={`px-6 py-3 rounded-xl font-semibold
                ${
                  completedSet.has(activeLecture.id)
                    ? "bg-gray-200 text-gray-500"
                    : "bg-emerald-500 text-white hover:opacity-90"
                }
              `}
            >
              {completedSet.has(activeLecture.id)
                ? "Completed"
                : "Mark as Complete"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
