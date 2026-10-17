
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
  return (
    <div
      className="
        grid w-full min-w-0
        grid-cols-1 gap-4
        text-slate-900 transition-colors duration-200
        dark:text-slate-100
        sm:grid-cols-2 sm:gap-5
        lg:grid-cols-3 lg:gap-6
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
