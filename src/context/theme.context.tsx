
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

function getInitialTheme(): Theme {
  try {
    return localStorage.getItem("workfolio-theme") === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const location = useLocation();

  const isPublicPage = [
    "/",
    "/projects",
    "/certificates",
  ].includes(location.pathname);

  useEffect(() => {
    // Dark mode hanya diterapkan pada halaman publik.
    document.documentElement.classList.toggle(
      "dark",
      isPublicPage && theme === "dark"
    );

    try {
      localStorage.setItem("workfolio-theme", theme);
    } catch {
      // Tetap berfungsi meskipun penyimpanan tidak tersedia.
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [theme, isPublicPage]);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
