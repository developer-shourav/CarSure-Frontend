import { useEffect } from "react";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { useUserAccountDeactivationMutation } from "@/redux/features/admin/adminApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { successTheme } from "@/styles/toastThemes";
import { TUserData } from "@/types";
import clsx from "clsx";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageUsers() {
  const {
    data: users,
    isLoading,
    isError,
  } = useGetAllUsersQuery(undefined, {
    pollingInterval: 250000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const allUsers = users?.data || [];

  const [
    deactivateUser,
    { isSuccess: isDeactiveSuccess, isLoading: deactivating },
  ] = useUserAccountDeactivationMutation();

  const handleUserDeactivation = async (id: string) => {
    try {
      await deactivateUser(id).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("Failed to deactivate user.");
    }
  };

  useEffect(() => {
    if (isDeactiveSuccess) {
      toast.success("User account deactivated successfully!", successTheme);
    }
  }, [isDeactiveSuccess]);

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Manage Users" />

      {isLoading ? (
        <div className="mt-4 overflow-x-auto">
          <Table className="border">
            <TableHeader>
              <TableRow>
                {["#", "Name", "Email", "Role", "Status", "Action"].map(
                  (title) => (
                    <TableHead key={title}>{title}</TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(6)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-24" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : isError ? (
        <p className="text-center mt-20 text-red-600 text-2xl font-semibold">
          Failed to load users. Please try again later.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user: TUserData, index: number) => (
                <TableRow
                  key={user._id}
                  className={clsx(user.role === "admin" && "hidden")}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    {user.isBlocked ? (
                      <span className="text-red-500 font-medium">Blocked</span>
                    ) : (
                      <span className="text-green-500 font-medium">Active</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="dark:bg-red-500 hover:text-white hover:bg-red-600"
                      size="sm"
                      disabled={user.isBlocked || deactivating}
                      onClick={() => handleUserDeactivation(user._id)}
                    >
                      {user.isBlocked ? "Deactivated" : "Deactivate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardBodyWrapper>
  );
}
