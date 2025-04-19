// src/pages/Dashboard/UserDashboard.tsx
import { Card, CardContent } from "@/components/ui/card";

const UserDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
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
    </div>
  );
};

export default UserDashboard;
