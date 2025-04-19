// src/pages/Dashboard/AdminDashboard.tsx
import { Card, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
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
    </div>
  );
};

export default AdminDashboard;
