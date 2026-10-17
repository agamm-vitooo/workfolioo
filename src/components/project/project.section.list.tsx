
import type { Project } from "../../types/project";
import ProjectCard from "./project.section.card";

interface Props {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectList({
  projects,
  onSelect,
}: Props) {
  if (projects.length === 0) {
    return (
      <div
        className="
          rounded-xl border border-dashed border-slate-200
          px-4 py-8 text-center text-sm text-slate-500
          dark:border-slate-800 dark:text-slate-400
          sm:rounded-2xl sm:py-10
        "
      >
        No projects available yet.
      </div>
    );
  }

  return (
    <div
      className="
        flex w-full min-w-0 flex-col gap-3
        text-slate-900 transition-colors duration-200
        dark:text-slate-100
        sm:gap-4
      "
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelect(project)}
        />
      ))}
    </div>
  );
}
