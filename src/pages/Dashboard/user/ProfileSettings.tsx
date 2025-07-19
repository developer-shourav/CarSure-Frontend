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
import {
  Edit,
  Camera,
  Mail,
  Phone,
  Globe,
  Calendar,
  Clock,
  Languages,
  User,
  Briefcase,
  Building2,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

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

  // --------Populate default values when data is loaded
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

  // --------Preview selected image
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
        <div className="mb-6">
          <DashboardHeading title="My Profile"/>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
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
            <Edit className="h-5 w-5 mr-2" />
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
                      className=" Prismaloader__path"
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
        // --------EDIT MODE FORM--------
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* --------Left Column - Profile Image --------*/}
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
                      <Camera className="h-5 w-5 text-blue-600" />
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

              {/* --------Right Column - Form Fields --------*/}
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
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl text-sm py-[6px] px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900"
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
        // --------VIEW MODE--------
        <div className="max-w-5xl mx-auto">
          {/* --------Profile Header --------*/}
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
                      <Mail className="h-4 w-4 text-white mr-1" />
                      <span className="text-white text-sm">
                        {currentUserData.email}
                      </span>
                    </div>
                  )}
                  {currentUserData?.phone && (
                    <div className="flex items-center bg-blue-400/20 px-3 py-1 rounded-full">
                      <Phone className="h-4 w-4 text-white mr-1" />
                      <span className="text-white text-sm">
                        {currentUserData.phone}
                      </span>
                    </div>
                  )}
                  {currentUserData?.website && (
                    <div className="flex items-center bg-blue-400/20 px-3 py-1 rounded-full">
                      <Globe className="h-4 w-4 text-white mr-1" />
                      <span className="text-white text-sm">
                        {currentUserData.website}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* --------Main Profile Content --------*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* --------Left Column --------*/}
            <div className="lg:col-span-2 space-y-6">
              {/* --------About Card --------*/}
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

              {/* --------Personal Info Card --------*/}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCardItem
                    icon={<Calendar className="h-5 w-5" />}
                    label="Date of Birth"
                    value={currentUserData?.dateOfBirth || "Not specified"}
                  />
                  <InfoCardItem
                    icon={<Clock className="h-5 w-5" />}
                    label="Timezone"
                    value={currentUserData?.timezone || "Not specified"}
                  />
                  <InfoCardItem
                    icon={<Languages className="h-5 w-5" />}
                    label="Language"
                    value={currentUserData?.language || "Not specified"}
                  />
                  <InfoCardItem
                    icon={<User className="h-5 w-5" />}
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

            {/* --------Right Column --------*/}
            <div className="space-y-6">
              {/* --------Professional Card-------- */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Professional
                </h2>
                <div className="space-y-4">
                  <InfoCardItem
                    icon={<Briefcase className="h-5 w-5" />}
                    label="Occupation"
                    value={currentUserData?.occupation || "Not specified"}
                  />
                  <InfoCardItem
                    icon={<Building2 className="h-5 w-5" />}
                    label="Company"
                    value={currentUserData?.company || "Not specified"}
                  />
                </div>
              </div>

              {/* --------Address Card --------*/}
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
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
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

              {/* --------Social Card --------*/}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Social Connections
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 dark:bg-zinc-800 h-10 w-10 rounded-full flex items-center justify-center"
                  >
                    <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-300" />
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
