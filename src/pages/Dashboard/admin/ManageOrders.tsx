import { useEffect } from "react";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import {
  useDeleteAnOrderMutation,
  useGetAllOrdersQuery,
  useUpdateAnOrderMutation,
} from "@/redux/features/order/order";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { TOrder } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const statusOptions = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

export default function ManageOrders() {
  const {
    data: ordersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllOrdersQuery(undefined, {
    refetchOnFocus: true,
    pollingInterval: 150000,
    refetchOnReconnect: true,
  });

  const allOrders = ordersData?.data || [];

  const [updateOrderInfo, { isSuccess: updateSuccess }] =
    useUpdateAnOrderMutation();

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderInfo({ orderId, data: { status } }).unwrap();
      toast.success("Order status updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const [deleteOrder, { isSuccess: deleteSuccess }] =
    useDeleteAnOrderMutation();

  const handleOrderDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    if (updateSuccess || deleteSuccess) {
      refetch();
    }
  }, [updateSuccess, deleteSuccess, refetch]);

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Manage Orders" />

      <div className="mt-6 overflow-x-auto">
        <Table className="border p-1">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 8 }).map((__, i) => (
                    <TableCell key={i}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <p className="text-center text-red-500 font-semibold">
                    Failed to load orders.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              allOrders.map((order: TOrder, index: number) => (
                <TableRow key={order._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.customerInfo.name}</TableCell>
                  <TableCell>{order.customerInfo.email}</TableCell>
                  <TableCell>{order.customerInfo.phone}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(
                          order._id as string,
                          e.target.value
                        )
                      }
                      className="rounded-md px-2 py-1 bg-white dark:bg-gray-900 border dark:border-gray-600"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="dark:bg-red-500 hover:text-white hover:bg-red-600"
                      size="sm"
                      onClick={() => handleOrderDelete(order._id as string)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardBodyWrapper>
  );
}
