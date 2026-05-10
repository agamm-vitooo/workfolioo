import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../../types/project";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* HEADER IMAGE */}
          <div className="relative h-64 w-full">
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover"
            />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm text-slate-700 shadow"
            >
              ✕
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-6">
            {/* TITLE */}
            <h2 className="text-2xl font-bold text-slate-900">
              {project.name}
            </h2>

            {/* STACK */}
            <p className="mt-1 text-sm text-slate-500">
              Stack: {project.stack}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-4 leading-relaxed text-slate-700">
              {project.description}
            </p>

            {/* LINKS */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
                >
                  Live Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <FaGithub />
                  GitHub
                </a>
              )}
            </div>

            {/* EXTRA INFO BLOCK */}
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <div>
                <span className="font-medium text-slate-700">Project Name:</span>{" "}
                {project.name}
              </div>

              <div>
                <span className="font-medium text-slate-700">Stack:</span>{" "}
                {project.stack}
              </div>

              <div>
                <span className="font-medium text-slate-700">Description:</span>{" "}
                {project.description}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}