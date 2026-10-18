
import { ChevronRight } from "lucide-react";

import type { Project } from "../../types/project";
import { withCloudinaryTransformations } from "../../utils/cloudinary";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View project details: ${project.name}`}
      className="
        group flex w-full min-w-0 items-center gap-3
        rounded-xl border border-slate-200 bg-white p-3
        text-left transition-all duration-200
        hover:border-slate-300 hover:bg-slate-50
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-slate-400 focus-visible:ring-offset-2
        dark:border-slate-800 dark:bg-slate-900
        dark:hover:border-slate-700 dark:hover:bg-slate-800
        dark:focus-visible:ring-offset-slate-950
        sm:gap-4 sm:rounded-2xl sm:p-4
      "
    >
      {/* Image */}
      <div
        className="
          h-12 w-12 shrink-0 overflow-hidden
          rounded-lg bg-slate-100
          dark:bg-slate-800
          sm:h-14 sm:w-14 sm:rounded-xl
        "
      >
        <img
          src={withCloudinaryTransformations(project.image, {
            f: "auto",
            q: "auto",
            w: 120,
            h: 120,
            c: "fill",
          })}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3
          className="
            truncate text-sm font-semibold text-slate-800
            transition-colors
            group-hover:text-slate-950
            dark:text-slate-100 dark:group-hover:text-white
            sm:text-base
          "
        >
          {project.name}
        </h3>

        <p
          className="
            mt-1 truncate text-xs text-slate-500
            dark:text-slate-400 sm:text-sm
          "
        >
          {project.stack}
        </p>
      </div>

      {/* Indicator */}
      <ChevronRight
        aria-hidden="true"
        className="
          h-4 w-4 shrink-0 text-slate-300
          transition-all duration-200
          group-hover:translate-x-0.5
          group-hover:text-slate-500
          dark:text-slate-600
          dark:group-hover:text-slate-300
          sm:h-5 sm:w-5
        "
      />
    </button>
  );
}
