import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import siteLogo from "@/assets/logo/carSure.png";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterFormInputs) => {
    // Convert data to FormData type
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Success:", result);

      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SectionWrapper>
      <WebsiteHeading title="Register" />
      <div className="w-full -mt-5 max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-zinc-900 card-custom-shadow rounded-2xl dark:border dark:border-red-500">
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
            className="w-full mt-2 dark:text-white dark:bg-red-500"
          >
            Register
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Register;
