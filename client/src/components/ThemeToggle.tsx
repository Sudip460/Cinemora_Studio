import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg border border-foreground/10 hover:border-primary/50 transition-all hover:bg-primary/10 group"
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
