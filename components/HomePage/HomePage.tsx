export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background dark">
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4" />
            <span>Your learning journey starts here</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Master new skills with
            <br />
            <span className="text-gradient">curated video courses</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Explore our collection of hand-picked YouTube playlists designed to take you from beginner to expert.
          </p>
        </section>

        {/* Playlists Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Featured Courses</h2>
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
