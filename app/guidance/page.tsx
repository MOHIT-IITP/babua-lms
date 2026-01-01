import { requireUser } from "@/app/lib/hooks";
import Link from "next/link";

export default async function GuidancePage() {
  await requireUser();

  return (
    <div className="min-h-screen bg-transparent  px-6 py-10">
      <div className="max-w-6xl mx-auto">
          {/* <div className="mb-5">
  <Link
    href="/dashboard"
    className="inline-flex font-bold items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
  >
    ← Back to Dashboard
  </Link>
</div> */}


        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold mb-4 dark:text-white">
            {`Need guidance? We've got you.`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Babua keeps all learning content completely free.
            When you feel stuck or want feedback, you can optionally
            ask for human guidance.
          </p>
        </div>

        {/* ================= GUIDANCE / PAYMENT INTENT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1-on-1 Mentor */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition">
            <span className="inline-block text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full mb-4">
              Personal help
            </span>

            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              1-on-1 Mentor Session
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Talk directly with a mentor.
              Clear doubts, discuss approaches, or get interview clarity.
            </p>

            <div className="text-4xl font-semibold mb-6 dark:text-white">
              ₹99
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {" "} / 15 minutes
              </span>
            </div>

            <ul className="space-y-3 text-sm mb-8 dark:text-gray-300">
              <li>✔ Direct mentor interaction</li>
              <li>✔ Concept clarity</li>
              <li>✔ Interview guidance</li>
              <li>✔ No subscription</li>
            </ul>

            <button className="w-full py-3 rounded-xl border dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
              Request session →
            </button>
          </div>

          {/* Office Hours (Highlighted) */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg scale-[1.03]">
            <span className="inline-block text-xs font-medium bg-white/20 px-3 py-1 rounded-full mb-4">
              Most popular
            </span>

            <h2 className="text-xl font-semibold mb-2">
              Weekly Office Hours
            </h2>

            <p className="text-white/80 text-sm mb-6">
              Join live group sessions.
              Ask questions or learn from others’ doubts.
            </p>

            <div className="text-4xl font-semibold mb-6">
              ₹49
              <span className="text-base font-normal text-white/80">
                {" "} / session
              </span>
            </div>

            <ul className="space-y-3 text-sm mb-8">
              <li>✔ Live mentor explanations</li>
              <li>✔ Group learning</li>
              <li>✔ Real interview questions</li>
              <li>✔ Very affordable</li>
            </ul>

            <button className="w-full py-3 rounded-xl bg-white text-purple-700 text-sm font-medium hover:bg-gray-100">
              View upcoming sessions →
            </button>
          </div>

          {/* Resume / Project Review */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition">
            <span className="inline-block text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full mb-4">
              High impact
            </span>

            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              Resume / Project Review
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              Get written feedback on your resume,
              GitHub profile, or project architecture.
            </p>

            <div className="text-4xl font-semibold mb-6 dark:text-white">
              ₹299
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {" "} one-time
              </span>
            </div>

            <ul className="space-y-3 text-sm mb-8 dark:text-gray-300">
              <li>✔ Resume improvement tips</li>
              <li>✔ Project architecture feedback</li>
              <li>✔ Actionable suggestions</li>
              <li>✔ No recurring charge</li>
            </ul>

            <button className="w-full py-3 rounded-xl border dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
              Submit for review →
            </button>
          </div>
        </div>

  {/* ================= MENTOR PROFILES PREVIEW ================= */}
<div className="mt-28">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-semibold mb-3 dark:text-white">
      {`Learn from engineers who've been there`}
    </h2>
    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Babua mentors are working engineers and experienced problem solvers.
      Same mindset. Same clarity.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Mentor 1 */}
    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition">
      <span className="inline-block text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full mb-4">
        Backend · DBMS
      </span>

      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold dark:text-white">
          AK
        </div>
        <div>
          <p className="font-semibold text-lg dark:text-white">Aman Kumar</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Backend Engineer · Ex-Startup
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Works on scalable backend systems.
        Helps learners with DBMS, system design,
        and interview preparation.
      </p>

      <ul className="space-y-2 text-sm mb-8 dark:text-gray-300">
        <li>✔ DBMS & SQL depth</li>
        <li>✔ System design basics</li>
        <li>✔ Interview preparation</li>
      </ul>

      <button className="w-full py-3 rounded-xl border dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
        Request session →
      </button>
    </div>

    {/* Mentor 2 */}
    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition">
      <span className="inline-block text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full mb-4">
        DSA · Interviews
      </span>

      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold dark:text-white">
          RS
        </div>
        <div>
          <p className="font-semibold text-lg dark:text-white">Riya Sharma</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Software Engineer · Product Company
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Focuses on DSA patterns and clean problem solving.
        Helps students build consistency and confidence.
      </p>

      <ul className="space-y-2 text-sm mb-8 dark:text-gray-300">
        <li>✔ Pattern-based DSA</li>
        <li>✔ Interview mindset</li>
        <li>✔ Consistency building</li>
      </ul>

      <button className="w-full py-3 rounded-xl border dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
        Request session →
      </button>
    </div>

    {/* Mentor 3 */}
    <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 shadow-sm hover:shadow-md transition">
      <span className="inline-block text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full mb-4">
        Resume · Projects
      </span>

      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-semibold dark:text-white">
          NK
        </div>
        <div>
          <p className="font-semibold text-lg dark:text-white">Nikhil Verma</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Full-Stack Engineer · 4+ yrs
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Reviews resumes and projects.
        Guides learners on how to present their work effectively.
      </p>

      <ul className="space-y-2 text-sm mb-8 dark:text-gray-300">
        <li>✔ Resume feedback</li>
        <li>✔ Project architecture</li>
        <li>✔ Career direction</li>
      </ul>

      <button className="w-full py-3 rounded-xl border dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
        Submit for review →
      </button>
    </div>
  </div>
</div>


        {/* ================= TRUST FOOTER ================= */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-20 max-w-3xl mx-auto">
          Guidance is optional. Learning is always free.
          Pay only when you need human help — nothing more.
        </p>
      </div>
    </div>
  );
}
