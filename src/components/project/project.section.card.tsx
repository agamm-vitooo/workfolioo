import type { Project } from "../../types/project";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-5 rounded-lg border border-slate-200 p-5 transition hover:bg-slate-50 hover:shadow-md"
    >
      {/* IMAGE */}
      <img
        src={project.image}
        alt={project.name}
        className="h-14 w-14 rounded-md object-cover"
      />

      {/* CONTENT */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-800">
          {project.name}
        </h3>

        <p className="text-sm text-slate-500">
          {project.stack}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Click for details →
        </p>
      </div>
    </div>
  );
}