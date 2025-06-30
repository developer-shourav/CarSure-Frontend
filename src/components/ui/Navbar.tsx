import {
  ChevronDown,
  LogOut,
  LucideHeart,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import navLogo from "../../assets/logo/logo.png";
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { successTheme } from "@/styles/toastThemes";
import toast from "react-hot-toast";
import { selectCartTotalQuantity } from "@/redux/features/cart/cartSlice";
import { megaMenuItems } from "@/constant";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const cartQuantity = useAppSelector(
    selectCartTotalQuantity(loggedInUser?.userId || "")
  );

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout success", successTheme);
  };

  const getDashboardPath = () => {
    if (loggedInUser?.role === "admin" || loggedInUser?.role === "superAdmin") {
      return "/dashboard/admin";
    }
    return "/dashboard/user";
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Cars", href: "/cars" },
    { label: "About Us", href: "/about" },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <header className="w-full dark:border-b  bg-background fixed top-0 left-0 z-50">
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
        <nav className="hidden lg:flex gap-6">
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
          {loggedInUser && (
            <Link
              to={getDashboardPath()}
              className={`text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-red-600 font-semibold"
                  : "hover:text-red-500"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/*---------------- Desktop Actions ----------------*/}
        {!loggedInUser && (
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
        {loggedInUser && (
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartQuantity}
              </span>
            </Link>
            <Button onClick={handleLogout} variant="outline">
              <LogOut /> Logout
            </Button>
          </div>
        )}

        {/* ----------------Medium and Mobile Menu---------------- */}
        <div className="flex items-center gap-4 lg:hidden">
          {loggedInUser && (
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartQuantity}
              </span>
            </Link>
          )}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Menu className="h-6 w-6" />
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
                {loggedInUser && (
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      isActive("/dashboard")
                        ? "text-red-600 font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                {!loggedInUser && (
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
                )}
                {loggedInUser && (
                  <div className="mt-6 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut /> Logout
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ----------------Separate Mega Menu (Large Devices Only)---------------- */}
      <div className="hidden lg:block w-full mx-auto bg-gray-900 text-gray-100 ">
        <div className="w-11/12 max-w-screen-xl mx-auto  py-2">
          <nav className="flex gap-4 lg:gap-6 items-center">
            <button className="text-[12px] xl:text-sm font-bold table-row-group text-gray-100 dark:text-gray-300 hover:text-red-500 transition-colors px-2 py-1">
              All Categories:
            </button>
            {Object.keys(megaMenuItems).map((menuItem) => (
              <div
                key={menuItem}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(menuItem)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <div className="flex items-center cursor-pointer">
                  <button className="text-[12px] xl:text-sm font-medium text-gray-100 dark:text-gray-300 hover:text-red-500 transition-colors  px-1 xl:px-2 py-1">
                    {menuItem}
                  </button>
                  <ChevronDown className="size-4" />
                </div>
                <div
                  className={`absolute left-0 w-[380px] xl:w-[550px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-100 transition-opacity duration-300 ${
                    activeMegaMenu === menuItem
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-4 p-6">
                    {megaMenuItems[menuItem].map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block text-black text-sm hover:text-red-500 transition-colors"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        <span className="font-medium">{item.label} </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="ml-auto flex items-center gap-2 xl:gap-4">
              {/* ------------Whitelist icon------------ */}
              <Link
                title="Wishlist"
                to="/"
                className="text-gray-100 dark:text-gray-300 hover:text-red-500 transition-colors relative"
              >
                <LucideHeart className="size-4 xl:size-6" />
              </Link>
              {loggedInUser ? (
                <Link
                  title="User Profile"
                  to={getDashboardPath()}
                  className=" text-gray-100 dark:text-gray-300 hover:text-red-500 transition-colors"
                >
                  <User className="size-4 xl:size-6" />
                </Link>
              ) : (
                <Link
                  title="User Profile"
                  to="/login"
                  className=" text-gray-100 dark:text-gray-300 hover:text-red-500 transition-colors"
                >
                  <User className="size-4 xl:size-6" />
                </Link>
              )}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
