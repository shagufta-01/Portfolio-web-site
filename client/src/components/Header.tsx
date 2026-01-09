import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-foreground">Portfolio</span>
          </a>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 md:gap-8">
          <Link href="/">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
          </Link>
          <Link href="/contact">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </Link>
          <Link href="/enquiries">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Enquiries
            </a>
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="text-xs md:text-sm"
            >
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              className="text-xs md:text-sm"
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
