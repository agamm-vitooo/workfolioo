import { motion } from "framer-motion";

import type { WorkExperience } from "../../types/workExperience";
import { withCloudinaryTransformations } from "../../utils/cloudinary";


interface Props {
  experience: WorkExperience;
  index: number;
  isLast: boolean;
  onClick: () => void;
}

export default function WorkCard({
  experience,
  index,
  isLast,
  onClick,
}: Props) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
      }}
      viewport={{ once: true }}
      className="group flex cursor-pointer gap-4 rounded-2xl p-5 transition-all duration-300 hover:bg-slate-50"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          <img
            src={withCloudinaryTransformations(experience.logo, {
              f: "auto",
              q: "auto",
              w: 128,
              h: 128,
              c: "fill",
            })}
            alt={experience.company}
            loading="lazy"
            className="h-8 w-8 object-contain"
          />
        </div>

        {!isLast && (
          <div className="mt-3 h-full w-px bg-slate-200" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 border-b border-slate-100 pb-6">
        <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {experience.title}
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              {experience.company} · {experience.type}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {experience.location}
            </p>
          </div>

          <span className="mt-2 text-sm text-slate-400 md:mt-0">
            {experience.period}
          </span>
        </div>
      </div>
    </motion.div>
  );
}