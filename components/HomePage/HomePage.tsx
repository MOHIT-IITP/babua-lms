
import { ModeToggle } from "../ui/Modetoggle";
import { Button } from "../ui/button";

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
          <ModeToggle/>
          <Button>Sign In</Button>
        </div>
      </nav>
      <main className="flex justify-center items-center flex-col container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <section className="mb-16 animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4" />
            <span className="text-muted-foreground">Your learning journey starts here</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            Master new skills with
            <br />
            <span
              className="bg-gradient-to-r from-primary-foreground via-muted-foreground to-primary bg-clip-text text-transparent dark:from-white dark:via-gray-400 dark:to-gray-700"
            >
              curated video courses
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Explore our collection of hand-picked YouTube playlists designed to take you from beginner to expert.
          </p>
        </section>

        {/* Playlists Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Featured Courses</h2>
            <span className="text-sm text-muted-foreground">
              {/* {playlists.length} courses available */}
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 LearnHub. Built with passion for learning.</p>
        </div>
      </footer>
    </div>
  );
};
