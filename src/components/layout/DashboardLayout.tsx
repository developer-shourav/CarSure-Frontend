import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../ui/Dashboard/Sidebar/Sidebar";


export default function DashboardLayout() {
  return (
    <div className="md:max-w-[1333px] mx-auto md:px-4 flex min-h-screen">
      <Sidebar />
      <main className="overflow-y-auto">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );
}
