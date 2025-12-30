import { ModeToggle } from "../ui/Modetoggle";
import { Button } from "../ui/button";
import { CiPlay1 } from "react-icons/ci";
import { Card } from "../ui/card";
import { FaBoltLightning, FaBookOpen, FaPeopleGroup } from "react-icons/fa6";
import { PiShootingStarDuotone } from "react-icons/pi";

export const HomePage = () => {
  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300"
    >
      {/* Minimal Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* Logo (replace with an img if you have one) */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg select-none">L</div>
          <span className="ml-2 text-xl font-semibold tracking-tight">LearnHub</span>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button>Sign In</Button>
        </div>
      </nav>
      <main className="flex justify-center items-center flex-col container mx-auto px-4 py-12 flex-1">
        <section className="mb-16 animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4" />
            <span className="px-2 border rounded-full flex justify-center items-center gap-3"> <PiShootingStarDuotone/> Your learning journey starts here</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-7xl text-foreground">
            Master new skills with
            <br />
            <span
              className="bg-linear-to-r  bg-clip-text text-transparent dark:from-gray-300 
             from-gray-400 via-gray-600 to-gray-900 dark:via-gray-600 dark:to-gray-700"
            >
              curated video courses
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Explore our collection of hand-picked YouTube playlists designed to take you from beginner to expert.
          </p>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
            </span>
            <Button>
              <CiPlay1 />
              Start Learning
            </Button>
          </div>
        </section>

        <hr className="w-full border-t border-border mt-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-10">
          <Card className="flex flex-col items-center text-center p-6 h-full">
            <FaBookOpen className="dark:text-white text-black border rounded-xl p-3 size-12 mb-4" />
            <h1 className="text-lg font-semibold mb-2">Curated Content</h1>
            <p className="text-muted-foreground text-sm">
              Hand-picked playlists from the best educators on YouTube, organized for optimal learning.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 h-full">
            <FaBoltLightning className="dark:text-white text-black border rounded-xl p-3 size-12 mb-4" />
            <h1 className="text-lg font-semibold mb-2">Learn at Your Pace</h1>
            <p className="text-muted-foreground text-sm">
              Watch videos directly here or on YouTube. Track your progress and pick up where you left off.
            </p>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 h-full">
            <FaPeopleGroup className="dark:text-white text-black border rounded-xl p-3 size-12 mb-4" />
            <h1 className="text-lg font-semibold mb-2">Community Driven</h1>
            <p className="text-muted-foreground text-sm">
              Courses recommended by learners like you. Quality content that actually helps you grow.
            </p>
          </Card>
        </div>
        <div className="w-full flex justify-center items-center flex-col">
        <hr className="w-full border-t border-border mt-12" />
          <h1 className="text-2xl font-bold mt-15">Ready to start learning?</h1>
          <p className="text-sm text-gray-600">Browse our collection of from courses and begin your journey today.</p>
          <Button className="mt-7">
            <CiPlay1 />
            Start Learning
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 LearnHub. Built with passion for learning.</p>
        </div>
      </footer>
    </div>
  );
};
