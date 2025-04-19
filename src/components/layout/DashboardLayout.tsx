import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Sidebar from "../ui/Dashboard/Sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );
}
