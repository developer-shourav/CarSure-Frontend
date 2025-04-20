import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";


const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path ;

  const adminLinks = [
    { to: "/dashboard/admin", label: "Admin Dashboard" },
    { to: "/dashboard/admin/users", label: "Manage Users" },
    { to: "/dashboard/admin/products", label: "Manage Products" },
    { to: "/dashboard/admin/orders", label: "Manage Orders" },
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
      <div className=" md:hidden absolute top-20 left-4 z-50 ">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <SidebarIcon className="size-7"/>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen p-6 border-r border-border bg-background">
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary dark:bg-red-500 text-white"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
