import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import {
  useGetAdminDashboardDataQuery,
  useRefreshAdminDashboardMutation,
} from "@/redux/features/admin/adminApi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TLatestOrder,
  TLatestUser,
  TMonthlyUserGrowth,
} from "@/types/dashboard.type";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw } from "lucide-react";

const COLORS = ["#00A300", "#facc15", "#ef4444", "#7ec8e3"];

const AdminDashboard = () => {
  const { data: dashboardData, isLoading } =
    useGetAdminDashboardDataQuery(undefined);
  const [refreshAdminDashboard, { isLoading: isRefreshing }] =
    useRefreshAdminDashboardMutation();
  const dashboardInfo = dashboardData?.data;

  const handleRefresh = async () => {
    await refreshAdminDashboard(undefined);
  };

  const pieData = [
    { name: "Delivered", value: dashboardInfo?.totalDeliveredOrders || 0 },
    { name: "Paid", value: dashboardInfo?.totalPaidOrders || 0 },
    { name: "Pending", value: dashboardInfo?.totalPendingOrders || 0 },
    { name: "Canceled", value: dashboardInfo?.totalCancelledOrders || 0 },
  ];
  return (
    <DashboardBodyWrapper>
      <div className="flex justify-between items-center">
        <DashboardHeading title="Admin Dashboard" />
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCcw
            className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* --------Section 1: Cards --------*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Total Users</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold text-red-600">
                {dashboardInfo?.totalUsers}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Total Products</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold text-red-600">
                {dashboardInfo?.totalCars}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Pending Orders</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-bold text-red-600">
                {dashboardInfo?.totalPendingOrders}
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Revenue This Month</p>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-3xl font-bold text-red-600">
                ${dashboardInfo?.totalSales}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --------Section 2: Charts --------*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">User Growth (Monthly)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={dashboardInfo?.monthlyUserGrowth as TMonthlyUserGrowth[]}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#ef4444" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">Order Status</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --------Section 3: Tables-------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">Latest Users</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardInfo?.last8Users?.map((user: TLatestUser) => (
                  <TableRow key={user?._id}>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">Recent Orders</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardInfo?.last8Orders.map((order: TLatestOrder) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>${order?.totalPrice}</TableCell>
                    <TableCell>{order?.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardBodyWrapper>
  );
};

export default AdminDashboard;
