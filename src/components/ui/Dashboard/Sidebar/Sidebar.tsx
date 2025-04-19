import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log("🚀 ~ Sidebar ~ user:", user)

  return (
    <aside className="w-64 p-4 border-r border-border h-screen">
      {user?.role === "admin" && (
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/admin">Admin Dashboard</Link>
          <Link to="/dashboard/admin/users">Manage Users</Link>
          <Link to="/dashboard/admin/products">Manage Products</Link>
          <Link to="/dashboard/admin/orders">Manage Orders</Link>
        </nav>
      )}
      {user?.role === "user" && (
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/user">User Dashboard</Link>
          <Link to="/dashboard/user/orders">My Orders</Link>
          <Link to="/dashboard/user/profile">Profile Settings</Link>
          <Link to="/dashboard/user/change-password">Change Password</Link>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
