// src/pages/Dashboard/AdminDashboard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";

const AdminDashboard = () => {
  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Admin Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-3xl font-bold text-red-600">120</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Total Products</p>
            <p className="text-3xl font-bold text-red-600">85</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Pending Orders</p>
            <p className="text-3xl font-bold text-red-600">30</p>
          </CardContent>
        </Card>
      </div>
    </DashboardBodyWrapper>
  );
};

export default AdminDashboard;
