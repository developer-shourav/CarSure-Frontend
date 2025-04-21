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

export default function ManageUsers() {
  // Fetch all users
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

  // Deactivation mutation
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
        <div className="mt-6 overflow-x-auto animate-pulse">
          <table className="min-w-full table-auto border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                {["#", "Name", "Email", "Role", "Status", "Action"].map(
                  (title) => (
                    <th key={title} className="px-4 py-2 text-left">
                      {title}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">
                    <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : isError ? (
        <p className="text-center mt-20 text-red-600 text-2xl font-semibold">
          Failed to load users. Please try again later.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user: TUserData, index: number) => (
                <tr
                  key={user._id}
                  className={clsx(
                    "border-t border-gray-200 dark:border-gray-700",
                    user.role === "admin" ? "hidden" : " "
                  )}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    {user.isBlocked ? (
                      <span className="text-red-500 font-medium">Blocked</span>
                    ) : (
                      <span className="text-green-500 font-medium">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      className="dark:bg-red-500 hover:text-white hover:bg-red-600"
                      size="sm"
                      disabled={user.isBlocked || deactivating}
                      onClick={() => handleUserDeactivation(user._id)}
                    >
                      {user.isBlocked ? "Deactivated" : "Deactivate"}
                    </Button>
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
