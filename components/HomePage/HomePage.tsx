import { Button } from "../ui/button";
import { CiPlay1 } from "react-icons/ci";
import { Card } from "../ui/card";
import { FaBoltLightning, FaBookOpen, FaPeopleGroup } from "react-icons/fa6";
import { PiShootingStarDuotone } from "react-icons/pi";
import Navbar from "../Navbar";
import Link from "next/link";

export const HomePage = () => {
  return (
    <div
      style={{ fontFamily: "poppins" }}
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-purple-100 to-blue-100 dark:from-slate-950 dark:via-purple-900 dark:to-slate-900 light:bg-gradient-to-br light:from-[#f8fafc] light:via-[#ede9fe] light:to-[#dbeafe] text-foreground transition-colors duration-300"
    >
      {/* Minimal Navbar */}
      <Navbar/>
      <main className="flex justify-center items-center flex-col container mx-auto px-4 py-12 flex-1">
        <section className="mb-16 animate-fade-in light:bg-gradient-to-br light:from-[#f8fafc]/80 light:via-[#ede9fe]/80 light:to-[#dbeafe]/80 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
            <div className="h-4 w-4 bg-purple-400 dark:bg-purple-500 rounded-full animate-pulse" />
            <span className="px-4 py-2 border border-purple-400/50 dark:border-purple-500/50 rounded-full flex justify-center items-center gap-3 bg-purple-200/40 dark:bg-purple-500/10 backdrop-blur-sm"> <PiShootingStarDuotone className="text-yellow-500 dark:text-yellow-400"/> Your learning journey starts here</span>
          </div>
          <h1 className="mt-6 text-6xl sm:text-8xl font-bold tracking-tight text-gray-900 dark:text-white light:text-gray-900 drop-shadow-lg">
            Master new skills with
            <br />
            <span
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 light:from-cyan-500 light:via-purple-400 light:to-pink-400 bg-clip-text text-transparent animate-pulse font-black"
            >
              curated video courses
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-purple-800 dark:text-purple-100 light:text-purple-800 leading-relaxed">
            Explore our collection of hand-picked YouTube playlists designed to take you from beginner to expert.
          </p>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
            </span>
            <Link href={"/dashboard"}>
            
            <Button className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-lg font-bold shadow-lg shadow-purple-400/40 dark:shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-300 transform hover:scale-105">
              <CiPlay1 className="mr-2" />
              Start Learning
            </Button>
            </Link>
          </div>
        </section>

        <hr className="w-full border-t border-purple-500/30 mt-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full mt-16 light:bg-gradient-to-br light:from-[#f8fafc]/60 light:via-[#ede9fe]/60 light:to-[#dbeafe]/60 rounded-2xl p-4">
          <Card className="flex flex-col items-center text-center p-8 h-full bg-gradient-to-br from-blue-200/60 to-cyan-100/60 dark:from-blue-500/20 dark:to-cyan-500/20 border border-cyan-300 dark:border-cyan-500/50 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-300/40 dark:hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="bg-gradient-to-br from-cyan-300 to-blue-400 dark:from-cyan-400 dark:to-blue-500 p-4 rounded-2xl mb-6">
              <FaBookOpen className="text-blue-900 dark:text-white size-8" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-blue-900 dark:text-white">Curated Content</h1>
            <p className="text-cyan-900 dark:text-cyan-100 text-base leading-relaxed">
              Hand-picked playlists from the best educators on YouTube, organized for optimal learning.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-8 h-full bg-gradient-to-br from-purple-200/60 to-pink-100/60 dark:from-purple-500/20 dark:to-pink-500/20 border border-purple-300 dark:border-purple-500/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-300/40 dark:hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-300 to-pink-400 dark:from-purple-400 dark:to-pink-500 p-4 rounded-2xl mb-6">
              <FaBoltLightning className="text-purple-900 dark:text-white size-8" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-purple-900 dark:text-white">Learn at Your Pace</h1>
            <p className="text-purple-900 dark:text-purple-100 text-base leading-relaxed">
              Watch videos directly here or on YouTube. Track your progress and pick up where you left off.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-8 h-full bg-gradient-to-br from-orange-200/60 to-red-100/60 dark:from-orange-500/20 dark:to-red-500/20 border border-orange-300 dark:border-orange-500/50 backdrop-blur-sm hover:shadow-lg hover:shadow-orange-300/40 dark:hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="bg-gradient-to-br from-orange-300 to-red-400 dark:from-orange-400 dark:to-red-500 p-4 rounded-2xl mb-6">
              <FaPeopleGroup className="text-orange-900 dark:text-white size-8" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-orange-900 dark:text-white">Community Driven</h1>
            <p className="text-orange-900 dark:text-orange-100 text-base leading-relaxed">
              Courses recommended by learners like you. Quality content that actually helps you grow.
            </p>
          </Card>
        </div>
        <div className="w-full flex justify-center items-center flex-col mt-16">
        <hr className="w-full border-t border-purple-300/30 dark:border-purple-500/30 mt-12" />
          <h1 className="text-5xl font-black mt-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 dark:from-yellow-300 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">Ready to start learning?</h1>
          <p className="text-lg text-purple-800 dark:text-purple-200 mt-4">Browse our collection of courses and begin your journey today.</p>
          <Button className="mt-10 bg-gradient-to-r from-pink-400 to-orange-400 dark:from-pink-500 dark:to-orange-500 hover:from-pink-500 hover:to-orange-500 text-white text-lg px-10 py-6 rounded-lg font-bold shadow-lg shadow-pink-400/40 dark:shadow-pink-500/50 hover:shadow-pink-500/75 transition-all duration-300 transform hover:scale-105">
            <CiPlay1 className="mr-2" />
            Start Learning
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-purple-200/30 dark:border-purple-500/30 py-8 bg-gradient-to-r from-gray-100/80 to-purple-100/80 dark:from-slate-950/80 dark:to-purple-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-purple-700 dark:text-purple-300">
          <p>© 2026 LearnHub. Built with passion for learning.</p>
        </div>
      </footer>
    </div>
  );
};