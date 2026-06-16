import { AnimatePresence, motion } from "framer-motion";
import { FolderOpen, Mail } from "lucide-react";

interface Props {
  visible: boolean;
}

export default function FloatingNavbar({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
          className="
            fixed left-1/2 top-4 z-50
            -translate-x-1/2 px-4
          "
        >
          <div
            className="
              flex items-center gap-2

              rounded-full
              border border-white/20

              bg-white/10
              bg-gradient-to-b
              from-white/25
              to-white/10

              p-2

              shadow-[0_8px_32px_rgba(15,23,42,0.12)]

              backdrop-blur-2xl
              supports-[backdrop-filter]:bg-white/10
            "
          >
            <a
              href="#projects"
              className="
                flex items-center gap-2
                rounded-full px-4 py-2

                text-sm font-medium text-slate-700

                transition-all duration-200
                hover:bg-white/40
              "
            >
              <FolderOpen className="h-4 w-4" />

              <span className="hidden sm:inline">
                Projects
              </span>
            </a>

            <a
              href="#contact"
              className="
                flex items-center gap-2

                rounded-full
                bg-slate-900/90

                px-4 py-2

                text-sm font-medium text-white

                transition-all duration-200
                hover:bg-slate-800
              "
            >
              <Mail className="h-4 w-4" />

              <span className="hidden sm:inline">
                Get in Touch
              </span>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}