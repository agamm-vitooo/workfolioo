
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

import type { Project } from "../../types/project";
import { withCloudinaryTransformations } from "../../utils/cloudinary";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100"
          >
            {/* Header Image */}
            <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 sm:h-64">
              <img
                src={withCloudinaryTransformations(project.image, {
                  f: "auto",
                  q: "auto",
                  w: 1200,
                  h: 600,
                  c: "fill",
                })}
                alt={project.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail proyek"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              {/* Title */}
              <h2
                id="project-modal-title"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {project.name}
              </h2>

              {/* Stack */}
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Stack: {project.stack}
              </p>

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Live Demo
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>

              {/* Extra Information */}
              <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 transition-colors dark:bg-slate-800 dark:text-slate-300">
                <div>
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    Project Name:{" "}
                  </span>
                  {project.name}
                </div>

                <div>
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    Stack:{" "}
                  </span>
                  {project.stack}
                </div>

                <div>
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    Description:{" "}
                  </span>
                  <p className="mt-1 whitespace-pre-line leading-6">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
