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
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { TUser } from "@/types";
import { setUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { successTheme } from "@/styles/toastThemes";
import { verifyToken } from "@/utils/verifyToken";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;

      dispatch(setUser({ user: user, token: res.data.token }));

      toast.success("Login successfully!", successTheme);
      reset();
      navigate(`/`);
    } catch (err: any) {
      if (err?.data && err?.status !== 404) {
        if ("message" in err.data) {
          toast.error(`Error: ${err.data.message}`);
        }
      }

      console.log(err);
    }
  };

  return (
    <SectionWrapper>
      <WebsiteHeading title="Login" />
      <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-zinc-900 card-custom-shadow rounded-2xl dark:border dark:border-red-500">
        {/* --------Logo --------*/}
        <img
          src={siteLogo}
          alt="Website Logo"
          className="size-[100px] object-contain mx-auto rounded-2xl"
        />

        {/* -------- Form --------*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <div
              className="absolute right-3 top-[30px] cursor-pointer text-zinc-500 dark:text-zinc-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Register Link */}
          <div className="text-sm">
            New at CarSuer?{" "}
            <Link
              to="/register"
              className="text-red-500 font-semibold underline dark:text-red-400"
            >
              Register here
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer mt-2 dark:text-white dark:bg-red-500"
            disabled={isLoading}
          >
            {isLoading ? "Login..." : "Login"}
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Login;
