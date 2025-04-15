import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import navLogo from "../../assets/logo/logo.png";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Cars", href: "/cars" },
    { label: "About Us", href: "/about" },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4">
        {/* ----------------Logo & Site Name ----------------*/}
        <Link to="/">
          <span className="flex items-center gap-2">
            <img src={navLogo} alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary">
              Car<span className="text-red-500">Sure</span>
            </span>
          </span>
        </Link>

        {/* ----------------Desktop Nav Links----------------*/}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-red-600 font-semibold"
                  : "hover:text-red-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/*---------------- Desktop Actions ----------------*/}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
          <ThemeToggle />
        </div>

        {/* ----------------Mobile Menu---------------- */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 pt-8">
              {/* ----------------Header inside drawer---------------- */}
              <div className="flex items-center justify-between my-6 px-4">
                <div className="flex items-center gap-2">
                  <img src={navLogo} alt="Logo" className="h-8 w-8" />
                  <span className="font-bold text-primary text-lg">
                    Car<span className="text-red-500">Sure</span>
                  </span>
                </div>
                <ThemeToggle />
              </div>

              {/* ----------------Mobile Nav---------------- */}
              <nav className="flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-red-600 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
