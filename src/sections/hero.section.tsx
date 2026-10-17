
import { motion } from "framer-motion";
import {
  FolderOpen,
  Mail,
  MapPin,
} from "lucide-react";

import heroImage from "../assets/agam.webp";
import ThemeToggle from "@/components/theme.toogle";

const Hero = () => {
  return (
    <section
      className="
        relative flex min-h-screen items-center
        bg-slate-50 py-24 text-slate-900
        transition-colors duration-200
        dark:bg-slate-950 dark:text-slate-100
      "
    >
      {/* Theme Toggle: top-right */}
      <div className="absolute right-5 top-5 z-10 sm:right-8 sm:top-8 lg:right-12 lg:top-10">
        <ThemeToggle />
      </div>

      <div className="mx-auto w-full max-w-4xl px-5 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <motion.img
            src={heroImage}
            alt="Agam"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              h-24 w-24 rounded-full
              border border-slate-200 object-cover
              shadow-sm
              sm:h-28 sm:w-28
              dark:border-slate-700
            "
          />

          {/* Introduction */}
          <div className="mt-7 space-y-4 sm:mt-8">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="
                text-3xl font-bold tracking-tight
                text-slate-900
                sm:text-4xl md:text-5xl lg:text-6xl
                dark:text-white
              "
            >
              Hi, I'm Agam 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="
                mx-auto max-w-xl
                text-sm leading-relaxed text-slate-600
                sm:text-base md:text-lg
                dark:text-slate-400
              "
            >
              Software engineer focused on building reliable
              systems and crafting simple user experiences.
            </motion.p>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="
              mt-7 flex flex-wrap justify-center gap-3
              sm:mt-8
            "
          >
            <a
              href="#contact"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full bg-slate-900 px-5 py-3
                text-sm font-medium text-white
                shadow-sm transition-all duration-200
                hover:-translate-y-0.5 hover:bg-slate-800
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-slate-500 focus-visible:ring-offset-2
                dark:bg-white dark:text-slate-900
                dark:hover:bg-slate-200
                dark:focus-visible:ring-offset-slate-950
              "
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              Get in Touch
            </a>

            <a
              href="#projects"
              className="
                inline-flex items-center justify-center gap-2
                rounded-full border border-slate-200
                bg-white/60 px-5 py-3
                text-sm font-medium text-slate-700
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-slate-100
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-slate-500 focus-visible:ring-offset-2
                dark:border-slate-700 dark:bg-slate-900/50
                dark:text-slate-200 dark:hover:bg-slate-800
                dark:focus-visible:ring-offset-slate-950
              "
            >
              <FolderOpen
                aria-hidden="true"
                className="h-4 w-4"
              />
              View Projects
            </a>
          </motion.div>

          {/* Availability & Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="
              mt-7 flex flex-wrap items-center
              justify-center gap-x-4 gap-y-3
              text-xs text-slate-500
              sm:mt-8 sm:text-sm
              dark:text-slate-400
            "
          >
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="
                  h-2 w-2 rounded-full bg-green-500
                  ring-4 ring-green-500/10
                "
              />
              Available for work
            </div>

            <span
              aria-hidden="true"
              className="
                hidden h-1 w-1 rounded-full
                bg-slate-300 sm:block
                dark:bg-slate-600
              "
            />

            <div className="flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Jakarta, Indonesia
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
