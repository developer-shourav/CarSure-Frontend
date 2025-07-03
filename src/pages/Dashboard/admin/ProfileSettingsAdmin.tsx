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
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

type FormData = {
  name: string;
  email: string;
  profileImg?: FileList;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  website?: string;
  occupation?: string;
  company?: string;
  timezone?: string;
  language?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
};

export default function ProfileSettingsAdmin() {
  const user = useAppSelector(selectCurrentUser);
  const {
    data,
    isLoading: userDataLoading,
    refetch,
  } = useGetSingleUserQuery(user?.userId, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const currentUserData = data?.data;
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [updateUserInfo, { isLoading, isSuccess, isError }] =
    useUpdateUserInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();

  const profileImgFile = watch("profileImg");

  // Populate default values when data is loaded
  useEffect(() => {
    if (currentUserData) {
      reset({
        name: currentUserData.name || "",
        email: currentUserData.email || "",
        bio: currentUserData.bio || "",
        phone: currentUserData.phone || "",
        dateOfBirth: currentUserData.dateOfBirth || "",
        gender: currentUserData.gender || undefined,
        website: currentUserData.website || "",
        occupation: currentUserData.occupation || "",
        company: currentUserData.company || "",
        timezone: currentUserData.timezone || "",
        language: currentUserData.language || "",
        address: {
          street: currentUserData.address?.street || "",
          city: currentUserData.address?.city || "",
          state: currentUserData.address?.state || "",
          postalCode: currentUserData.address?.postalCode || "",
          country: currentUserData.address?.country || "",
        },
      });
      setPreview(currentUserData.profileImg || null);
    }
  }, [currentUserData, reset]);

  // Preview selected image
  useEffect(() => {
    if (profileImgFile && profileImgFile.length > 0) {
      const file = profileImgFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [profileImgFile]);

  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);
      let profileImgUrl = currentUserData?.profileImg || "";

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
        ...data,
        profileImg: profileImgUrl,
      };

      await updateUserInfo(updatedData);
      await refetch();
    } catch (error) {
      toast.error("Image upload failed!");
      console.error(error);
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
      {!userDataLoading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl mt-6"
        >
          {/* Full Name */}
          <div>
            <Label className="mb-2" htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email (Read-only) */}
          <div>
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              readOnly
              {...register("email")}
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-28 w-28 rounded-full border object-cover"
              />
            )}
            <Label className="my-2" htmlFor="profileImg">
              Profile Image
            </Label>
            <Input
              id="profileImg"
              type="file"
              accept="image/*"
              {...register("profileImg")}
            />
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Phone</Label>
              <Input {...register("phone")} />
            </div>
            <div>
              <Label className="mb-2">Date of Birth</Label>
              <Input type="date" {...register("dateOfBirth")} />
            </div>
            <div>
              <Label className="mb-2">Gender</Label>
              <select
                {...register("gender")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label className="mb-2">Website</Label>
              <Input {...register("website")} />
            </div>
            <div>
              <Label className="mb-2">Occupation</Label>
              <Input {...register("occupation")} />
            </div>
            <div>
              <Label className="mb-2">Company</Label>
              <Input {...register("company")} />
            </div>
            <div>
              <Label className="mb-2">Timezone</Label>
              <Input {...register("timezone")} />
            </div>
            <div>
              <Label className="mb-2">Language</Label>
              <Input {...register("language")} />
            </div>
            <div>
              <Label className="mb-2">Bio</Label>
              <textarea
                {...register("bio")}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Street</Label>
              <Input {...register("address.street")} />
            </div>
            <div>
              <Label className="mb-2">City</Label>
              <Input {...register("address.city")} />
            </div>
            <div>
              <Label className="mb-2">State</Label>
              <Input {...register("address.state")} />
            </div>
            <div>
              <Label className="mb-2">Postal Code</Label>
              <Input {...register("address.postalCode")} />
            </div>
            <div>
              <Label className="mb-2">Country</Label>
              <Input {...register("address.country")} />
            </div>
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
