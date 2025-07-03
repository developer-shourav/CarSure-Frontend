import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetSingleUserQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardBodyWrapper from "@/components/ui/wrapper/DashboardBodyWrapper";
import { DashboardHeading } from "@/components/ui/WebsiteHeading/DashboardHeading";
import { TUserData } from "@/types";
import { successTheme } from "@/styles/toastThemes";

export default function MyProfile() {
  const user = useAppSelector(selectCurrentUser);
  const { isLoading: userDataLoading, data } = useGetSingleUserQuery(
    user?.userId
  );
  const [updateUserInfo, { isLoading, isSuccess, isError }] =
    useUpdateUserInfoMutation();

  const [isEditing, setIsEditing] = useState({
    name: false,
    bio: false,
    phone: false,
    dateOfBirth: false,
    gender: false,
    address: false,
    website: false,
    occupation: false,
    company: false,
    timezone: false,
    language: false,
    profileImg: false,
  });
  const [uploadingIds, setUploadingIds] = useState<number[]>([]);
  const [profileImgUrl, setProfileImgUrl] = useState<string | undefined>(
    data?.profileImg
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TUserData>();

  // Populate form with user data
  useEffect(() => {
    if (data) {
      reset(data);
      setProfileImgUrl(data.profileImg);
    }
  }, [data, reset]);

  // Handle image upload
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newUploadingId = Date.now() + Math.random();
    setUploadingIds((prev) => [...prev, newUploadingId]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "CarSure_Nari");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dinnsayed/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      setProfileImgUrl(result.secure_url);
      setValue("profileImg", result.secure_url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    } finally {
      setUploadingIds((prev) => prev.filter((id) => id !== newUploadingId));
    }
  };

  // Handle form submission
  const onSubmit = async (formData: TUserData) => {
    try {
      const updatedData: Partial<TUserData> = {
        name: formData.name,
        bio: formData.bio,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        website: formData.website,
        occupation: formData.occupation,
        company: formData.company,
        timezone: formData.timezone,
        language: formData.language,
        profileImg: profileImgUrl,
      };

      await updateUserInfo({ id: user?.userId, data: updatedData }).unwrap();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  // Handle success/error toasts
  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully!", successTheme);
      setIsEditing({
        name: false,
        bio: false,
        phone: false,
        dateOfBirth: false,
        gender: false,
        address: false,
        website: false,
        occupation: false,
        company: false,
        timezone: false,
        language: false,
        profileImg: false,
      });
    }
    if (isError) {
      toast.error("Failed to update profile");
    }
  }, [isSuccess, isError]);

  // Toggle edit mode for a specific field
  const toggleEdit = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (userDataLoading) {
    return (
      <DashboardBodyWrapper>
        <DashboardHeading title="My Profile" />
        <div className="mt-6 max-w-3xl space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </DashboardBodyWrapper>
    );
  }

  return (
    <DashboardBodyWrapper>
      <DashboardHeading title="My Profile" />

      <div className="mt-6 max-w-3xl space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Profile Image */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {profileImgUrl ? (
                <img
                  src={profileImgUrl}
                  alt="Profile"
                  className="size-24 rounded-full object-cover border dark:border-[#0000004d]"
                />
              ) : (
                <div className="size-24 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}
              {uploadingIds.length > 0 && (
                <Skeleton className="size-24 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Uploading...</span>
                </Skeleton>
              )}
            </div>
            {isEditing.profileImg ? (
              <div className="flex items-center gap-2">
                <label className="size-10 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
                  <Plus className="w-5 h-5 text-gray-500" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => toggleEdit("profileImg")}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => toggleEdit("profileImg")}
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
            )}
          </div>

          {/* Name */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Name</Label>
              {isEditing.name ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Name"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">{data?.name}</p>
              )}
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("name")}
            >
              {isEditing.name ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.name ? "" : "Edit"}
            </Button>
          </div>

          {/* Email (Non-editable) */}
          <div>
            <Label className="mb-2 md:mb-3">Email</Label>
            <p className="text-gray-900 dark:text-gray-100">{data?.email}</p>
          </div>

          {/* Role (Non-editable) */}
          <div>
            <Label className="mb-2 md:mb-3">Role</Label>
            <p className="text-gray-900 dark:text-gray-100">{data?.role}</p>
          </div>

          {/* Bio */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Bio</Label>
              {isEditing.bio ? (
                <textarea
                  {...register("bio")}
                  placeholder="Write a short bio"
                  className="w-full border p-2 rounded-md dark:border-[#0000004d]"
                  rows={3}
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.bio || "No bio provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("bio")}
            >
              {isEditing.bio ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.bio ? "" : "Edit"}
            </Button>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Phone</Label>
              {isEditing.phone ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("phone")}
                  placeholder="Phone number"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.phone || "No phone provided"}
matching the provided phone number"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("phone")}
            >
              {isEditing.phone ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.phone ? "" : "Edit"}
            </Button>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Date of Birth</Label>
              {isEditing.dateOfBirth ? (
                <Input
                  className="dark:border-[#0000004d]"
                  type="date"
                  {...register("dateOfBirth")}
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.dateOfBirth || "No date of birth provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("dateOfBirth")}
            >
              {isEditing.dateOfBirth ? (
                <X className="w-4 h-4" />
              ) : (
                <Pencil className="w-4 h-4 mr-2" />
              )}
              {isEditing.dateOfBirth ? "" : "Edit"}
            </Button>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Gender</Label>
              {isEditing.gender ? (
                <Select
                  onValueChange={(value) => setValue("gender", value as any)}
                  defaultValue={data?.gender}
                >
                  <SelectTrigger className="w-full dark:border-[#0000004d]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.gender || "No gender provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("gender")}
            >
              {isEditingGender ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditingGender ? "" : "Edit"}
            </Button>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Address</Label>
              {isEditing.address ? (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    className="dark:border-[#0000004d]"
                    {...register("address.street")}
                    placeholder="Street"
                  />
                  <Input
                    className="dark:border provenant-[#0000004d]"
                    {...register("address.city")}
                    placeholder="City"
                  />
                  <Input
                    className="dark:border-[#0000004d]"
                    {...register("address.state")}
                    placeholder="State"
                  />
                  <Input
                    className="dark:border-[#0000004d]"
                    {...register("address.postalCode")}
                    placeholder="Postal Code"
                  />
                  <Input
                    className="dark:border-[#0000004d]"
                    {...register("address.country")}
                    placeholder="Country"
                  />
                </div>
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.address
                    ? `${data.address.street || ""}, ${data.address.city || ""}, ${
                        data.address.state || ""
                      }, ${data.address.postalCode || ""}, ${data.address.country || ""}`
                    : "No address provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("address")}
            >
              {isEditing.address ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.address ? "" : "Edit"}
            </Button>
          </div>

          {/* Website */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Website</Label>
              {isEditing.website ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("website")}
                  placeholder="Website URL"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.website || "No website provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("website")}
            >
              {isEditing.website ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.website ? "" : "Edit"}
            </Button>
          </div>

          {/* Occupation */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Occupation</Label>
              {isEditing.occupation ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("occupation")}
                  placeholder="Occupation"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.occupation || "No occupation provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("occupation")}
            >
              {isEditing.occupation ? (
                <X className="w-4 h-4" />
              ) : (
                <Pencil className="w-4 h-4 mr-2" />
              )}
              {isEditing.occupation ? "" : "Edit"}
            </Button>
          </div>

          {/* Company */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Company</Label>
              {isEditing.company ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("company")}
                  placeholder="Company"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.company || "No company provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("company")}
            >
              {isEditing.company ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.company ? "" : "Edit"}
            </Button>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Timezone</Label>
              {isEditing.timezone ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("timezone")}
                  placeholder="Timezone"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.timezone || "No timezone provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("timezone")}
            >
              {isEditing.timezone ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.timezone ? "" : "Edit"}
            </Button>
          </div>

          {/* Language */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="mb-2 md:mb-3">Language</Label>
              {isEditing.language ? (
                <Input
                  className="dark:border-[#0000004d]"
                  {...register("language")}
                  placeholder="Language"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {data?.language || "No language provided"}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => toggleEdit("language")}
            >
              {isEditing.language ? <X className="w-4 h-4" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isEditing.language ? "" : "Edit"}
            </Button>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button
              className="dark:bg-red-500 text-white hover:bg-red-600 w-full"
              disabled={isLoading || uploadingIds.length > 0}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardBodyWrapper>
  );
}