import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import {
  LineChart,
  Line,
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

const orderStats = [
  { month: "Dec", orders: 4 },
  { month: "Jan", orders: 2 },
  { month: "Feb", orders: 4 },
  { month: "Mar", orders: 5 },
  { month: "Apr", orders: 8 },
];

const UserDashboard = () => {
  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Welcome to Your Dashboard" />

      {/* --------Section 1: Cards --------*/}
      <div className=" grid grid-cols-3 gap-4 mb-6">
        <Card className="">
          <CardContent className="p-4">
            <p className="md:text-lg font-semibold">My Orders</p>
            <p className="text-xl md:text-3xl font-bold text-red-600">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="md:text-lg font-semibold">Saved Cars</p>
            <p className="text-xl md:text-3xl font-bold text-red-600">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="md:text-lg font-semibold">Total Spent</p>
            <p className="text-xl md:text-3xl font-bold text-red-600">$3,500</p>
          </CardContent>
        </Card>
      </div>

      {/*--------Section 2: Chart --------*/}
      <div className="mb-6">
        <Card className="w-full lg:w-8/12">
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">Monthly Orders</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={orderStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --------Section 3: Table-------- */}
      <div>
        <Card>
          <CardContent className="p-4">
            <p className="text-lg font-semibold mb-2">Recent Orders</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#2452s875sa43</TableCell>
                  <TableCell>Delivered</TableCell>
                  <TableCell>$650</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#3452fwsdf8551</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>$820</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#558899741fw2</TableCell>
                  <TableCell>Canceled</TableCell>
                  <TableCell>$1250</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardBodyWrapper>
  );
};

export default UserDashboard;
