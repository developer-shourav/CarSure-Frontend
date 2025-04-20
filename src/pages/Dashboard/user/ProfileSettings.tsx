import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import { successTheme } from "@/styles/toastThemes";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";

type FormData = {
  name: string;
  email: string;
  profileImg?: FileList;
};

export default function ProfileSettings() {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [updateUserInfo, { isLoading, isSuccess, isError }] =
    useUpdateUserInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const profileImgFile = watch("profileImg");

  // Generate image preview
  useEffect(() => {
    if (profileImgFile && profileImgFile.length > 0) {
      const file = profileImgFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [profileImgFile]);

  // Submit handler
  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);
      let profileImgUrl = "";

      if (data.profileImg && data.profileImg.length > 0) {
        const formData = new FormData();
        formData.append("file", data.profileImg[0]);
        formData.append("upload_preset", "CarSure_Nari");

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/dinnsayed/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudData = await cloudRes.json();
        profileImgUrl = cloudData.secure_url;
      }

      const updatePayload = {
        name: data.name,
        email: data.email,
        ...(profileImgUrl && { profileImg: profileImgUrl }),
      };

      await updateUserInfo(updatePayload);
      reset();
      setPreview(null);
    } catch (err) {
      toast.error("Image upload failed!");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (isError) toast.error("Error: Update failed!");
    if (isSuccess) toast.success("User updated successfully!", successTheme);
  }, [isSuccess, isError]);

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="Profile Settings" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mt-6"
      >
        {/* Name Field */}
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Your full name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Profile Image Field */}
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
              alt="Profile Preview"
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
    </DashboardBodyWrapper>
  );
}
