/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserOrdersQuery } from "@/redux/features/order/order";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyOrders() {
  const user = useAppSelector(selectCurrentUser);
  const { isLoading, data } = useGetUserOrdersQuery(user?.userId, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 300000,
    refetchOnReconnect: true,
  });

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="My Orders" />
      {isLoading ? (
        <div className="space-y-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto mt-6 rounded-xl border border-border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Car ID</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((order: any, i: number) => (
                <tr key={order._id} className="border-b hover:bg-accent">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.carId}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">${order.totalPrice}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Paid"
                          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                          : "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardBodyWrapper>
  );
}
