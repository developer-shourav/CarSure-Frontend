import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
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

const barData = [
  { name: "Nov", users: 45 },
  { name: "Dec", users: 30 },
  { name: "Jan", users: 40 },
  { name: "Feb", users: 80 },
  { name: "Mar", users: 65 },
  { name: "Apr", users: 90 },
];

const pieData = [
  { name: "Delivered", value: 400 },
  { name: "Paid", value: 200 },
  { name: "Pending", value: 300 },
  { name: "Canceled", value: 100 },
];

const COLORS = ["#ef4444", "#facc15", "#9ca3af"];

const AdminDashboard = () => {
  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Admin Dashboard" />

      {/* Section 1: Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold">Revenue This Month</p>
            <p className="text-3xl font-bold text-red-600">$7,200</p>
          </CardContent>
        </Card>
      </div>

      {/* Section 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">User Growth (Monthly)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
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
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Tables */}
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
                <TableRow>
                  <TableCell>Alex Hossain</TableCell>
                  <TableCell>alex@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nadia Khan</TableCell>
                  <TableCell>nadia@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ridoy Khan</TableCell>
                  <TableCell>ridoy@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Asraful Alom</TableCell>
                  <TableCell>asraful@gmail.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MD Babu</TableCell>
                  <TableCell>babu@gmail.com</TableCell>
                </TableRow>
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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#102af33585444</TableCell>
                  <TableCell>Pending</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#32dcse2355785</TableCell>
                  <TableCell>Delivered</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#22dcaei2355775</TableCell>
                  <TableCell>Canceled</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#51dcse4555785</TableCell>
                  <TableCell>Delivered</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#598dcse4555785</TableCell>
                  <TableCell>Paid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardBodyWrapper>
  );
};

export default AdminDashboard;
