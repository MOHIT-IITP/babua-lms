"use client";

import { useState, useTransition } from "react";
import { toggleLectureProgress } from "./action";

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
}: {
  courseId: string;
  courseTitle: string;
  lectures: Lecture[];
  progress: Progress[];
}) {
  const [activeLecture, setActiveLecture] = useState<Lecture>(lectures[0]);
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

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* LEFT */}
      <aside className="w-80 border-r p-4 overflow-y-auto">
        <h2 className="font-semibold mb-4">{courseTitle}</h2>

        <ul className="space-y-2">
          {lectures.map((lecture) => {
            const isActive = lecture.id === activeLecture.id;
            const isDone = completedSet.has(lecture.id);

            return (
              <li
                key={lecture.id}
                onClick={() => setActiveLecture(lecture)}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer
                  ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}
                `}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  disabled={isPending}
                  onChange={() => toggle(lecture.id)}
                  onClick={(e) => e.stopPropagation()}
                />

                <span
                  className={`text-sm ${
                    isDone ? "line-through opacity-70" : ""
                  }`}
                >
                  {lecture.order}. {lecture.title}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* RIGHT */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-4">
          {activeLecture.title}
        </h1>

        <div className="aspect-video w-full rounded overflow-hidden bg-black mb-6">
          <iframe
            key={activeLecture.id}
            src={activeLecture.videoUrl}
            className="w-full h-full"
            allowFullScreen
          />
        </div>

        <p className="text-sm text-gray-600">
          {activeLecture.description}
        </p>
      </main>
    </div>
  );
}
