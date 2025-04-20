import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../ui/Dashboard/Sidebar/Sidebar";


export default function DashboardLayout() {
  return (
    <div className="max-w-[98%] mx-auto flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );
}
