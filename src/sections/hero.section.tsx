import { motion } from "framer-motion";
import {
  FolderOpen,
  Mail,
  MapPin,
} from "lucide-react";

import heroImage from "../assets/agam.webp";

const Hero = () => {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <div className="mx-auto w-full max-w-3xl px-4">
        <div className="flex flex-col items-center text-center">
          {/* IMAGE */}
          <motion.img
            src={heroImage}
            alt="Agam"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              h-24 w-24 rounded-full
              border border-slate-200
              object-cover
              md:h-28 md:w-28
            "
          />

          {/* CONTENT */}
          <div className="mt-8 space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="
                text-4xl font-bold tracking-tight text-slate-900
                md:text-5xl lg:text-6xl
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
                text-base leading-relaxed text-slate-600
                md:text-lg
              "
            >
              Software engineer focused on building reliable
              systems and crafting simple user experiences.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="
              mt-8 flex flex-wrap justify-center gap-3
            "
          >
            <a
              href="#contact"
              className="
                inline-flex items-center gap-2
                rounded-full bg-slate-900
                px-5 py-3
                text-sm font-medium text-white
                transition-colors hover:bg-slate-800
              "
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>

            <a
              href="#projects"
              className="
                inline-flex items-center gap-2
                rounded-full border border-slate-200
                px-5 py-3
                text-sm font-medium text-slate-700
                transition-colors hover:bg-slate-50
              "
            >
              <FolderOpen className="h-4 w-4" />
              View Projects
            </a>
          </motion.div>

          {/* STATUS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="
              mt-8 flex flex-wrap items-center justify-center gap-4
              text-sm text-slate-500
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Available for work
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Jakarta, Indonesia
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;