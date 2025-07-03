import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  useGetSingleUserQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import { successTheme } from "@/styles/toastThemes";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  profileImg?: FileList;
};

export default function ProfileSettingsAdmin() {
  const user = useAppSelector(selectCurrentUser);
  const { isLoading: userDataLoading, data } = useGetSingleUserQuery(
    user?.userId,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  const currentUserData = data?.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(
    data?.data?.profileImg || null
  );
  const [uploading, setUploading] = useState(false);
  const [updateUserInfo, { isLoading, isSuccess, isError }] =
    useUpdateUserInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: currentUserData?.name || "",
      email: currentUserData?.email || "",
    },
  });

  const profileImgFile = watch("profileImg");

  // Image preview logic
  useEffect(() => {
    if (profileImgFile && profileImgFile.length > 0) {
      const file = profileImgFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(currentUserData?.profileImg || null);
    }
  }, [profileImgFile, currentUserData?.profileImg]);

  // Logout logic
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Form submission
  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);
      let profileImgUrl = currentUserData?.profileImg || "";

      // Upload to Cloudinary if new image selected
      if (data.profileImg && data.profileImg.length > 0) {
        const formData = new FormData();
        formData.append("file", data.profileImg[0]);
        formData.append("upload_preset", "CarSure_Nari");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dinnsayed/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const resData = await res.json();
        profileImgUrl = resData.secure_url;
      }

      const updatedData = {
        name: data.name,
        email: data.email,
        profileImg: profileImgUrl,
      };

      await updateUserInfo(updatedData);
    } catch (error) {
      toast.error("Image upload failed!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  // Success/Error toasts
  useEffect(() => {
    if (isError) toast.error("Error: Update failed!");

    if (isSuccess) {
      toast.success("User updated successfully!", successTheme);

      // If user updated email, logout after delay
      if (watch("email") !== currentUserData?.email) {
        setTimeout(() => {
          toast("You changed your email. Please login again.");
          handleLogout();
        }, 3000); // 3s delay
      }
    }
  }, [isSuccess, isError]);

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Profile Settings" />
      {!userDataLoading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-xl mt-6"
        >
          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
            {/* ⬇️ Permanent note */}
            <p className="text-sm text-muted-foreground mt-2 italic">
              [Note: If you change your email, you will need to login again
              using the new one after saving.]
            </p>
          </div>

          {/* Profile Image */}
          <div className="space-y-1">
            <Label htmlFor="profileImg">Profile Image</Label>
            <Input
              id="profileImg"
              type="file"
              accept="image/*"
              {...register("profileImg")}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-28 w-28 rounded-full border object-cover"
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || uploading}
            className="w-full"
          >
            {uploading || isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      )}
    </DashboardBodyWrapper>
  );
}
