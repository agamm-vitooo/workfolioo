
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderOpen,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../../context/theme.context";

interface Props {
  visible: boolean;
}

export default function FloatingNavbar({ visible }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          aria-label="Floating navigation"
          className="
            fixed left-1/2 top-4 z-50
            -translate-x-1/2 px-4
          "
        >
          <div
            className="
              flex items-center gap-1 rounded-full
              border border-white/40
              bg-gradient-to-b from-white/80 to-white/60
              p-2
              shadow-[0_8px_32px_rgba(15,23,42,0.12)]
              backdrop-blur-2xl
              supports-[backdrop-filter]:bg-white/40
              transition-colors duration-200
              dark:border-slate-700/70
              dark:from-slate-900/90 dark:to-slate-950/80
              dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              dark:supports-[backdrop-filter]:bg-slate-900/70
            "
          >
            {/* Projects */}
            <a
              href="#projects"
              className="
                flex items-center gap-2 rounded-full
                px-3 py-2 text-sm font-medium
                text-slate-700 transition-all duration-200
                hover:bg-white/70 hover:text-slate-950
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-slate-400
                dark:text-slate-200
                dark:hover:bg-slate-700/70 dark:hover:text-white
                sm:px-4
              "
            >
              <FolderOpen
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span className="hidden sm:inline">
                Projects
              </span>
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="
                flex items-center gap-2 rounded-full
                bg-slate-900/90 px-3 py-2
                text-sm font-medium text-white
                transition-all duration-200
                hover:bg-slate-800
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-slate-400
                focus-visible:ring-offset-2
                dark:bg-white dark:text-slate-900
                dark:hover:bg-slate-200
                dark:focus-visible:ring-offset-slate-900
                sm:px-4
              "
            >
              <Mail
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span className="hidden sm:inline">
                Get in Touch
              </span>
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-full
                text-slate-700
                transition-all duration-200
                hover:bg-white/70 hover:text-slate-950
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-slate-400
                dark:text-slate-200
                dark:hover:bg-slate-700/70 dark:hover:text-white
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  ) : (
                    <Moon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
