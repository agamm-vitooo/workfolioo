import { AnimatePresence, motion } from "framer-motion";

import type { WorkExperience } from "../../types/workExperience";

interface Props {
  experience: WorkExperience | null;
  onClose: () => void;
}

export default function WorkModal({
  experience,
  onClose,
}: Props) {
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
            className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <img
                  src={experience.logo}
                  alt={experience.company}
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900">
                  {experience.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {experience.company} · {experience.type}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {experience.period} · {experience.location}
                </p>
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                {experience.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}