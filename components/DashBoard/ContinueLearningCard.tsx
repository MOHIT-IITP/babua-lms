import Link from "next/link";

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
    <div className="mx-7 mb-6">
      <Link href={`/course/${courseId}?lectureId=${lectureId}`}>
        <div className="group relative bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-stretch">
            {/* Left colored section with icon */}
            <div className="flex-shrink-0 w-24 bg-black/10 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-violet-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse"></div>
              </div>
            </div>

            {/* Right content section */}
            <div className="flex-1 p-5 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Continue Learning</span>
                  <div className="h-1 w-1 rounded-full bg-white/50"></div>
                  <span className="text-xs text-white/70">Lecture {lectureOrder}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 truncate group-hover:translate-x-1 transition-transform">
                  {courseTitle}
                </h3>
                <p className="text-sm text-white/90 truncate">
                  {lectureTitle}
                </p>
              </div>

              {/* Arrow */}
              <div className="ml-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
        </div>
      </Link>
    </div>
  );
}
