import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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

export default function UserProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
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
      setEditMode(false);
      toast.success("Profile updated successfully!", successTheme);
    } catch (error) {
      toast.error("Image upload failed!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (isError) toast.error("Error: Update failed!");
  }, [isSuccess, isError]);

  if (userDataLoading) {
    return (
      <DashboardBodyWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardBodyWrapper>
    );
  }

  return (
    <DashboardBodyWrapper>
      <div className="flex justify-between items-center mb-6">
        <DashboardHeading title={editMode ? "Edit Profile" : "My Profile"} />
        {!editMode ? (
          <Button
            onClick={() => setEditMode(true)}
            className="bg-gradient-to-r text-white from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setEditMode(false)}
              className="border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading || uploading}
              className="bg-gradient-to-r text-white from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              {uploading || isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        )}
      </div>

      {editMode ? (
        // EDIT MODE FORM
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile Image */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative mb-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-48 w-48 rounded-2xl object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-48 h-48 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <Label htmlFor="profileImg" className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Label>
                  </div>
                </div>
                <Input
                  id="profileImg"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("profileImg")}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>

              {/* Right Column - Form Fields */}
              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      readOnly
                      className="bg-gray-100 cursor-not-allowed border border-gray-300 rounded-xl py-3 px-4"
                      {...register("email")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Phone
                    </Label>
                    <Input
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("phone")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("dateOfBirth")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Gender
                    </Label>
                    <select
                      {...register("gender")}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl text-sm py-[] px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Website
                    </Label>
                    <Input
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("website")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Occupation
                    </Label>
                    <Input
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("occupation")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Company
                    </Label>
                    <Input
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("company")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Timezone
                    </Label>
                    <Input
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("timezone")}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Language
                    </Label>
                    <Input
                      className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      {...register("language")}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </Label>
                  <textarea
                    {...register("bio")}
                    className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  />
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        Street
                      </Label>
                      <Input
                        className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("address.street")}
                      />
                    </div>
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        City
                      </Label>
                      <Input
                        className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("address.city")}
                      />
                    </div>
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        State
                      </Label>
                      <Input
                        className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("address.state")}
                      />
                    </div>
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        Postal Code
                      </Label>
                      <Input
                        className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("address.postalCode")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                        Country
                      </Label>
                      <Input
                        className="bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        {...register("address.country")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        // VIEW MODE
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 flex flex-col md:flex-row items-center">
              <div className="relative mb-6 md:mb-0 md:mr-8">
                <div className="bg-white p-1 rounded-full shadow-lg">
                  <img
                    src={
                      currentUserData?.profileImg ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
                  <div className="bg-blue-100 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">
                  {currentUserData?.name}
                </h1>
                <p className="text-blue-100 mt-2">
                  {currentUserData?.occupation || "Professional"}
                  {currentUserData?.company && ` at ${currentUserData.company}`}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  {currentUserData?.email && (
                    <div className="flex items-center bg-blue-400/20 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-white text-sm">
                        {currentUserData.email}
                      </span>
                    </div>
                  )}
                  {currentUserData?.phone && (
                    <div className="flex items-center bg-blue-400/20 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="text-white text-sm">
                        {currentUserData.phone}
                      </span>
                    </div>
                  )}
                  {currentUserData?.website && (
                    <div className="flex items-center bg-blue-400/20 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.083 9h1.946c.089 1.546.383 2.97.837 4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.911-.673 2.121-.766 3.556h3.936c-.093-1.435-.377-2.645-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.435.377 2.645.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.911.673-2.121.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.51 13.025 6.216 11.6 6.127 10H4.083a6.004 6.004 0 002.783 4.118z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-white text-sm">
                        {currentUserData.website}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    About Me
                  </h2>
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    BIO
                  </div>
                </div>
                {currentUserData?.bio ? (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentUserData.bio}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No bio provided yet</p>
                )}
              </div>

              {/* Personal Info Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCardItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Date of Birth"
                    value={currentUserData?.dateOfBirth || "Not specified"}
                  />
                  <InfoCardItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Timezone"
                    value={currentUserData?.timezone || "Not specified"}
                  />
                  <InfoCardItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.37-.384-.73-.792-1.066-1.222a17.91 17.91 0 01-1.55-2.67 1 1 0 01.5-1.415 18.023 18.023 0 003.815-3.027A1 1 0 017 6V4H6a1 1 0 010-2h1V3a1 1 0 011-1zM3 10a1 1 0 01.293-.707l3-3a1 1 0 111.414 1.414L5.414 10H13a1 1 0 110 2H5.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3A1 1 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Language"
                    value={currentUserData?.language || "Not specified"}
                  />
                  <InfoCardItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3-1a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Gender"
                    value={
                      currentUserData?.gender
                        ? currentUserData.gender.charAt(0).toUpperCase() +
                          currentUserData.gender.slice(1)
                        : "Not specified"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Professional Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Professional
                </h2>
                <div className="space-y-4">
                  <InfoCardItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    }
                    label="Occupation"
                    value={currentUserData?.occupation || "Not specified"}
                  />
                  <InfoCardItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    label="Company"
                    value={currentUserData?.company || "Not specified"}
                  />
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Address
                  </h2>
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    LOCATION
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mt-0.5 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      {currentUserData?.address ? (
                        <>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {currentUserData.address.street}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {currentUserData.address.city},{" "}
                            {currentUserData.address.state}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {currentUserData.address.postalCode},{" "}
                            {currentUserData.address.country}
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-500 italic">
                          No address provided
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Social Connections
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardBodyWrapper>
  );
}

function InfoCardItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 p-2 rounded-lg">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-medium text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
