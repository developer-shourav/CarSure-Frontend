/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import siteLogo from "@/assets/logo/carSure.png";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { successTheme } from "@/styles/toastThemes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import PublicPageWrapper from "@/components/ui/wrapper/PublicPageWrapper";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation({});
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error !== null && "status" in error;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormInputs) => {
    const uploadData = new FormData();

    const userPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    uploadData.append("formData", JSON.stringify(userPayload));

    try {
      const res = await registerUser(uploadData);

      if (res?.data?.statusCode === 201) {
        if ("message" in res.data) {
          reset();
          toast.success(res.data.message, successTheme);
          navigate(`/`);
        }
      }

      if (res?.error) {
        if (isFetchBaseQueryError(res.error)) {
          const status = res.error.status;
          const errorMessage =
            (res.error.data as any)?.message || "Something went wrong";

          toast.error(errorMessage);

          // --------Optional: conditional logic--------
          if (status === 500) {
            console.error("Server error: ", errorMessage);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PublicPageWrapper>
      <SectionWrapper>
        <WebsiteHeading title="Register" />
        <div className="w-full -mt-3 lg:-mt-7 max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-zinc-900 card-custom-shadow rounded-2xl dark:border ">
          {/* --------Logo --------*/}
          <img
            src={siteLogo}
            alt="Website Logo"
            className="size-[100px] object-contain mx-auto rounded-2xl"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* --------Name --------*/}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* --------Email --------*/}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* --------Password-------- */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters, with uppercase, lowercase, number, and special character.",
                  },
                })}
              />
              <div
                className="absolute right-3 top-[30px] cursor-pointer text-zinc-500 dark:text-zinc-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* --------Login Redirect-------- */}
            <div className="text-sm ">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-500 font-semibold underline dark:text-red-400"
              >
                Login here
              </Link>
            </div>

            {/* --------Submit-------- */}
            <Button
              type="submit"
              className="w-full cursor-pointer mt-2 dark:text-white dark:bg-red-500"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </div>
      </SectionWrapper>
    </PublicPageWrapper>
  );
};

export default Register;
