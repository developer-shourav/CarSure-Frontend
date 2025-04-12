import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes requires mounted check to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}
