import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import siteLogo from "@/assets/logo/carSure.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <SectionWrapper>
      <WebsiteHeading title="Login" />
      <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-white dark:bg-zinc-900 card-custom-shadow  rounded-2xl dark:border dark:border-red-500">
        {/* Replace this with your actual logo */}
        <img
          src={siteLogo}
          alt="Website Logo"
          className="size-[100px] object-contain mx-auto rounded-2xl"
        />

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 dark:text-white dark:bg-red-500"
          >
            Login
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Login;
