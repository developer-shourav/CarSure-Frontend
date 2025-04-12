import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import navLogo from "../../assets/navLogo.png";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Cars", href: "/cars" },
    { label: "Features", href: "/features" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Site Name */}
        <div className="flex items-center gap-2">
          <img src={navLogo} alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-primary">CarSure</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions: Theme Toggle & Auth */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="h-6 w-6" />
                  <span className="font-bold text-primary">CarSure</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
                <ThemeToggle />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
