// src/pages/Dashboard/UserDashboard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";

const UserDashboard = () => {
  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Welcome to Your Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">My Orders</p>
            <p className="text-3xl font-bold text-red-600">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Saved Cars</p>
            <p className="text-3xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>
      </div>
    </DashboardBodyWrapper>
  );
};

export default UserDashboard;
