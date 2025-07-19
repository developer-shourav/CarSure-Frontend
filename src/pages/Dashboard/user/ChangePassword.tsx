"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserChangePasswordMutation } from "@/redux/features/user/userApi";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import toast from "react-hot-toast";
import { successTheme } from "@/styles/toastThemes";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [changePassword, { isLoading, isSuccess }] =
    useUserChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    await changePassword({ currentPassword, newPassword });
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!", successTheme);
    }
  }, [isLoading, isSuccess]);

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Change Password" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-xl mt-6"
      >
        {/* --------Current Password --------*/}
        <div className="space-y-1 relative">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type={showCurrent ? "text" : "password"}
            id="currentPassword"
            placeholder="Enter current password"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          <div
            className="absolute right-3 top-[28px] cursor-pointer text-zinc-500 dark:text-zinc-300"
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* --------New Password --------*/}
        <div className="space-y-1 relative">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type={showNew ? "text" : "password"}
            id="newPassword"
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
            })}
          />
          <div
            className="absolute right-3 top-[28px] cursor-pointer text-zinc-500 dark:text-zinc-300"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* --------Confirm Password --------*/}
        <div className="space-y-1 relative">
          <Label htmlFor="confirmPassword">Re-enter New Password</Label>
          <Input
            type={showConfirm ? "text" : "password"}
            id="confirmPassword"
            placeholder="Re-enter new password"
            {...register("confirmPassword", {
              required: "Please re-enter new password",
            })}
          />
          <div
            className="absolute right-3 top-[28px] cursor-pointer text-zinc-500 dark:text-zinc-300"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Updating..." : "Change Password"}
        </Button>

        {isSuccess && (
          <p className="text-sm text-green-600 text-center">
            Password updated successfully!
          </p>
        )}
      </form>
    </DashboardBodyWrapper>
  );
}
