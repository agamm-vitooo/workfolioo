
import { ChevronRight } from "lucide-react";

import type { Project } from "../../types/project";
import { withCloudinaryTransformations } from "../../utils/cloudinary";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800"
    >
      {/* Image */}
      <img
        src={withCloudinaryTransformations(project.image, {
          f: "auto",
          q: "auto",
          w: 120,
          h: 120,
          c: "fill",
        })}
        alt={project.name}
        loading="lazy"
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-slate-800 transition-colors dark:text-slate-100">
          {project.name}
        </h3>

        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
          {project.stack}
        </p>
      </div>

      {/* Indicator */}
      <ChevronRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-300"
      />
    </div>
  );
}
