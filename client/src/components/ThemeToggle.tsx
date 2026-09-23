import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group rounded-full border border-foreground/10 bg-foreground/5 p-2.5 transition-all hover:scale-105 hover:border-primary/50 hover:bg-primary/10 active:scale-95"
      data-testid="button-theme-toggle"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}
