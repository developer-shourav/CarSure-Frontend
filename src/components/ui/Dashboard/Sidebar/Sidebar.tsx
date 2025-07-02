import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HomeIcon, LayoutDashboardIcon, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import navLogo from "@/assets/logo/logo.png";
import toast from "react-hot-toast";
import { DashBoardThemeToggle } from "@/components/DashBoardThemeToggle";

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const isActive = (path: string) => location.pathname === path;
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  };

  const adminLinks = [
    { to: "/dashboard/admin", label: "Admin Dashboard" },
    { to: "/dashboard/admin/addProduct", label: "Add Product" },
    { to: "/dashboard/admin/products", label: "Manage Products" },
    { to: "/dashboard/admin/orders", label: "Manage Orders" },
     { to: "/dashboard/admin/users", label: "Manage Users" },
  ];

  const userLinks = [
    { to: "/dashboard/user", label: "User Dashboard" },
    { to: "/dashboard/user/orders", label: "My Orders" },
    { to: "/dashboard/user/profile", label: "Profile Settings" },
    { to: "/dashboard/user/change-password", label: "Change Password" },
  ];

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "user"
      ? userLinks
      : [];

  return (
    <>
      {/* Mobile Sidebar Button */}
      <div className=" lg:hidden absolute top-4 left-4 z-50 ">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div title="Dashboard md:mb-5">
              <LayoutDashboardIcon className="size-7 md:size-10 " />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={navLogo} alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-primary text-lg">
                Car<span className="text-red-500">Sure</span>
              </span>
            </Link>
            <p className="text-lg font-semibold ">Dashboard</p>
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded px-2 py-2 text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-primary dark:bg-red-500 text-white"
                      : "hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div
                className={`rounded mt-5 px-3  text-sm font-medium transition-colors hover:bg-accent`}
              >
                <DashBoardThemeToggle />
              </div>

              <Link
                to="/"
                className={`rounded  px-2 py-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "bg-primary dark:bg-red-500 text-white"
                    : " hover:bg-accent "
                }`}
              >
                <span className="flex items-end gap-2">
                  <HomeIcon className="size-5" />
                  <span>Return Home</span>
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className={`rounded px-2 py-2 text-sm font-medium hover:bg-red-500`}
              >
                <span className="flex items-end gap-2">
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </span>
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex md:flex-col w-64 h-screen p-6 border-r border-border bg-background">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src={navLogo} alt="Logo" className="h-12 w-12" />
          <span className="font-bold text-primary text-lg">
            Car<span className="text-red-500">Sure</span>
          </span>
        </Link>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary dark:bg-red-500 text-white"
                  : " hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div
            className={`rounded mt-6 px-3  text-sm font-medium transition-colors hover:bg-accent`}
          >
            <DashBoardThemeToggle />
          </div>

          <Link
            to="/"
            className={`rounded   px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-primary dark:bg-red-500 text-white"
                : " hover:bg-accent "
            }`}
          >
            <span className="flex gap-2">
              <HomeIcon className="size-5" />
              <span>Return Home</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className={`rounded px-3 py-2 text-sm font-medium hover:bg-red-500`}
          >
            <span className="flex  gap-2">
              <LogOut className="size-5" />
              <span>Logout</span>
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
