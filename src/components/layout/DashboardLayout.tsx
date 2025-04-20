import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../ui/Dashboard/Sidebar/Sidebar";


export default function DashboardLayout() {
  return (
    <div className="md:max-w-[1333px] mx-auto md:px-4 flex min-h-screen">
      <Sidebar />
      <main className="flex-1 max-h-[100vh] overflow-y-auto">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );
}
