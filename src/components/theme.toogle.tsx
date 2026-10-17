
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/theme.context";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Aktifkan light mode" : "Aktifkan dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light Mode" : "Dark Mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-yellow-300 dark:hover:bg-slate-800"
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
