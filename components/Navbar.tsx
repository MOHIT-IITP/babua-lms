import Link from "next/link"
import { ModeToggle } from "./ui/Modetoggle"
import { AuthModal } from "./AuthModal"

const Navbar = () => {
  return (
          <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-transparent backdrop-blur-sm">
            
            <Link href={"/"}>
            <div className="flex items-center gap-2">
              {/* Logo (replace with an img if you have one) */}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg select-none">L</div>
              <span className="ml-2 text-xl font-semibold tracking-tight">LearnHub</span>
            </div>
            </Link>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <AuthModal/>
            </div>
          </nav>
  )
}

export default Navbar