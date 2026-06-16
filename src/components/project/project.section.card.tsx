import { ChevronRight } from "lucide-react";
import type { Project } from "../../types/project";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      {/* IMAGE */}
      <img
        src={project.image}
        alt={project.name}
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
      />

      {/* CONTENT */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-slate-800">
          {project.name}
        </h3>

        <p className="truncate text-sm text-slate-500">
          {project.stack}
        </p>
      </div>

      {/* INDICATOR */}
      <ChevronRight
        className="
          h-4 w-4 shrink-0 text-slate-300
          transition-transform duration-300
          group-hover:translate-x-0.5 group-hover:text-slate-400
        "
      />
    </div>
  );
}