import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      enableSystem
      attribute="class"
      defaultTheme="system"
      storageKey="carshop-ui-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
