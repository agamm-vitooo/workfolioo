
import { AnimatePresence, motion } from "framer-motion";

import type { WorkExperience } from "../../types/workExperience";
import { withCloudinaryTransformations } from "../../utils/cloudinary";

interface Props {
  experience: WorkExperience | null;
  onClose: () => void;
}

export default function WorkModal({ experience, onClose }: Props) {
  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            className="relative w-full max-w-2xl rounded-3xl bg-white p-6 text-slate-900 shadow-xl transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100 sm:p-8"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail pengalaman kerja"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-6 flex items-start gap-4 pr-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 transition-colors dark:bg-slate-800">
                <img
                  src={withCloudinaryTransformations(experience.logo, {
                    f: "auto",
                    q: "auto",
                    w: 128,
                    h: 128,
                    c: "fill",
                  })}
                  alt={experience.company}
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  id="work-modal-title"
                  className="text-xl font-semibold text-slate-900 dark:text-white"
                >
                  {experience.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {experience.company} · {experience.type}
                </p>

                <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                  {experience.period} · {experience.location}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-h-[50vh] overflow-y-auto">
              <p className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                {experience.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
